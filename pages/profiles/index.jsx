import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Container, Typography } from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import AccountEdit from '../../components/account-edit';
import MyProfile from '../../components/profile/profile';

export default function Profile() {
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
          <MyProfile />
          <AccountEdit />
        </Container>
      )}
    </Container>
  );
}
