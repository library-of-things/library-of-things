import { useUser } from '@supabase/auth-helpers-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HeaderAvatar from './header-avatar';
import Link from 'next/link';

const navItems = ['Home', 'Community', 'Profile'];

export default function Navbar() {
  const user = useUser();

  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <ButtonBase component={Link} href='/'>
              <Typography variant='h6'>Cup of Sugar</Typography>
            </ButtonBase>
          </Box>
          <Tooltip title='Add a new item'>
            <IconButton component={Link} href='/newitem'>
              <AddCircleOutlineIcon size='lg' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View messages'>
            <IconButton component={Link} href='/messages'>
              <MailOutlineIcon size='lg' />
            </IconButton>
          </Tooltip>
          <Button component={Link} href='community' sx={{ color: '#fff' }}>
            Community
          </Button>
          {!user ? (
            <Button component={Link} href='/login' sx={{ color: '#fff' }}>
              Login
            </Button>
          ) : (
            <HeaderAvatar />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
    </>
  );
}
