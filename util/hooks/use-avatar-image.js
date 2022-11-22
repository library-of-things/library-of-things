import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export default function useAvatarImage(userId, bust = false) {
  const supabaseClient = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function loadProfile(userId) {
      const { data } = await supabaseClient
        .from('profiles')
        .select('avatar_url, updated_at')
        .eq('id', userId)
        .single();
      if (data?.avatar_url) {
        await loadAvatar(data.avatar_url, data.updated_at);
      }
    }

    async function loadAvatar(path, updatedAt) {
      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(`${path}?bust=${bust ? updatedAt : null}`);
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
  }, [userId, bust]);

  return avatarUrl;
}
