import React from 'react';
import { Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Role } from './type';

interface RolesTableProps {
  roles: Role[];
  allPermissions: string[];
  onDeleteRole: (id: number) => void;
  onTogglePermission: (roleName: string, permission: string) => void;
}

export const RolesTable: React.FC<RolesTableProps> = ({
  roles,
  allPermissions,
  onDeleteRole,
  onTogglePermission
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Permissions</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {roles.map(role => (
            <tr key={role.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{role.name}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  {allPermissions.map(permission => (
                    <Badge
                      key={permission}
                      variant={role.permissions.includes(permission) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onTogglePermission(role.name, permission)}
                    >
                      {permission}
                      {role.permissions.includes(permission) ? 
                        <Check className="w-3 h-3 ml-1" /> : 
                        <X className="w-3 h-3 ml-1" />
                      }
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteRole(role.id)}
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