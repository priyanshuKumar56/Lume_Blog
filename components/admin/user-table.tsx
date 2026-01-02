// Admin user management table
"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function UserTable() {
  const { data, isLoading, mutate } = useSWR("/api/admin/users", (url) => fetch(url).then((res) => res.json()))

  async function updateRole(userId: string, newRole: string) {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) throw new Error("Failed to update role")
      mutate()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const users = data?.users || []

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Role</th>
                <th className="text-left py-2 px-4">Joined</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge>{user.role}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      defaultValue={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="p-1 border rounded text-sm"
                    >
                      <option value="READER">Reader</option>
                      <option value="AUTHOR">Author</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
