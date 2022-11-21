import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function UserAvatar({ userId }) {
  const supabaseClient = useSupabaseClient();
  const avatarUrl = useAvatarImage(userId);

  if (avatarUrl) {
    return (
          <Avatar src={avatarUrl} alt={userId} />
    );
  }
}
