import {
  Container,
  Typography,
  ButtonBase,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
} from '@mui/material';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import Image from 'next/image';
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
        .select(
          '*, sender:sender_id(*), receiver:receiver_id(*), item:item_id(*)'
        )
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('updated_at', { ascending: false });

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
      {session && user && (
        <List>
          {threads &&
            threads.map((thread) => {
              const otherPerson =
                thread.sender_id === user.id ? thread.receiver : thread.sender;
              return (
                <ListItem key={thread.id} alignItems='flex-start'>
                  <ListItemButton
                    component={Link}
                    href={`/messages/${thread.id}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={otherPerson.full_name}
                        src={`${supabase.storageUrl}/object/public/avatars/${otherPerson.avatar_url}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={thread.item.name}
                      secondary={
                        <>
                          <Typography>
                            Requestor: {thread.sender.full_name}
                          </Typography>
                          <Typography>
                            Owner: {thread.receiver.full_name}
                          </Typography>
                          <Typography>
                            {new Date(thread.updated_at).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemAvatar>
                      <Image
                        alt={thread.item.name}
                        src={thread.item.image_url || '/assets/puppies.jpg'}
                        width={80}
                        height={80}
                        style={{ borderRadius: 100, objectFit: 'cover' }}
                      />
                    </ListItemAvatar>
                    {/* <pre>{JSON.stringify(thread, null, 2)}</pre> */}
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      )}
    </Container>
  );
}
