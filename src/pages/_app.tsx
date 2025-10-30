import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import FirebaseErrorListener from '../components/FirebaseErrorListener';
export default function App({ Component, pageProps }: AppProps) { return (<Layout><FirebaseErrorListener /><Component {...pageProps} /></Layout>); }