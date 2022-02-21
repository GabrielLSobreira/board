import styles from './styles.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import firebase from '../../services/firebaseConnection';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Image from 'next/image';
import rocket from '../../../public/images/rocket.svg';

interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  const handleSaveDonate = async () => {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image,
      })
      .then(() => setVip(true));
  };
  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online!</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja Apoiador" />
        {vip && (
          <div className={styles.vip}>
            <img src={user.image} alt="Foto de perfil do usuário" />
            <span>Parabéns você é um novo apoiador</span>
          </div>
        )}
        <h1>Seja um apoiador desse projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 1,00</span>
        </h3>
        <strong>Apareça na nossa home, tenha funcionadades exclusivas.</strong>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1',
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              handleSaveDonate();
            });
          }}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: { user },
  };
};
