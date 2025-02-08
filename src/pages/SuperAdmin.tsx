
import { useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "suspended";
  apiKeys: {
    id: string;
    name: string;
    type: "llm" | "search";
    currentUsage: number;
    usageLimit: number;
    lastUsed: string;
  }[];
}

const SuperAdmin = () => {
  // Sample data - in a real app, this would come from your backend
  const [users, setUsers] = useState<User[]>([
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
          id: "key2",
          name: "Test API",
          type: "search",
          currentUsage: 250,
          usageLimit: 500,
          lastUsed: "2024-03-11",
        },
      ],
    },
  ]);

  const calculateUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  const handleStatusToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "active" ? "suspended" : "active",
          };
        }
        return user;
      })
    );
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
                        variant={user.status === "active" ? "success" : "destructive"}
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
                              <Badge variant="outline">{key.type}</Badge>
                            </div>
                            <div className="space-y-1">
                              <Progress
                                value={calculateUsagePercentage(key.currentUsage, key.usageLimit)}
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
                      <Button
                        variant={user.status === "active" ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </Button>
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
