"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { TodoForm } from "@/components/todo-form";
import { TodoItem } from "@/components/todo-item";
import { Todo } from "@/types/todo";
import { createClient } from "@supabase/supabase-js";
import { Profile } from "@/types/database";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (user) {
      checkAndCreateProfile();
      loadTodos();
    }
  }, [user]);

  const checkAndCreateProfile = async () => {
    if (!user?.id) return;

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!existingProfile) {
      // Create new profile if it doesn't exist
      const newProfile: Partial<Profile> = {
        user_id: user.id,
        tier: 'free',
      };

      const { error } = await supabase
        .from('profiles')
        .insert([newProfile]);

      if (error) {
        console.error('Error creating profile:', error);
      }
    }
  };

  const loadTodos = async () => {
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) {
      // Sort the todos before setting state
      const sortedTodos = (data as Todo[]).sort((a, b) => {
        // First sort by completion status
        if (a.is_completed !== b.is_completed) {
          return a.is_completed ? 1 : -1;
        }
        // Then sort by creation date for todos with same completion status
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setTodos(sortedTodos);
    }
  };

  const addTodo = async (content: string) => {
    if (!user?.id) return;

    // Create new todo according to the database schema
    const newTodo = {
      task: content,
      user_id: user.id,
      is_completed: false,
      completed_at: null,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([newTodo])
      .select()
      .single();

    if (error) {
      console.error('Error adding todo:', error.message);
      return;
    }

    if (data) {
      // Add the new todo to the beginning of the array
      setTodos((prev) => [data, ...prev]);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // Prepare the updates based on current state
    const updates = {
      is_completed: !todo.is_completed,
      completed_at: !todo.is_completed 
        ? new Date().toISOString() 
        : null  // Set to null when uncompleting a todo
    };

    const { error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling todo:', error);
      return;
    }

    // Update local state and sort todos
    setTodos((prev) =>
      prev
        .map((t) => t.id === id ? { ...t, ...updates } : t)
        .sort((a, b) => {
          // First sort by completion status
          if (a.is_completed !== b.is_completed) {
            return a.is_completed ? 1 : -1;
          }
          // Then sort by creation date for todos with same completion status
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        })
    );
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Please sign in to manage your todos</p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleTodo}
            onDelete={deleteTodo}
            className="hover:text-black transition-colors"
          />
        ))}
      </div>
    </main>
  );
}
