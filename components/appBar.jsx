import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserAvatar from './user-avatar';
import Link from 'next/link';

const navItems = ['Home', 'Community', 'Profile'];

export default function HeaderAppBar() {
  const supabase = useSupabaseClient();

  const user = useUser();
  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Cup of Sugar
          </Typography>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#fff' }}>
              {item}
            </Button>
          ))}
          {!user ? (
            <Button component={Link} href='/login' sx={{ color: '#fff' }}>
              Login
            </Button>
          ) : (
            <UserAvatar />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
    </>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const supabase = createServerSupabaseClient(ctx);

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//     },
//   };
// };
