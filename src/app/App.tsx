import type { AppProps } from 'next/app'

import { AppLayout } from './AppLayout'
import AppProvider from './providers'

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  )
}

export default App
