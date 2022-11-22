/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container'; // Grid version 2
import Link from 'next/link';
import { ButtonBase, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
export default function SelfItemList({ userId }) {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

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

  async function deleteItem(itemId) {
    const { data, error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId);

    await loadItems();
  }

  if (items)
    return (
      <Container
        container
        spacing={2}
        xs={12}
        sm={6}
        md={4}
        xl={3}
        padding='1vw'
        alignItems='center'
        justifyItems='center'
      >
        <ImageList
          gap={12}
          sx={{
            mb: 8,
            gridTemplateColumns:
              'repeat(auto-fill, minmax(200px, 1fr))!important',
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
                <img src={`${item.image_url}`} alt={item.name} loading='lazy' />

                <ImageListItemBar
                  title={item.name}
                  subtitle={<span>by: {item.description}</span>}
                  position='below'
                  actionIcon={
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const deleted = item;
                        deleteItem(item.id);
                        setDeletedItem(deleted);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </ButtonBase>
          ))}
        </ImageList>
      </Container>
    );
}
