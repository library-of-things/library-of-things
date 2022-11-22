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
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function ItemList({ initialQuery }) {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    if (initialQuery.cat) {
      setCurrentCategory(parseInt(initialQuery.cat));
    }
  }, [initialQuery]);

  useEffect(() => {
    async function fetchCategories() {
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name, description');
      console.log(categories);
      setCategories(categories);
    }
    if (supabase) fetchCategories();

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
    loadItems();
  }, [currentCategory]);

  if (categories)
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
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
        <Container
          container
          spacing={2}
          xs={12}
          sm={6}
          md={4}
          xl={3}
          padding='1vw'
          alignitems='center'
          justifyitems='center'
        >
          {items && (
            <ImageList
              gap={12}
              sx={{
                mb: 8,
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(280px, 1fr))!important',
              }}
            >
              {items.map((item) => (
                <ButtonBase
                  key={item.id}
                  component={Link}
                  href={`/items/${item.id}`}
                >
                  <ImageListItem
                    sx={{ height: '100% !important' }}
                    key={item.id}
                    style={{ borderRadius: '5' }}
                  >
                    <img
                      src={`${item.image_url}`}
                      alt={item.name}
                      loading='lazy'
                    />

                    <ImageListItemBar
                      title={item.name}
                      subtitle={<span>by: {item.description}</span>}
                      position='below'
                    />
                  </ImageListItem>
                </ButtonBase>
              ))}
            </ImageList>
          )}
        </Container>
      </>
    );
}
