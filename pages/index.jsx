import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
return (
  <Box>
    <Paper elevation={1} sx={{ padding: 4, width: '100vw', mb: 4 }}>
      <Stack>
        <Stack>
          <Typography variant='h1'>Share.</Typography>
          <Typography variant='h1'>Borrow.</Typography>
          <Typography variant='h1'>Connect.</Typography>
        </Stack>
        <Button
          component={Link}
          href='/login'
          variant='contained'
          color='secondary'
          size='large'
          sx={{
            fontSize: 18,
            p: 1,
          }}
        >
          Join the community
        </Button>
      </Stack>
    </Paper>
  </Box>
);
}
