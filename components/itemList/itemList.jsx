/* eslint-disable @next/next/no-img-element */
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import cardData from './cardData';
import Container from '@mui/material/Container'; // Grid version 2
import Link from 'next/link';
import { ButtonBase } from '@mui/material';
import Image from 'next/image';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function ItemList({ initialQuery }) {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(initialQuery.cat);

  useEffect(() => {
    async function fetchCategories() {
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name, description');
      setCategories(categories);
    }

    async function loadItems() {
      let query = supabase.from('items').select('*');
      if (currentCategory) {
        query = query.eq('category_id', currentCategory);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }
      setItems(data);
    }
    if (supabase) {
      fetchCategories();
      loadItems();
    }
  }, [supabase, currentCategory]);

  if (categories)
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            m: 1,
          }}
        >
          <ButtonGroup>
            {categories.map((cat) => (
              <Button
                variant='contained'
                color={currentCategory === cat.id ? 'secondary' : 'primary'}
                key={`category-${cat.id}`}
                onClick={() => {
                  setCurrentCategory(
                    currentCategory === cat.id ? null : cat.id
                  );
                }}
              >
                {cat.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
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
                  sx={
                    {
                      // overflow: 'hidden',
                    }
                  }
                  key={item.id}
                >
                  <ButtonBase
                    key={item.id}
                    component={Link}
                    href={`/items/${item.id}`}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 500,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={`${item.image_url || '/assets/puppies.jpg'}`}
                        fill
                        alt={item.name}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        quality={75}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </Box>
                  </ButtonBase>
                  <Box>
                    <Typography variant='h6' noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant='caption' noWrap>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </>
    );
}
