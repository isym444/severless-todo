# Project overview
Use this guide to build backend for the todo web app

# Tech stack
- We will use Next.js, Supabase and Clerk

# Tables already created
CREATE TABLE todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,  -- Changed from TEXT to UUID to match auth.users.id
    task TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

CREATE TABLE profiles (
    user_id TEXT PRIMARY KEY,
    tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

# Requirements
1. Create user to profiles table
   1. After a user signin via clerk, we should get the userId from clerk, and check if this userId exists in 'profiles' table, matching "user_id"
   2. if the user doesn’t exist, then create a user in 'profiles' table
   3. if the user exists already, then proceed, and pass on user_id to functions like generate emojis
2. Add todos to the todos table
   1. When user clicks the add todo button, it should update the todos table with this new todo in the task column, the user_id of the current signed-in user etc.
3. Display all todos in the ui
   1. Ui should fetch and display all todos from todo table associated with the currently signed in user
   2. when a new todo is added, the list of todos shown on the ui should be updated automatically to add the new todo to the grid
4. Completed interaction
   1. When user clicks on a todo displayed on the UI, the todo row associated with that todo on the ui should have its is_completed field set to true and the completed_at timestamp updated
   2. If a user clicks on an already completed todo item on the UI, the todo row associated with that todo on the ui should have its is_completed field set to false and the completed_at timestamp wiped