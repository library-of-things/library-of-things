import { useUser } from '@supabase/auth-helpers-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderAvatar from './header-avatar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Navbar() {
  const supabase = useSupabaseClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useUser();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name, description');

      setCategories(categories);
    }
    if (supabase) fetchCategories();
  });

  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <IconButton
              sx={{ marginRight: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <ButtonBase component={Link} href='/'>
              <Typography color='#EAE1DF' variant='h6' mr={1}>
                Library
              </Typography>
              <Typography
                color='#EAE1DF'
                variant='caption'
                fontStyle='italic'
                fontWeight='300'
                fontSize={20}
                textTransform='lowercase'
                letterSpacing={1.5}
                mr={1.4}
              >
                <sub>of</sub>
              </Typography>
              <Typography color='#EAE1DF' variant='h6'>
                Things
              </Typography>
            </ButtonBase>
          </Box>
          <Tooltip title='New item'>
            <IconButton component={Link} href='/newitem'>
              <AddCircleOutlineIcon size='lg' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View messages'>
            <IconButton component={Link} href='/messages'>
              <MailOutlineIcon size='lg' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Community'>
            <IconButton component={Link} href='/community'>
              <AutoStoriesIcon />
            </IconButton>
          </Tooltip>
          {!user ? (
            <Button variant='contained' component={Link} href='/login'>
              Login
            </Button>
          ) : (
            <HeaderAvatar />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {categories && (
          <List>
            {categories.map((category) => (
              <ListItem key={category.id} disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} href={`/community?cat=${category.id}`}>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
    </>
  );
}
