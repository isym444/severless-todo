import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onSubmit: (content: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit">
        <Plus className="w-5 h-5" />
        Add Todo
      </Button>
    </form>
  );
} 