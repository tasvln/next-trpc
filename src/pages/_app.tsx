import '@/styles/index.scss'
import { trpc } from '@/utils/trpc';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default trpc.withTRPC(App);

