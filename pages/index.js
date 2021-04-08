import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sosek Malinau
        </h1>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div className={styles.grid}>
          <a href="/responden" className={styles.card}>
            <h3>Responden &rarr;</h3>
          </a>

          <a href="/observasi" className={styles.card}>
            <h3>Observasi &rarr;</h3>
          </a>

          <a
            href="/persepsi"
            className={styles.card}
          >
            <h3>Persepsi &rarr;</h3>
          </a>

          <a
            href="/persalinan"
            className={styles.card}
          >
            <h3>Persalinan dll &rarr;</h3>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
