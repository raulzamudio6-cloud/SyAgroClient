// menuConfig.js
// Data layer: initial static menu configuration, ready to replace with API data later.
export const initialMenuConfig = [
  { label: 'Dashboard', path: '/', permission: null },
  {
    label: 'Seguridad',
    path: '/security',
    permission: null,
    children: [
      { label: 'Usuarios', path: '/users', permission: 'USER_VIEW' },
      { label: 'Roles', path: '/roles', permission: 'ROLE_VIEW' },
      { label: 'Permisos', path: '/permissions', permission: 'PERMISSION_VIEW' },
    ],
  },
  {
    label: 'Configurar Empresas',
    path: '/companies',
    permission: null,
    children: [
      { label: 'Listar Empresas', path: '/companies', permission: null },
      { label: 'Nueva Empresa', path: '/companies/new', permission: 'COMPANY_CREATE' },
    ],
  },
];

// Placeholder to support future API-based menu fetching.
export async function fetchMenuFromAPI() {
  // TODO: Replace mock with API request; this is a placeholder.
  // const response = await fetch('/api/menu');
  // return response.ok ? response.json() : [];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialMenuConfig);
    }, 100); // simulate network delay
  });
}
