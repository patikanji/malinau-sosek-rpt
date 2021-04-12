import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sosek Malinau</title>
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

          <a href="/pekerjaan" className={styles.card}>
            <h3>Jenis-jenis Pekerjaan &rarr;</h3>
          </a>

          <a href="/anggota" className={styles.card}>
            <h3>Anngota Keluarga &rarr;</h3>
          </a>

          <a href="/rumah" className={styles.card}>
            <h3>Rumah Tinggal &rarr;</h3>
          </a>

          <a href="/tanah" className={styles.card}>
            <h3>Aset Tanah &rarr;</h3>
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

          <a
            href="/faskes"
            className={styles.card}
          >
            <h3>Faskes dll &rarr;</h3>
          </a>

          <a
            href="/air-dll"
            className={styles.card}
          >
            <h3>Sumber air dll &rarr;</h3>
          </a>

          <a
            href="/belanja"
            className={styles.card}
          >
            <h3>Pendapatan &amp;Belanja &rarr;</h3>
          </a>

          <a href="/hasil-alam" className={styles.card} >
            <h3>Hasil Alam &rarr;</h3>
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
