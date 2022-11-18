import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { prisma } from "../lib/prisma";

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const users = await prisma.user.findMany({});
  return { props: { users } };
}
