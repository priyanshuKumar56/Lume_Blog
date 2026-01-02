// Admin posts management
import { PostTable } from "@/components/admin/post-table"

export default function AdminPostsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Post Management</h1>
        <p className="text-muted-foreground">Approve and manage published posts</p>
      </div>

      <PostTable />
    </div>
  )
}
