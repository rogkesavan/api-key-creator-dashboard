
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface CreateApiKeyDialogProps {
  onKeyCreate: (name: string, type: "llm" | "search") => void;
}

export const CreateApiKeyDialog = ({ onKeyCreate }: CreateApiKeyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"llm" | "search">("llm");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }
    onKeyCreate(name, type);
    setOpen(false);
    setName("");
    setType("llm");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="api-key-slide-up">
          <Plus className="mr-2 h-4 w-4" />
          Create New API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Production LLM Key"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Key Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as "llm" | "search")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="llm" id="llm" />
                <Label htmlFor="llm">LLM Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="search" id="search" />
                <Label htmlFor="search">Search API</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full">
            Generate API Key
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
