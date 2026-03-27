// UserFormDrawer.jsx
import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  status: 'active',
};

const UserFormDrawer = ({ open, onClose, onSubmit, loading, user, isEdit }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (user && isEdit) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        status: user.status || 'active',
      });
    } else {
      setForm(initialState);
    }
  }, [user, isEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 3 }} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          {isEdit ? 'Editar Usuario' : 'Crear Usuario'}
        </Typography>
        <TextField
          label="Nombre"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {!isEdit && (
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado</InputLabel>
          <Select
            name="status"
            value={form.status}
            label="Estado"
            onChange={handleChange}
          >
            <MenuItem value="active">Activo</MenuItem>
            <MenuItem value="inactive">Inactivo</MenuItem>
          </Select>
        </FormControl>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} color="secondary" sx={{ mr: 2 }} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {isEdit ? 'Guardar Cambios' : 'Crear'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserFormDrawer;
