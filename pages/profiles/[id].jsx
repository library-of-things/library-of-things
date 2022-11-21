import { Container, Typography, Avatar } from '@mui/material';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAvatarImage from '../../util/hooks/use-avatar-image';
import useProfile from '../../util/hooks/use-profile';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const profile = useProfile(id);
  const avatarUrl = useAvatarImage(id);

  return (
    <Container>
      <Container>
        <Typography>Account page will go here!</Typography>
        <Avatar src={avatarUrl} alt={id} sx={{ width: 200, height: 200 }} />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </Container>
    </Container>
  );
}
