import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from '../auth/ProtectedRoute';
import RoleProtectedRoute from '../auth/RoleProtectedRoute';
import Login from '../auth/Login';
import Users from '../pages/Users';

// Placeholder pages
const Dashboard = () => <div>Dashboard</div>;
const Roles = () => <div>Roles</div>;
const Permissions = () => <div>Permissions</div>; // Agregar componente para permisos
const Companies = () => <div>Listar Empresas</div>; // Placeholder para listar empresas
const NewCompany = () => <div>Nueva Empresa</div>; // Placeholder para nueva empresa
const Unauthorized = () => <div>Unauthorized</div>;

/**
 * AppRouter defines all routes and applies protection as needed.
 */
const AppRouter = () => {
  console.log('Rendering AppRouter...');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute />}> {/* All protected routes */}
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            {console.log('Route: /, Path: /, Permission: None')}
            <Route element={<RoleProtectedRoute permission="USER_VIEW" />}>
              <Route path="users" element={<Users />} />
              {console.log('Route: /users, Path: /users, Permission: USER_VIEW')}
            </Route>
            <Route element={<RoleProtectedRoute permission="ROLE_VIEW" />}>
              <Route path="roles" element={<Roles />} />
              {console.log('Route: /roles, Path: /roles, Permission: ROLE_VIEW')}
            </Route>
            <Route element={<RoleProtectedRoute permission="PERMISSION_VIEW" />}> {/* Nueva ruta protegida */}
              <Route path="permissions" element={<Permissions />} />
              {console.log('Route: /permissions, Path: /permissions, Permission: PERMISSION_VIEW')}
            </Route>
            <Route element={<RoleProtectedRoute permission="COMPANY_VIEW" />}> {/* Rutas para empresas */}
              <Route path="companies" element={<Companies />} />
              {console.log('Route: /companies, Path: /companies, Permission: COMPANY_VIEW')}
              <Route path="companies/new" element={<NewCompany />} />
              {console.log('Route: /companies/new, Path: /companies/new, Permission: COMPANY_VIEW')}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
