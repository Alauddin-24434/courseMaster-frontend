"use client"

interface User {
  id: string
  name: string
  email: string
  joinDate: string
  courses: number
  status: "active" | "inactive"
}

export function AdminUsersTable() {
  const users: User[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      joinDate: "2 Jan 2025",
      courses: 3,
      status: "active",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      joinDate: "5 Jan 2025",
      courses: 1,
      status: "active",
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@example.com",
      joinDate: "8 Jan 2025",
      courses: 2,
      status: "inactive",
    },
  ]

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-center font-semibold">Courses</th>
              <th className="px-4 py-3 text-left font-semibold">Joined</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b border-border last:border-0 ${idx % 2 === 0 ? "bg-transparent" : "bg-muted/30"}`}
              >
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                <td className="px-4 py-3 text-center">{user.courses}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{user.joinDate}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
