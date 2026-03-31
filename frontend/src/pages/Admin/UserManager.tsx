import { useAllUser } from "../../hooks/useAllUser";

export const UserManager = () => {
  const { users, loading, error } = useAllUser();

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Quản lý user
      </h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-500 text-white uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.gender}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        u.role === "admin"
                          ? " text-red-500"
                          : " text-green-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
