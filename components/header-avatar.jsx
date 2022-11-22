import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ButtonBase,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function HeaderAvatar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const avatarUrl = useAvatarImage(user.id, true);
  const [fullName, setFullName] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);

  const handleClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  useEffect(() => {
    async function fetchProfile() {
      let { data, error, status } = await supabaseClient
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) setFullName(data.full_name);
    }
    fetchProfile();
  }, [supabaseClient, user]);

  if (user) {
    return (
      <>
        <ButtonBase onClick={handleClick} size='small' sx={{ padding: 1 }}>
          <Avatar src={avatarUrl} alt={user.id} />
          <ArrowDropDownIcon />
        </ButtonBase>
        <Menu
          anchorEl={menuAnchor}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem component={Link} href={`/profiles/${user.id}`}>
            <ListItemIcon>
              <AccountBoxIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={fullName} secondary='View Profile' />
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
