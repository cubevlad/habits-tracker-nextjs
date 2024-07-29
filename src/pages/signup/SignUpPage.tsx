import { useCallback, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useForm, FormProvider } from 'react-hook-form'

import { api } from '@shared/api'
import { useAuthCtx } from '@shared/context'
import { StyledForm, StyledFormWrapper, StyledSubmitButton, StyledTitle } from '@styles'

import { signUpSchema, type SingUpForm } from './model'

import { DEFAULT_LOGIN_FORM_VALUES } from '../login/lib'

const SignUpPage: React.FC = () => {
  const { handleLogin } = useAuthCtx()
  const methods = useForm({
    defaultValues: { ...DEFAULT_LOGIN_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(signUpSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = methods

  const handleSubmitForm = useCallback(
    async (user: SingUpForm) => {
      try {
        const resp = await api.userService.user.signUp({ ...user })
        localStorage.setItem('local-token', resp.accessToken)
        handleLogin()
      } catch (error) {
        if (error instanceof AxiosError) {
          setError('name', { message: error.response?.data.message })
          setError('password', { message: error.response?.data.message })
        }
      }
    },
    [setError, handleLogin]
  )

  useEffect(() => {
    reset(DEFAULT_LOGIN_FORM_VALUES)
  }, [reset])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper>
        <StyledTitle variant='h4'> Регистрация </StyledTitle>
        <StyledForm spacing={4}>
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
          <TextField
            {...register('email')}
            fullWidth
            error={!isValid && !!errors.email?.message}
            helperText={isValid ? '' : errors.email?.message}
            label='Почта'
            variant='outlined'
          />
          <StyledSubmitButton
            disabled={!isValid}
            sx={{ mt: 2 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            Загеристрироваться
          </StyledSubmitButton>
        </StyledForm>
        <Link href='/login' style={{ color: 'unset' }}>
          Вернуться на страницу входа
        </Link>
      </StyledFormWrapper>
    </FormProvider>
  )
}

export default SignUpPage
