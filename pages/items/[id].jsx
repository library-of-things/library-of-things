import { Container, Typography, Avatar } from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAvatarImage from '../../util/hooks/use-avatar-image';
import useProfile from '../../util/hooks/use-profile';

export default function ItemPage({ user, data }) {
  const router = useRouter();
  // const { id } = router.query;
  // const profile = useProfile(id);
  // const avatarUrl = useAvatarImage(id);

  return (
    <Container>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { data } = await supabase
    .from('items')
    .select('*,owner:owner_id(*)')
    .eq('id', ctx.query.id)
    .single();

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};
