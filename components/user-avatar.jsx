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

  if (profile) {
    return (
      <>
        <IconButton onClick={handleClick} size='small'>
          <Avatar src={avatarUrl} alt={userId} />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => supabaseClient.auth.signOut()}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      </>
    );
  }
}
