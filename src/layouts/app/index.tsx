import { ReactNode } from 'react'
import Head from 'next/head'

interface AppProps {
  header: string
  children: ReactNode
}

export default function App({ header, children }: AppProps) {
  return (
    <main className="h-screen">
      <Head>
        <title>{header} | By Unibalsas</title>
      </Head>
      <div className="flex flex-1 flex-col lg:px-64">{children}</div>
    </main>
  )
}
