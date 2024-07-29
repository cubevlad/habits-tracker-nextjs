import dynamic from 'next/dynamic'

import { composeProviders } from '@shared/lib'

import { MobxProvider } from './MobxProvider'
import { ThemeProvider } from './ThemeProvider'
import { ViewModeProvider } from './ViewModeProvider'

const authWithNoSsr = dynamic(() => import('./AuthProvider'), { ssr: false })

const AppProvider = composeProviders([authWithNoSsr, MobxProvider, ThemeProvider, ViewModeProvider])

export default AppProvider
