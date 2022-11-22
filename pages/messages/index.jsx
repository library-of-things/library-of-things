import { Container, Typography, ButtonBase } from '@mui/material';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MessagesInboxPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();

  const [threads, setThreads] = useState();

  useEffect(() => {
    async function loadThreads(userId) {
      const { data, error } = await supabase
        .from('threads')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

      if (error) {
        throw error;
      }

      setThreads(data);
    }
    if (user) {
      loadThreads(user.id);
    }
  }, [supabase, user]);

  return (
    <Container>
      {session && (
        <Container>
          {threads &&
            threads.map((thread) => {
              console.log(thread);
              return (
                <ButtonBase
                  key={thread.id}
                  component={Link}
                  href={`/messages/${thread.id}`}
                >
                  <Container>
                    <pre>{JSON.stringify(thread, null, 2)}</pre>
                  </Container>
                </ButtonBase>
              );
            })}
        </Container>
      )}
    </Container>
  );
}
