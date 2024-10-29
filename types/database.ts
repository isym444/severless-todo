export type Profile = {
  user_id: string;
  tier: 'free' | 'pro';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export type Todo = {
  id: string;
  user_id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
  completed_at: string | null;
} 