import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'

import { api } from '@shared/api'
import { useAuthCtx } from '@shared/context'
import { useStatusCallback } from '@shared/lib'
import { LoadingButton } from '@shared/ui'
import { StyledForm, StyledFormWrapper, StyledTitle } from '@styles'

import { DEFAULT_LOGIN_FORM_VALUES, type LoginForm } from './lib'
import { loginSchema } from './model'

const LoginPage: React.FC = () => {
  const { handleLogin } = useAuthCtx()
  const methods = useForm({
    defaultValues: { ...DEFAULT_LOGIN_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = methods

  const { isPending, wrappedCallback: handleSubmitForm } = useStatusCallback(
    async (user: LoginForm) => {
      try {
        const resp = await api.userService.user.singIn({ ...user })
        localStorage.setItem('local-token', resp.accessToken)
        handleLogin()
      } catch (error) {
        if (error instanceof AxiosError) {
          setError('name', { message: error.response?.data.message })
          setError('password', { message: error.response?.data.message })
        }
      }
    }
  )

  useEffect(() => {
    reset(DEFAULT_LOGIN_FORM_VALUES)
  }, [reset])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isValid) {
        handleSubmitForm(methods.getValues())
      }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [handleSubmitForm, isValid, methods])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper sx={{ alignItems: 'center', gap: 2 }}>
        <StyledTitle variant='h4'> Добро пожаловать </StyledTitle>
        <StyledForm mb={4} spacing={4}>
          <TextField
            {...register('name')}
            fullWidth
            error={!isValid && !!errors.name?.message}
            helperText={isValid ? '' : errors.name?.message}
            label='Имя'
            variant='outlined'
          />
          <TextField
            {...register('password')}
            fullWidth
            error={!isValid && !!errors.password?.message}
            helperText={isValid ? '' : errors.password?.message}
            label='Пароль'
            variant='outlined'
          />
          <LoadingButton
            disabled={!isValid}
            isLoading={isPending}
            sx={{ mt: 2, width: '100%', maxWidth: 200 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            Войти
          </LoadingButton>
        </StyledForm>
        <Stack direction='row' spacing={2}>
          <Typography variant='body1'>Нет аккаунта?</Typography>
          <Link href='/signup' style={{ color: 'unset' }}>
            <Typography variant='body1'>Зарегистрируйтесь</Typography>
          </Link>
        </Stack>
      </StyledFormWrapper>
    </FormProvider>
  )
}

export default LoginPage
