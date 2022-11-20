import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export default function useAvatarImage(userId) {
  const supabaseClient = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function loadProfile(userId) {
      const { data } = await supabaseClient
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single();
      await loadAvatar(data.avatar_url);
    }

    async function loadAvatar(path) {
      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(`${path}?bust=${Date.now()}`);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.error('Error downloading image: ', error);
      }
    }
    if (userId) {
      loadProfile(userId);
    }
  }, [userId]);
  return avatarUrl;
}
