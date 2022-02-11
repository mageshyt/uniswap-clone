import Main from '../components/Main'
import Head from 'next/head'
import Header from '../components/Header'
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
      <h1>Transtion history</h1>
    </div>
  )
}
