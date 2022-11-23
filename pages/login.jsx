import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
  useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  useEffect(() => {
    if (user) router.push('/');
  }, [user]);
  return (
    <Container>
      <Auth
        redirectTo='localhost:3000/'
        appearance={{ theme: ThemeSupa }}
        theme='dark'
        supabaseClient={supabaseClient}
      ></Auth>
    </Container>
  );
}
