import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export default function useProfile(userId) {
  const supabaseClient = useSupabaseClient();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile(userId) {
      const { data } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      setProfile(data);
    }
    if (userId) {
      loadProfile(userId);
    }
  }, [supabaseClient, userId]);

  return profile;
}
