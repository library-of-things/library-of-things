import DrawerAppBar from '../components/navbar';
import ImgMediaCard from '../components/itemList/itemList';
import { Avatar, Box, Container, Stack, Grid, Paper, Typography } from '@mui/material';
import { Grid4x4Outlined } from '@mui/icons-material';



export default function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center' },
      }}
    >

      <Container direction='col' spacing={1}>
        <Stack >
          <Stack direction='row' spacing={4}>
            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Items lent
              </Typography>
            </Paper>

            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Borrowed
              </Typography>
            </Paper>

            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Trust Score
              </Typography>
            </Paper>
          </Stack>

          <Stack direction='row' spacing={4}>
            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Items lent
              </Typography>
            </Paper>

            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Borrowed
              </Typography>
            </Paper>

            <Paper
              elevation={8}
              sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'min-content',
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
            >
              <Typography variant='h3' sx={{ flexGrow: 1 }}>
                Hello World
              </Typography>
              <Typography variant='overline' noWrap>
                Trust Score
              </Typography>
            </Paper>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4}>

          <Box>
            <p>I rarely move, but was moving locally and just needed a trailer hitch and hand truck to avoid paying a moving company.</p>

            <p>You can either buy the items and take up more valuable storage space for something you'll only use once in your life, go through the hassle and inflated cost of renting, if available</p>

            <p>
              I tried everyone in my network, but no one had one.
              "Library of Things" made my network my entire city.
            </p>
            </Box>
            </Stack>
            <Stack direction='row' spacing={4}>
          <Box>
          <p>
            Browse your neighbors' items.
          </p>

          <p>
            Collaborate on projects.
          </p>

          <p>
            Share interests.

          </p>

          <p>
            Geek out.

          </p>
        </Box>
        </Stack>
        <Stack direction='row' spacing={4}>
        <Box>
          <p>
            Scroll through the items your neighbors have laying around their garage and are willing to lend.

          </p>
          <p>
            Post your own items to help someone in need.
          </p>
          <p>
            "Library of Things" promotes community and reduces cost for you and your neighbors
          </p>
          <p>You might even make  a new friend.</p>
        </Box>
        </Stack>
        <Stack direction='row' spacing={4}>
        <Box>
          <ul>
            <li>
              Save money.
            </li>
            <li>
              Save the planet.
            </li>
            <li>
              Save time.
            </li>
            <li>
              Save space.
            </li>
            <li>
              Save your sanity.
            </li>
            <li>
              Save your back.
            </li>
            <li>
              Save your marriage.
            </li>
            <li>
              Save your life.
            </li>
            <li>
              Save your soul.
            </li>
            <li>
              Save your mind.
            </li>
            <li>
              Save your heart.
            </li>
          </ul>
        </Box>
      </Stack>
    </Container>

      {/* <h2>Landing!!!</h2>
      <div>Stuff goes here</div> */}
    </Container >


  );
}
