import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Typography,
  Container,
  Box,
  Badge,
  Divider,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
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
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.error(error);
    } finally {
      setLoading(false);
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
