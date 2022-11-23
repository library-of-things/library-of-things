/* eslint-disable @next/next/no-img-element */
// import { Container } from '@mui/material';
import ItemList from '../components/itemList/itemList';
import cardData from '../components/itemList/cardData';
import { useState } from 'react';
import { Grid, styled, Box, Modal } from '@mui/material';
import { AddBoxSharp } from '@mui/icons-material';
import ShowItemModal from '.././components/modal/modal';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useRouter } from 'next/router';

export default function CommunityPage() {
  const router = useRouter();
  if (router.isReady) {
    return (
      <>
        <ItemList initialQuery={router.query} />
      </>
    );
  }
}

{
  /* {cardData.map(product => {
						return (
						<Box
						padding= "1vw"
						item key={product.id} xs={12} sm={6} md={4}  xl={3}
						alignItems="center"
						justifyItems="center">
							<Product cardData={product}/>
						</Box>	 */
}
