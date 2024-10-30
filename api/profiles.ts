import { createClient } from "@/utils/supabase/client";
import { Profile } from "@/types/database";

export async function checkAndCreateProfile(userId: string) {
  const supabase = createClient();

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!existingProfile) {
    const newProfile: Partial<Profile> = {
      user_id: userId,
      tier: 'free',
    };

    const { error } = await supabase
      .from('profiles')
      .insert([newProfile]);

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  return existingProfile;
} 