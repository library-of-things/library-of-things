import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function HeaderAvatar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const avatarUrl = useAvatarImage(user.id, true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);

  const handleClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  if (true) {
    return (
      <>
        <IconButton onClick={handleClick} size='small'>
          <Avatar src={avatarUrl} alt={user.id} />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem component={Link} href={'/profile'}>
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
