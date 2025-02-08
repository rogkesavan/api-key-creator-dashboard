
import { useState } from "react";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ApiKey {
  id: string;
  name: string;
  type: "llm" | "search";
  key: string;
  lastUsed: string;
  usageLimit: number;
  currentUsage: number;
}

const generateApiKey = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyLength = 48;
  let key = "sk_";
  for (let i = 0; i < keyLength; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const Index = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production LLM",
      type: "llm",
      key: generateApiKey(),
      lastUsed: "2024-03-10",
      usageLimit: 1000,
      currentUsage: 750,
    },
    {
      id: "2",
      name: "Test Search",
      type: "search",
      key: generateApiKey(),
      lastUsed: "2024-03-11",
      usageLimit: 500,
      currentUsage: 125,
    },
  ]);

  const handleCreateKey = (name: string, type: "llm" | "search") => {
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name,
      type,
      key: generateApiKey(),
      lastUsed: "",
      usageLimit: type === "llm" ? 1000 : 500,
      currentUsage: 0,
    };
    setApiKeys((prev) => [...prev, newKey]);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  };

  const calculateUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">API Key Management</h1>
        <p className="text-muted-foreground">
          Create and manage API keys for accessing our LLM and Search APIs.
        </p>
      </div>

      <div className="mb-8">
        <CreateApiKeyDialog onKeyCreate={handleCreateKey} />
      </div>

      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No API keys created yet. Click the button above to create your first key.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Weekly Usage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <Badge variant={apiKey.type === "llm" ? "default" : "secondary"}>
                      {apiKey.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{apiKey.key}</TableCell>
                  <TableCell>{apiKey.lastUsed || "Never"}</TableCell>
                  <TableCell className="w-[200px]">
                    <div className="space-y-2">
                      <Progress 
                        value={calculateUsagePercentage(apiKey.currentUsage, apiKey.usageLimit)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {apiKey.currentUsage} / {apiKey.usageLimit} requests
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteKey(apiKey.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Index;
