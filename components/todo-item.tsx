import { Todo } from "@/types/database";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function TodoItem({ todo, onToggleComplete, onDelete, className }: TodoItemProps) {
  return (
    <div 
      className={cn(
        "p-4 border rounded-lg transition-colors",
        "hover:bg-gray-50",
        todo.is_completed && "bg-gray-50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              "transition-colors hover:bg-gray-100",
              todo.is_completed && "bg-green-500 border-green-500"
            )}
          >
            {todo.is_completed && <Check className="w-3 h-3 text-white" />}
          </button>
          
          <span 
            className={cn(
              "cursor-pointer flex-1 hover:text-black transition-colors",
              todo.is_completed && "line-through text-gray-500"
            )}
            onClick={() => onToggleComplete(todo.id)}
          >
            {todo.task}
          </span>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {todo.completed_at && (
        <div className="mt-2 text-xs text-gray-400">
          Completed on: {new Date(todo.completed_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 