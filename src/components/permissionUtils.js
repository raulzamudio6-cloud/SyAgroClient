// permissionUtils.js
export function hasPermission(user, menuItem) {
  if (!menuItem.permission) return true;
  return user.permissions?.includes(menuItem.permission);
}

export function filterMenuByPermissions(menuItems, user) {
  return menuItems
    .filter((item) => hasPermission(user, item))
    .map((item) => ({
      ...item,
      children: item.children ? filterMenuByPermissions(item.children, user) : undefined,
    }));
}
