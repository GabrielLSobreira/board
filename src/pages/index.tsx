import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/styles.module.scss';
import firebase from '../services/firebaseConnection';
import { useState } from 'react';
import Image from 'next/image';
import boardUser from '../../public/images/board-user.svg';

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
};

interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <div>
          <Image src={boardUser} alt="Ferramenta board" />
        </div>
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organiza-se...
          </h1>
          <p>
            <span>100% Gratuita</span> e online
          </p>
        </section>
        <div className={styles.donaters}>
          {donaters.length !== 0 && <h2>Apoiadores:</h2>}
          {donaters.map((item) => (
            <img key={item.id} src={item.image} alt="Avatar do usuario" />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const donaters = await firebase.firestore().collection('users').get();
  const data = JSON.stringify(
    donaters.docs.map((u) => {
      return {
        id: u.id,
        ...u.data(),
      };
    })
  );
  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // Atualiza a cada 60 minutos
  };
};
