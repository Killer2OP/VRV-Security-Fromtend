export const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', active: true },
  ];
  
  export const initialRoles = [
    { id: 1, name: 'admin', permissions: ['read', 'write', 'delete', 'manage_users'] },
    { id: 2, name: 'editor', permissions: ['read', 'write'] },
    { id: 3, name: 'viewer', permissions: ['read'] },
  ];
  
  export const allPermissions = ['read', 'write', 'delete', 'manage_users'];