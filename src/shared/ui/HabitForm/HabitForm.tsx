import { useLayoutEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useForm, FormProvider } from 'react-hook-form'

import { useStore } from '@shared/context'
import { useStatusCallback } from '@shared/lib'
import type { Habit } from '@shared/types'
import { StyledFormWrapper, StyledTitle, StyledForm } from '@styles'

import { DEFAULT_HABIT_FORM_VALUES, type HabitFormType, habitSchema } from './model'

import { LoadingButton } from '../LoadingButton'

type HabitFormProps = {
  habit?: Habit
  onClose?: () => void
}

export const HabitForm: React.FC<HabitFormProps> = observer(({ habit: habitProp, onClose }) => {
  const {
    habitStore: { createHabit, updateHabit },
    tableViewStore: { currentViewDate },
  } = useStore()

  const methods = useForm<HabitFormType>({
    defaultValues: DEFAULT_HABIT_FORM_VALUES,
    mode: 'all',
    resolver: yupResolver(habitSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const { isPending, wrappedCallback: handleSubmitForm } = useStatusCallback(
    async (habit: Pick<Habit, 'goal' | 'name'>) => {
      // eslint-disable-next-line no-unused-expressions
      habitProp
        ? await updateHabit({ ...habit, id: habitProp.id })
        : await createHabit({ ...habit, startedAt: currentViewDate })

      onClose?.()
      reset(DEFAULT_HABIT_FORM_VALUES)
    }
  )

  useLayoutEffect(() => {
    if (habitProp) {
      reset({
        name: habitProp.name,
        goal: habitProp.goal,
      })
    }
  }, [habitProp, reset])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper borderRadius={8} p={4}>
        <StyledTitle variant='h4'>
          {habitProp ? 'Редактирование привычки' : 'Создание привычки'}
        </StyledTitle>
        <StyledForm spacing={4}>
          <TextField
            {...register('name')}
            fullWidth
            multiline
            error={!isValid && !!errors.name?.message}
            helperText={errors.name?.message}
            label='Имя'
            maxRows={3}
            variant='outlined'
          />
          <TextField
            {...register('goal')}
            fullWidth
            error={!isValid && !!errors.goal?.message}
            helperText={errors.goal?.message}
            label='Цель'
            type='number'
            variant='outlined'
          />
          <LoadingButton
            disabled={!isValid}
            isLoading={isPending}
            sx={{ mt: 2 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            {habitProp ? 'Сохранить' : 'Создать'}
          </LoadingButton>
        </StyledForm>
      </StyledFormWrapper>
    </FormProvider>
  )
})
