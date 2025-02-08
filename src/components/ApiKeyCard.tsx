
import { useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ApiKeyCardProps {
  id: string;
  name: string;
  type: "llm" | "search";
  key: string;
  lastUsed: string;
  onDelete: (id: string) => void;
}

export const ApiKeyCard = ({
  id,
  name,
  type,
  key,
  lastUsed,
  onDelete,
}: ApiKeyCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(key);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    onDelete(id);
    toast.success("API key deleted successfully");
  };

  return (
    <div className="glass-card rounded-lg p-6 mb-4 api-key-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-foreground mb-2">
            {type.toUpperCase()}
          </span>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <code className="flex-1 p-2 bg-muted rounded font-mono text-sm">
          {key.slice(0, 32)}...
        </code>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="hover:bg-primary/10"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Last used: {lastUsed || "Never"}
      </p>
    </div>
  );
};
