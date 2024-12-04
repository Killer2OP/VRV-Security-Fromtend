import { Metadata } from 'next';
import RBACDashboard from '@/app/components/RBACDashboard';

// Define metadata for the permissions page to improve SEO and accessibility
export const metadata: Metadata = {
  title: 'User Permissions Management | Admin Dashboard',
  description: 'Manage user roles and permissions for your application',
};

// The main permissions page component that serves as the container for our RBAC system
export default function PermissionsPage() {
  return (
    // Container with responsive padding and max width for optimal viewing
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page header section with title and description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Permissions Management
        </h1>
        <p className="mt-2 text-gray-600">
          Manage user roles and control access permissions across your application.
        </p>
      </div>

      {/* Render the RBAC Dashboard component */}
      <RBACDashboard />
    </div>
  );
}