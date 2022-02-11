import '../styles/globals.css'
import { TransactionProvider } from '../context/TransactionContext'
function MyApp({ Component, pageProps }) {
  return (
    <TransactionProvider>
      {/* now we cna have access to current account wallet */}
      <Component {...pageProps} />
    </TransactionProvider>
  )
}

export default MyApp
