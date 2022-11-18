import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Container, Typography } from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/account';

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Container>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='dark'
        />
      ) : (
        <Container>
          <Typography>Account page will go here!</Typography>
          <Account />
        </Container>
      )}
    </Container>
  );
}
