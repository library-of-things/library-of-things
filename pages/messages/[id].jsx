import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Paper,
  Stack,
  IconButton,
  ButtonBase,
  Tooltip,
} from '@mui/material';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Thread() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient();
  const session = useSession();
  const [thread, setThread] = useState();
  const user = useUser();
  const [messages, setMessages] = useState();
  const [text, setText] = useState();
  const [payload, setPayload] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    async function loadMessages() {
      if (id) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('thread_id', id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        setMessages(data);
      }
    }
    if (user) {
      loadMessages(user.id);
    }
  }, [supabase, user, id, payload]);

  useEffect(() => {
    async function loadThread() {
      if (id) {
        const { data, error } = await supabase
          .from('threads')
          .select(
            '*, sender:sender_id(*), receiver:receiver_id(*), item:item_id(*)'
          )
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setThread(data);
      }
    }
    if (id) {
      loadThread();
    }

    supabase
      .channel(`message-channel-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${id}`,
        },
        (payload) => {
          setPayload(payload);
        }
      )
      .subscribe();
  }, [id]);

  async function sendMessage() {
    if (text) {
      const { error } = await supabase
        .from('messages')
        .insert({ context: text, thread_id: id, sender_id: user.id });
      if (error) {
        throw error;
      }

      // 2022-11-23 06:29:53.060575+00
      const { threadError } = await supabase
        .from('threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', id);
      if (threadError) {
        throw threadError;
      }
      setText('');
    }
    inputEl.current.focus();
  }

  if (thread && user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100vw',
            p: 1,
          }}
        >
          <Stack>
            <Typography align='center' gutterBottom>
              Owner
            </Typography>
            <Tooltip title={thread.receiver.full_name}>
              <IconButton
                component={Link}
                href={`/profiles/${thread.receiver_id}`}
                sx={{ mx: 8, width: '70px', height: '70px' }}
              >
                <Avatar
                  src={`${supabase.storageUrl}/object/public/avatars/${thread.receiver.avatar_url}`}
                  alt={thread.receiver.full_name}
                  sx={{ width: '60px', height: '60px' }}
                />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography my='auto' pt='25px'>
            {'---->'}
          </Typography>
          <ButtonBase component={Link} href={`/items/${thread.item_id}`}>
            <Image
              alt={thread.item.name}
              src={thread.item.image_url || '/assets/puppies.jpg'}
              height={60}
              width={60}
              style={{ objectFit: 'cover', margin: 8, borderRadius: 100 }}
            />
          </ButtonBase>
          <Typography my='auto' pt='25px'>
            {'---->'}
          </Typography>

          <Stack>
            <Typography align='center' gutterBottom>
              Requestor
            </Typography>
            <Tooltip title={thread.sender.full_name}>
              <IconButton
                component={Link}
                href={`/profiles/${thread.sender_id}`}
                sx={{ mx: 8, width: '70px', height: '70px' }}
              >
                <Avatar
                  src={`${supabase.storageUrl}/object/public/avatars/${thread.sender.avatar_url}`}
                  alt={thread.sender.full_name}
                  sx={{ width: '60px', height: '60px' }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
        {session && (
          <Stack
            spacing={2}
            p={2}
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              flexDirection: 'column-reverse',
            }}
          >
            {messages &&
              messages.map((message) => {
                return (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf:
                        message.sender_id !== user.id
                          ? 'flex-start'
                          : 'flex-end',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        minWidth: '150px',
                        maxWidth: '60vw',
                        wordWrap: 'break-word',
                        backgroundColor:
                          message.sender_id !== user.id
                            ? 'primary.main'
                            : 'secondary.main',
                        color:
                          message.sender_id !== user.id
                            ? 'primary.contrastText'
                            : 'secondary.contrastText',
                      }}
                    >
                      {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
                      <Typography variant='body2'>{message.context}</Typography>
                    </Paper>
                    <Typography
                      variant='overline'
                      paragraph
                      sx={{ width: '100%', m: 0 }}
                      align={message.sender_id !== user.id ? 'left' : 'right'}
                    >
                      {new Date(message.created_at).toLocaleTimeString()}
                    </Typography>
                  </Box>
                );
              })}
          </Stack>
        )}
        <Box p={2} sx={{ width: '100%', display: 'flex' }}>
          <TextField
            autoFocus
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ flexGrow: 1 }}
            inputRef={inputEl}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          ></TextField>
          <Button variant='contained' onClick={sendMessage}>
            Send
          </Button>
        </Box>
        {/* <pre>{JSON.stringify(thread, null, 2)}</pre> */}
      </Box>
    );
  }
}
