// Users.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import UserFormDrawer from '../components/users/UserFormDrawer';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/users.service';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al cargar usuarios', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setEditUser(null);
    setDrawerOpen(true);
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const user = await getUserById(id);
      setEditUser(user);
      setDrawerOpen(true);
    } catch {
      setSnackbar({ open: true, message: 'No se pudo cargar el usuario', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user) => {
    setDeleteDialog({ open: true, user });
  };

  const confirmDelete = async () => {
    setSaving(true);
    try {
      await deleteUser(deleteDialog.user.id);
      setSnackbar({ open: true, message: 'Usuario eliminado', severity: 'success' });
      fetchUsers();
    } catch {
      setSnackbar({ open: true, message: 'Error al eliminar usuario', severity: 'error' });
    } finally {
      setSaving(false);
      setDeleteDialog({ open: false, user: null });
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditUser(null);
  };

  const handleFormSubmit = async (form) => {
    setSaving(true);
    try {
      if (editUser) {
        await updateUser(editUser.id, form);
        setSnackbar({ open: true, message: 'Usuario actualizado', severity: 'success' });
      } else {
        await createUser(form);
        setSnackbar({ open: true, message: 'Usuario creado', severity: 'success' });
      }
      handleDrawerClose();
      fetchUsers();
    } catch {
      setSnackbar({ open: true, message: 'Error al guardar usuario', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: 'firstName', headerName: 'Nombre', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) =>
        params.value === 'active' ? 'Activo' : 'Inactivo',
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Usuarios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          disabled={loading}
        >
          Crear Usuario
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          autoHeight
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          getRowId={(row) => row.id}
          disableSelectionOnClick
        />
      )}
      <UserFormDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        onSubmit={handleFormSubmit}
        loading={saving}
        user={editUser}
        isEdit={!!editUser}
      />
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, user: null })}>
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar el usuario "{deleteDialog.user?.firstName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, user: null })} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" disabled={saving}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
