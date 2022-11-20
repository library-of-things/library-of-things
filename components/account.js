import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Typography,
  Box,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import AvatarEdit from './avatar-edit';
import useAvatarImage from '../util/hooks/use-avatar-image';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const avatarUrl = useAvatarImage(user.id, Date.now());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username || data.full_name);
        setFullName(data.full_name);
        loadAvatar(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadAvatar(path) {
    try {
      const { data, error } = await supabase.storage
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

  async function updateProfile({ username, fullName, avatarUrl }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      setIsEditing(false);
      alert('Profile updated');
    } catch (error) {
      alert('Error updating user data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Typography>LOADING</Typography>
      ) : (
        <Box>
          <Avatar alt={fullName} src={avatarUrl} />
          <Typography>{fullName}</Typography>
          <Typography>{username}</Typography>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </Box>
      )}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your Library of Things profile.
          </DialogContentText>
          <AvatarEdit
            uid={user.id}
            url={avatarUrl}
            onUpload={(url) => {
              setAvatarUrl(url);
              // updateProfile({ fullName, avatarUrl: url });
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='email'
            type='email'
            label='Email Address'
            fullWidth
            variant='standard'
            defaultValue={user.email}
            disabled
          />
          <TextField
            margin='dense'
            id='fullName'
            type='text'
            label='Full Name'
            fullWidth
            variant='standard'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateProfile({ fullName, avatarUrl })}>
            Update Profile
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
