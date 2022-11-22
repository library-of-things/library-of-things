import {
  Container,
  Typography,
  Avatar,
  Box,
  Card,
  CardMedia,
  Stack,
  Button,
  ButtonBase,
} from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import useAvatarImage from '../../util/hooks/use-avatar-image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ItemPage({ user, data }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const ownerAvatar = useAvatarImage(data.owner.id);

  async function startChat() {
    const { data: thread, error } = await supabase
      .from('threads')
      .insert({
        sender_id: user.id,
        receiver_id: data.owner.id,
        item_id: data.id,
      })
      .select()
      .single();
    console.log(thread.id);
    router.push(`/messages/${thread.id}`);
  }

  return (
    <Container>
      <Stack>
        <Typography variant='h4'>{data.name}</Typography>
        <Typography variant='h6'>{data.category}</Typography>
      </Stack>
      <Box
        sx={{
          borderRadius: 8,
          height: '500px',
          width: '500px',
          overflow: 'hidden',
        }}
      >
        <img alt={data.name} height='500' width='500' src={data.image_url} />
      </Box>
      <Box></Box>

      <Box>
        <Box>
          <Typography>Description: {data.description}</Typography>
          <Typography>Condition: {data.condition}</Typography>
          <Typography>Times Lent: {data.times_shared}</Typography>
          <Typography>
            Availability: {data.borrower_id ? 'Unavailable' : 'Available'}
          </Typography>
        </Box>
        <Box>
          <Typography>{data.owner.full_name}</Typography>
          <ButtonBase component={Link} href={`/profiles/${data.owner.id}`}>
            <Avatar src={ownerAvatar} alt={data.owner.full_name} />
          </ButtonBase>
          <Button variant='contained' onClick={startChat}>
            Contact owner
          </Button>
        </Box>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
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
