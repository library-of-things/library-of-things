/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container'; // Grid version 2
import Link from 'next/link';
import { ButtonBase, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
export default function SelfItemList({ userId }) {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState(null);
  const [deletedItem, setDeletedItem] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

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
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      throw error;
    }
    setDeletedItem(data);
    await loadItems();
  }

  function deletedSnackbarClose() {
    setDeletedItem(false);
  }

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
                }}
                key={item.id}
              >
                <Paper>
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
                        height: 300,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={`${item.image_url || '/assets/puppies.jpg'}`}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        alt={item.name}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </Box>
                  </ButtonBase>
                  <Box
                    overflow={'hidden'}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography variant='overline' noWrap align='center'>
                      {item.name}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        setDeleteDialog({ name: item.name, id: item.id })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        <Snackbar
          open={deletedItem}
          autoHideDuration={5000}
          onClose={deletedSnackbarClose}
        >
          <Alert onClose={deletedSnackbarClose} severity='success'>
            {`${deletedItem?.name} deleted successfully.`}
          </Alert>
        </Snackbar>
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle id='alert-dialog-title'>Delete this item?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`This action will delete ${deleteDialog?.name} forever! Do you wish to proceed?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={() => deleteItem(deleteDialog?.id)}
            >
              Confirm
            </Button>
            <Button variant='outlined' onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
}
