import { useState } from 'react';
import {
  Grid,
  Container,
  Box,
  MenuItem,
  TextField,
  Typography,
  Select,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function NewItemPage({ user, categories }) {
  const supabaseClient = useSupabaseClient();
  const [name, setName] = useState('');
  const [imageInput, setImageInput] = useState(null);
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabaseClient
      .from('items')
      .insert({
        name,
        description,
        condition,
        category,
        owner_id: user.id,
      })
      .select()
      .single();
    if (imageInput?.files.length !== 0) {
      console.log(imageInput);
      uploadImage(imageInput, data.id);
    }
  }

  async function uploadImage(imageInput, itemId) {
    try {
      setUploading(true);
      if (!imageInput.files || imageInput.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = imageInput.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${itemId}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from('items')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      let { error: urlError } = await supabaseClient
        .from('items')
        .update({
          image_url: `https://pekojwhvmxpfkvndiiny.supabase.co/storage/v1/object/public/items/${filePath}`,
        })
        .eq('id', itemId);

      if (urlError) {
        throw urlError;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      router.push('/community');
    }
  }
  return (
    <>
      <Container>
        <Stack component='form' onSubmit={handleSubmit} spacing={4}>
          <Typography variant='h2'>Add an item</Typography>
          <TextField
            id='item-name'
            label='Name of item'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id='item-description'
            label='Description'
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImageInput(e.target)}
          />
          <TextField
            select
            id='item-condition'
            label='Item condition'
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <MenuItem value='POOR'>Poor</MenuItem>
            <MenuItem value='LIGHTLY USED'>Lightly used</MenuItem>
            <MenuItem value='GOOD'>Good</MenuItem>
            <MenuItem value='EXCELLENT'>Excellent</MenuItem>
            <MenuItem value='NEW'>New</MenuItem>
          </TextField>
          <TextField
            select
            id='item-category'
            label='Item Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </TextField>

          <Button type='submit' variant='contained' disabled={uploading}>
            Submit
          </Button>
        </Stack>
        <Backdrop sx={{ color: '#fff' }} open={uploading}>
          <CircularProgress color='primary' />
        </Backdrop>
      </Container>
    </>
  );
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

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, description');

  return {
    props: {
      initialSession: session,
      user: session.user,
      categories: categories ?? [],
    },
  };
};
