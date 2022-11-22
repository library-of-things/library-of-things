import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Avatar, Button, Stack, Container, Box } from '@mui/material';
import { useState } from 'react';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function AvatarEdit({ uid, onUpload }) {
  const supabaseClient = useSupabaseClient();
  const avatarUrl = useAvatarImage(uid, true);
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Container maxWidth='lg'>
        <Avatar
          src={avatarUrl}
          alt={uid}
          sx={{ borderRadius: 2, width: 200, height: 200 }}
        />
      </Container>
      <Button
        color='secondary'
        variant='contained'
        component='label'
        disabled={uploading}
      >
        Upload avatar{' '}
        <input type='file' accept='image/*' onChange={uploadAvatar} hidden />
      </Button>
    </Stack>
  );
}
