import { useState, useEffect, useCallback, useMemo } from 'react'

import { useRouter } from 'next/router'

import { api } from '@shared/api'
import { AuthContextProvider } from '@shared/context'

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const isLoginOrSignIp = router.asPath === '/login' || router.asPath === '/signup'

  useEffect(() => {
    const token = localStorage.getItem('local-token')

    if (token) {
      setIsAuth(true)
      return
    }

    if (isLoginOrSignIp) {
      return
    }

    router.push('/login')
  }, [isLoginOrSignIp, router])

  useEffect(() => {
    if (isLoginOrSignIp) {
      return undefined
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem('local-token')

      if (!token) {
        setIsAuth(false)
        router.push('/login')
      }

      // every 5 seconds check token within localStorage
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [isLoginOrSignIp, router])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('local-token')
    setIsAuth(false)
    router.push('/login')
  }, [router])

  const handleLogin = useCallback(() => {
    setIsAuth(true)
    router.replace('/')
  }, [router])

  useEffect(() => {
    api.on('refreshError', handleLogout)

    return () => {
      api.off('refreshError', handleLogout)
    }
  }, [handleLogout])

  const contextValue = useMemo(
    () => ({
      isAuth,
      handleLogout,
      handleLogin,
    }),
    [isAuth, handleLogout, handleLogin]
  )

  return <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>
}

export default AuthProvider
