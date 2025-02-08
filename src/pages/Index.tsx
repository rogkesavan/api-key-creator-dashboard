
import { useState } from "react";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";

interface ApiKey {
  id: string;
  name: string;
  type: "llm" | "search";
  key: string;
  lastUsed: string;
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
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const handleCreateKey = (name: string, type: "llm" | "search") => {
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name,
      type,
      key: generateApiKey(),
      lastUsed: "",
    };
    setApiKeys((prev) => [...prev, newKey]);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
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
          apiKeys.map((apiKey) => (
            <ApiKeyCard
              key={apiKey.id}
              id={apiKey.id}
              name={apiKey.name}
              type={apiKey.type}
              apiKey={apiKey.key}
              lastUsed={apiKey.lastUsed}
              onDelete={handleDeleteKey}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
