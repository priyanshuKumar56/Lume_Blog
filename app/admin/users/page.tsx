// Admin users management
import { UserTable } from "@/components/admin/user-table"

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage users and assign roles</p>
      </div>

      <UserTable />
    </div>
  )
}
