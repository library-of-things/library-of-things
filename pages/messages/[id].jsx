import { Container, Typography, TextField, Button } from '@mui/material';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Thread() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const [messages, setMessages] = useState();
  const [text, setText] = useState();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      if (id) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('thread_id', id);

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
    supabase
      .channel(`message-channel-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          // filter: `thread_id=eq.${id}`,
        },
        (payload) => {
          setPayload(payload);
        }
      )
      .subscribe();
    console.log(payload);
  }, []);

  async function sendMessage() {
    if (text) {
      const { error } = await supabase
        .from('messages')
        .insert({ context: text, thread_id: id, sender_id: user.id });
      if (error) {
        throw error;
      }
    }
  }
  return (
    <Container>
      {session && (
        <Container>
          {messages &&
            messages.map((message) => {
              return (
                <Container key={message.id}>
                  <pre>{JSON.stringify(message, null, 2)}</pre>
                  {/* <pre>{JSON.stringify(payload, null, 2)}</pre> */}
                </Container>
              );
            })}
        </Container>
      )}

      <TextField
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></TextField>
      <Button onClick={sendMessage}>Send</Button>
    </Container>
  );
}
