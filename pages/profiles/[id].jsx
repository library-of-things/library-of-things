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
      <Container>
        <Container sx={{ display: 'flex' }}>
          <Box mr={8}>
            <Typography variant='h4'>{profile.full_name}</Typography>
            <Avatar src={avatarUrl} alt={id} sx={{ width: 200, height: 200 }} />
          </Box>
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
                Items borrowed
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
        </Container>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
        {user && user.id === id ? (
          <SelfItemList userId={user.id} />
        ) : (
          <UserItemList userId={id} />
        )}
        {user && user.id === id && <AccountEdit />}
      </Container>
    );
}
