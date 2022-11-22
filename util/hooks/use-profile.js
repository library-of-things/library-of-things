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

      console.log(data);
      const totalPossibleTrust =
        data.item_lend_count * 1.2 +
        data.item_borrow_count * 0.8 +
        data.item_count_good * 1.2;

      const trustRaw =
        data.item_lend_count * 1.2 +
        data.item_borrow_count * 0.8 +
        data.item_count_good * 1.2 -
        data.receives_count_bad;

      let trustScore = 0;
      if (trustRaw) {
        trustScore = totalPossibleTrust / trustRaw;
      }

      setProfile({ ...data, trustScore });
    }
    if (userId) {
      loadProfile(userId);
    }
  }, [supabaseClient, userId]);

  return profile;
}
