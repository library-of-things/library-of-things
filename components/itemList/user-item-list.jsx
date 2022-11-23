/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container'; // Grid version 2
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonBase, Box, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
export default function UserItemList({ userId }) {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function loadItems() {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('owner_id', userId);

      if (error) {
        throw error;
      }
      setItems(data);
    }

    loadItems();
  }, [supabase]);

  if (items)
    return (
      <Container>
        {items && (
          <Grid container spacing={8}>
            {items.map((item) => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
                gap={2}
                sx={{
                  overflow: 'hidden',
                  // width: '120px',
                  // height: '200px',
                }}
                key={item.id}
              >
                <Paper>
                  <ButtonBase
                    key={item.id}
                    component={Link}
                    href={`/items/${item.id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Image
                      src={`${item.image_url}`}
                      // fill
                      width={120}
                      height={200}
                      alt={item.name}
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                      // loading='lazy'
                    />
                  </ButtonBase>
                  <Box
                    overflow={'hidden'}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography variant='overline' noWrap align='center'>
                      {item.name}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
}
