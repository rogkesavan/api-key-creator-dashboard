import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users } from "lucide-react";
import { useApiKeys } from "@/hooks/useApiKeys";

const SuperAdmin = () => {
  const {
    users,
    setUsers,
    approveApiKey,
    toggleUserStatus,
  } = useApiKeys();

  useEffect(() => {
    setUsers([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        apiKeys: [
          {
            id: "key1",
            name: "Production API",
            type: "llm",
            currentUsage: 750,
            usageLimit: 1000,
            lastUsed: "2024-03-10",
            status: "approved",
          },
          {
            id: "key2",
            name: "Development API",
            type: "search",
            currentUsage: 0,
            usageLimit: 500,
            lastUsed: "-",
            status: "pending",
          },
        ],
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "admin",
        status: "active",
        apiKeys: [
          {
            id: "key3",
            name: "Test API",
            type: "search",
            currentUsage: 250,
            usageLimit: 500,
            lastUsed: "2024-03-11",
            status: "approved",
          },
        ],
      },
      {
        id: "3",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "user",
        status: "pending",
        apiKeys: [
          {
            id: "key4",
            name: "New API",
            type: "llm",
            currentUsage: 0,
            usageLimit: 1000,
            lastUsed: "-",
            status: "pending",
          },
        ],
      },
    ]);
  }, []);

  const calculateUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Super Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage users and monitor API key usage
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New User
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Users & API Keys</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>API Keys</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        {user.apiKeys.map((key) => (
                          <div key={key.id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{key.name}</span>
                              <div className="flex gap-2 items-center">
                                <Badge variant="outline">{key.type}</Badge>
                                {key.status === "pending" && (
                                  <Badge variant="secondary">Pending Approval</Badge>
                                )}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Progress
                                value={calculateUsagePercentage(
                                  key.currentUsage,
                                  key.usageLimit
                                )}
                                className="h-2"
                              />
                              <p className="text-xs text-muted-foreground">
                                {key.currentUsage} / {key.usageLimit} requests
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.apiKeys.some((key) => key.status === "pending") ? (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            approveApiKey(
                              user.id,
                              user.apiKeys.find((k) => k.status === "pending")?.id || ""
                            )
                          }
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant={user.status === "active" ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
