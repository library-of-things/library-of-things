import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Avatar } from '@mui/material';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function UserAvatar({ userId }) {
  const avatarUrl = useAvatarImage(userId);

  if (avatarUrl) {
    return <Avatar src={avatarUrl} alt={userId} />;
  }
}
