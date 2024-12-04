import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { User } from './type';

interface UsersTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  onDeleteUser, 
  onToggleStatus 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{user.name}</td>
              <td className="px-4 py-3 text-sm">{user.email}</td>
              <td className="px-4 py-3 text-sm">
                <Badge>{user.role}</Badge>
              </td>
              <td className="px-4 py-3 text-sm">
                <Switch
                  checked={user.active}
                  onCheckedChange={() => onToggleStatus(user.id)}
                />
              </td>
              <td className="px-4 py-3 text-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};