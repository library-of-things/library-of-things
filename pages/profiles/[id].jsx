import { Container, Typography, Avatar } from '@mui/material';
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
        <Container>
          <Typography variant='h4'>{profile.full_name}</Typography>
          <Avatar src={avatarUrl} alt={id} sx={{ width: 200, height: 200 }} />
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          {user && user.id === id ? (
            <SelfItemList userId={user.id} />
          ) : (
            <UserItemList userId={id} />
          )}
        </Container>
        {user && user.id === id && <AccountEdit />}
      </Container>
    );
}
