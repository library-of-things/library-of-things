import {
  Container,
  Typography,
  Avatar,
  Paper,
  Stack,
  Box,
} from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserItemList from '../../components/itemList/user-item-list';
import useAvatarImage from '../../util/hooks/use-avatar-image';
import useProfile from '../../util/hooks/use-profile';
import { useUser } from '@supabase/auth-helpers-react';
import AccountEdit from '../../components/account-edit';
import SelfItemList from '../../components/itemList/self-item-list';

export default function Profile() {
  const router = useRouter();
  const user = useUser();
  const { id } = router.query;
  const profile = useProfile(id);
  const avatarUrl = useAvatarImage(id);

  if (id && profile)
    return (
      <Box>
        <Paper elevation={1} sx={{ padding: 4, width: '100vw', mb: 4 }}>
          <Box sx={{ width: 'fit-content', marginLeft: 'auto' }}>
            {user && user.id === id && <AccountEdit />}
          </Box>
          <Container
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center' },
            }}
          >
            <Box
              sx={{
                marginRight: { xs: 0, sm: 8 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' },
                marginBottom: { xs: 2, sm: 0 },
              }}
            >
              <Avatar
                src={avatarUrl}
                alt={id}
                sx={{
                  width: { xs: 100, md: 150 },
                  height: { xs: 100, md: 150 },
                }}
              />
              <Typography variant='h4'>{profile.full_name}</Typography>
            </Box>
            <Stack spacing={2}>
              <Stack direction='row' spacing={4}>
                <Paper
                  elevation={8}
                  sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'min-content',
                  }}
                >
                  <Typography variant='h3' sx={{ flexGrow: 1 }}>
                    {profile.item_lend_count}
                  </Typography>
                  <Typography variant='overline' noWrap>
                    Items lent
                  </Typography>
                </Paper>
                <Paper
                  elevation={8}
                  sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'min-content',
                  }}
                >
                  <Typography variant='h3' sx={{ flexGrow: 1 }}>
                    {profile.item_borrow_count}
                  </Typography>
                  <Typography variant='overline' noWrap>
                    Borrowed
                  </Typography>
                </Paper>
                <Paper
                  elevation={8}
                  sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'min-content',
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                  }}
                >
                  <Typography variant='h3' sx={{ flexGrow: 1 }}>
                    {profile.trustScore}
                  </Typography>
                  <Typography variant='overline' noWrap>
                    Trust Score
                  </Typography>
                </Paper>
              </Stack>
              <Stack>
                <Paper elevation={2} sx={{ padding: 1 }}>
                  <Typography>Member since:</Typography>
                  <Typography>
                    {new Date(profile.join_date).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Stack>
            </Stack>
          </Container>
        </Paper>
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        {user && user.id === id ? (
          <SelfItemList userId={user.id} />
        ) : (
          <UserItemList userId={id} />
        )}
      </Box>
    );
}
