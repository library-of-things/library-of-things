import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function AvatarEdit({ uid, url, onUpload }) {
  const supabaseClient = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const user = useUser();
  // const [profile, setProfile] = useState();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('avatars')
        .download(`${path}?bust=${Date.now()}`);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error('Error downloading image: ', error);
    }
  }
  const uploadAvatar = async (event) => {
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
  };

  return (
    <>
      <Avatar src={avatarUrl} alt={uid} sx={{ width: 100, height: 100 }} />
      <Button variant='contained' component='label' disabled={uploading}>
        Upload avatar{' '}
        <input type='file' accept='image/*' onChange={uploadAvatar} hidden />
      </Button>
    </>
  );
}
