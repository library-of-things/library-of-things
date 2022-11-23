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
  Paper,
  Chip,
  Divider,
  Tooltip,
} from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import useAvatarImage from '../../util/hooks/use-avatar-image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useProfile from '../../util/hooks/use-profile';

export default function ItemPage({ user, data }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const ownerAvatar = useAvatarImage(data.owner.id);
  const profile = useProfile(data.owner.id);

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
    router.push(`/messages/${thread.id}`);
  }

  if (profile) {
    return (
      <Box>
        <Paper sx={{ padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row-reverse' },
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack direction='row' spacing={4}>
                <Stack spacing={1}>
                  <Typography variant='h4'>{data.name}</Typography>
                  <Stack direction='row' spacing={2}>
                    <Chip label={data.category} />
                    <Chip label={data.condition.toLowerCase()} />
                  </Stack>
                </Stack>
                <Paper
                  elevation={8}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'min-content',
                    width: 'min-content',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant='h3' sx={{ flexGrow: 1 }}>
                    {data.times_shared}
                  </Typography>
                  <Typography variant='overline' noWrap>
                    # of shares
                  </Typography>
                </Paper>
              </Stack>
              <Stack maxWidth={'50%'}>
                <Typography>Description</Typography>
                <Divider></Divider>
                <Typography>{data.description}</Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                borderRadius: 4,
                height: '300px',
                width: '300px',
                overflow: 'hidden',
                borderRadius: 2,
                backgroundColor: '#ffffff04',
                position: 'relative',
                marginBottom: { xs: 4, md: 0 },
              }}
            >
              <Image
                style={{ objectFit: 'contain' }}
                alt={data.name}
                fill
                src={data.image_url || '/assets/puppies.jpg'}
              />
            </Box>
          </Box>
        </Paper>

        <Container sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack>
            <Tooltip title='Contact owner' placement='top'>
              <Paper>
                <ButtonBase
                  component={Link}
                  href={`/profiles/${data.owner.id}`}
                  sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    padding: 2,
                  }}
                >
                  <Stack width='fit-content' spacing={1}>
                    <Typography>{data.owner.full_name}</Typography>
                    <Stack direction='row' spacing={1}>
                      <Avatar
                        src={ownerAvatar}
                        alt={data.owner.full_name}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Chip label={`${profile.trustScore}%`} />
                    </Stack>
                  </Stack>
                </ButtonBase>
              </Paper>
            </Tooltip>
            <Button variant='contained' onClick={startChat}>
              Contact owner
            </Button>
          </Stack>
        </Container>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Box>
    );
  }
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
