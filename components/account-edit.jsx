import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Typography,
  Box,
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

export default function AccountEdit({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);
  const avatarUrl = useAvatarImage(user.id, true);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
        setUploadedAvatar(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ fullName, avatarUrl }) {
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
      <Box>
        <Button
          variant='contained'
          onClick={() => setIsEditing(true)}
          color='secondary'
        >
          Edit Profile
        </Button>
      </Box>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* <DialogContentText mb={2}>
            Edit your Library of Things profile.
          </DialogContentText> */}
          <AvatarEdit
            uid={user.id}
            url={uploadedAvatar}
            onUpload={(url) => {
              setUploadedAvatar(url);
              updateProfile({ avatarUrl: url });
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
          <Button
            onClick={() => {
              updateProfile({ fullName, avatarUrl: uploadedAvatar });
              setIsEditing(false);
            }}
            variant='contained'
          >
            Update Profile
          </Button>
          <Button onClick={() => setIsEditing(false)} variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
