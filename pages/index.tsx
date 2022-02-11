import Main from '../components/Main'
import Head from 'next/head'
import Header from '../components/Header'
import TransactionHistory from '../components/TransactionHistory'
const styles = {
  container:
    'h-screen w-screen max-h-screen h-min-screen bg-gradient-to-b from-[#2d242f] to-[#171418] text-white select-none flex flex-col justify-between',
}
export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />
      {/* main */}

        <Main />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  )
}
