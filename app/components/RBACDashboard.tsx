import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UsersTable } from './UsersTable';
import { RolesTable } from './RolesTable';
import { User, Role } from './type';
import { initialUsers, initialRoles, allPermissions } from './mockData';

const RBACDashboard = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer', active: true });
  const [newRole, setNewRole] = useState<{ name: string; permissions: string[] }>({ name: '', permissions: [] });
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: 'viewer', active: true });
    setShowUserDialog(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };

  const handleAddRole = () => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    setNewRole({ name: '', permissions: [] });
    setShowRoleDialog(false);
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleTogglePermission = (roleName: string, permission: string) => {
    setRoles(roles.map(role => {
      if (role.name === roleName) {
        const newPermissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: newPermissions };
      }
      return role;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
                <Button onClick={handleAddUser}>Add User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            onDeleteUser={handleDeleteUser}
            onToggleStatus={handleToggleUserStatus}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Roles & Permissions</CardTitle>
          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Role Name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                />
                <div className="space-y-2">
                  <h4 className="font-medium">Permissions</h4>
                  {allPermissions.map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`new-${permission}`}
                        checked={newRole.permissions.includes(permission)}
                        onChange={() => {
                          const newPermissions = newRole.permissions.includes(permission)
                            ? newRole.permissions.filter(p => p !== permission)
                            : [...newRole.permissions, permission];
                          setNewRole({ ...newRole, permissions: newPermissions });
                        }}
                      />
                      <label htmlFor={`new-${permission}`}>{permission}</label>
                    </div>
                  ))}
                </div>
                <Button onClick={handleAddRole}>Add Role</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <RolesTable
            roles={roles}
            allPermissions={allPermissions}
            onDeleteRole={handleDeleteRole}
            onTogglePermission={handleTogglePermission}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RBACDashboard;