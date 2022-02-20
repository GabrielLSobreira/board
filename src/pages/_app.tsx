import { AppProps } from 'next/app';
import '../styles/global.scss';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id':
    'AZDE64tk2p-Z2H3RJlEdSOQNcc-sGeV0KaoiEWUB6aAfHu0f-CTS6BUmNmMDnK9xbmXLhvv4sEJbOzLY',
  currency: 'BRL',
  intent: 'capture',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
