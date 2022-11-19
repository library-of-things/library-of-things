import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function UserAvatar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [profile, setProfile] = useState();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);

  const handleClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }

    if (user) loadProfile();
  }, [user]);

  if (profile) {
    return (
      <>
        <IconButton onClick={handleClick} size='small'>
          <Avatar src={profile.avatar_url} alt={profile.full_name} />
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
