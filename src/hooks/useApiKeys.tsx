
import { useState } from "react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  type: "llm" | "search";
  currentUsage: number;
  usageLimit: number;
  lastUsed: string;
  status: "approved" | "pending";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "suspended" | "pending";
  apiKeys: ApiKey[];
}

export const useApiKeys = () => {
  const [users, setUsers] = useState<User[]>([]);

  const createApiKey = async (userId: string, name: string, type: "llm" | "search") => {
    try {
      // Mock API call - replace with actual API integration later
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              apiKeys: [
                ...user.apiKeys,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  name,
                  type,
                  currentUsage: 0,
                  usageLimit: type === "llm" ? 1000 : 500,
                  lastUsed: "-",
                  status: "pending",
                },
              ],
            };
          }
          return user;
        })
      );
      toast.success("API key request submitted for approval");
    } catch (error) {
      toast.error("Failed to create API key");
      console.error(error);
    }
  };

  const deleteApiKey = async (userId: string, keyId: string) => {
    try {
      // Mock API call - replace with actual API integration later
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              apiKeys: user.apiKeys.filter((key) => key.id !== keyId),
            };
          }
          return user;
        })
      );
      toast.success("API key deleted successfully");
    } catch (error) {
      toast.error("Failed to delete API key");
      console.error(error);
    }
  };

  const approveApiKey = async (userId: string, keyId: string) => {
    try {
      // Mock API call - replace with actual API integration later
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              apiKeys: user.apiKeys.map((key) =>
                key.id === keyId ? { ...key, status: "approved" } : key
              ),
            };
          }
          return user;
        })
      );
      toast.success("API key approved successfully");
    } catch (error) {
      toast.error("Failed to approve API key");
      console.error(error);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      // Mock API call - replace with actual API integration later
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            const newStatus = user.status === "active" ? "suspended" : "active";
            return {
              ...user,
              status: newStatus,
            };
          }
          return user;
        })
      );
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };

  return {
    users,
    setUsers,
    createApiKey,
    deleteApiKey,
    approveApiKey,
    toggleUserStatus,
  };
};
