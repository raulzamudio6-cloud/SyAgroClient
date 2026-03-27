import React, { useMemo, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Toolbar,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import { initialMenuConfig, fetchMenuFromAPI } from './menuConfig';
import { filterMenuByPermissions } from './permissionUtils';
import { AuthContext } from '../context/AuthContext';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';

const drawerWidth = 260;

const iconByLabel = {
  Dashboard: <DashboardIcon />,
  Seguridad: <SecurityIcon />,
  Usuarios: <PeopleIcon />,
  Roles: <PeopleIcon />,
  Permisos: <LockIcon />,
  Companies: <BusinessIcon />,
};

function renderMenuItem(item, location, onClick, onToggle, openMap) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const expanded = openMap[item.path] || false;
  // Active if current path matches item or any child
  const isActive = location.pathname === item.path || (hasChildren && item.children.some(child => location.pathname === child.path));

  console.log('Rendering menu item:', item.label, 'Path:', item.path, 'Active:', isActive);

  return (
    <React.Fragment key={item.path}>
      <ListItemButton
        onClick={hasChildren ? () => onToggle(item.path) : () => onClick(item.path)}
        selected={isActive}
        sx={{ pl: hasChildren ? 2 : 1 }}
      >
        <ListItemIcon>
          {iconByLabel[item.label] || <DashboardIcon />}
        </ListItemIcon>
        <ListItemText primary={item.label} />
        {hasChildren ? expanded ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => {
              const childActive = location.pathname === child.path;
              console.log('Rendering child menu item:', child.label, 'Path:', child.path, 'Active:', childActive);
              return (
                <ListItemButton
                  key={child.path}
                  sx={{ pl: 4 }}
                  selected={childActive}
                  onClick={() => onClick(child.path)}
                >
                  <ListItemIcon>
                    {iconByLabel[child.label] || <DashboardIcon />}
                  </ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMap, setOpenMap] = useState({});
  const [menuItems] = useState(initialMenuConfig);
  const { user } = useContext(AuthContext);

  const filteredMenu = useMemo(() => {
    const filtered = filterMenuByPermissions(menuItems, user);
    console.log('Filtered menu items:', filtered);
    if (filtered.length === 0) {
      console.warn('No menu items available for the current user. Check permissions or menu configuration.');
    }
    return filtered;
  }, [menuItems, user]);

  const handleNavigate = (path) => {
    console.log('Navigating to path:', path);
    navigate(path);
  };

  const handleToggle = (path) => {
    setOpenMap((current) => ({ ...current, [path]: !current[path] }));
    console.log('Toggled menu path:', path, 'State:', !openMap[path]);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6">Agro SaaS</Typography>
          <Typography variant="caption">{user?.name || ''}</Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {filteredMenu.map((item) => renderMenuItem(item, location, handleNavigate, handleToggle, openMap))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
export { drawerWidth, fetchMenuFromAPI };
