import { useEffect, useRef } from 'react'

import { useBoolean } from '@frknnice/feature-hooks'
import { ArrowBack } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { flushSync } from 'react-dom'

import { useFormCtx, useStore } from '@shared/context'
import { useMatchMedia } from '@shared/lib'
import type { TableViewItem } from '@shared/types'
import { Dialog } from '@shared/ui'

import { StyledCardWrapper, StyledChip } from './Card.styled'
import { ItemModalView } from './ui'

type CardProps = {
  item: TableViewItem
}

export const Card: React.FC<CardProps> = observer(({ item }) => {
  const {
    notesStore: { getNotesById },
    habitStore: { habits, flatHabitsWithFlatRecordsList },
  } = useStore()

  const { isLg, isMd, isSm } = useMatchMedia()

  const {
    NoteForm,
    NoteFormButton,
    isNoteFormOpen,
    handleNoteFormClose,
    isHabitsFormOpen,
    HabitsForm,
    HabitsFormButton,
    handleHabitsFormClose,
  } = useFormCtx()

  const { value: isDialogOpen, setFalse: closeDialog, setTrue: openDialog } = useBoolean()

  const areFormsClosed = !isNoteFormOpen && !isHabitsFormOpen

  const dayName = isLg || isMd ? item.shortWeekDayName : item.weekDayName
  const notesLength = (getNotesById(item.id) ?? []).length
  const habitsLength = habits.length

  const isCardAchieved = !habits.length
    ? false
    : habits.every((habit) => flatHabitsWithFlatRecordsList[habit.id][item.habitRecordId]?.done)

  const handleStepBack = () => {
    if (isNoteFormOpen) handleNoteFormClose()
    if (isHabitsFormOpen) handleHabitsFormClose()
  }

  const handleDialogClose = () => {
    flushSync(() => closeDialog())
    handleStepBack()
  }

  const handleItemClick = () => !item.disabled && openDialog()

  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleCardRef = (element: HTMLDivElement | null) => {
    if (element && item.isCurrent) {
      cardRef.current = element
    }
  }

  useEffect(() => {
    if (!cardRef.current || !item.isCurrent) return

    cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [item.isCurrent, isSm])

  if (isSm && item.disabled) {
    return null
  }

  return (
    <>
      <StyledCardWrapper
        ref={handleCardRef}
        $disabled={item.disabled}
        $isAchieved={isCardAchieved}
        $selected={item.isCurrent}
        onClick={handleItemClick}
      >
        {item.disabled ? null : (
          <Stack height='100%'>
            <Stack direction='row' flex='1 1 auto' justifyContent='space-between'>
              <Typography>{item.index}</Typography>
              <Typography>{dayName}</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' justifyContent='space-between'>
              {habitsLength ? <StyledChip $key='habit' color='primary' /> : <span />}
              {notesLength ? <StyledChip $key='note' /> : <span />}
            </Stack>
          </Stack>
        )}
      </StyledCardWrapper>
      <Dialog
        customDialogActions={
          <>
            <HabitsFormButton disabled={!areFormsClosed} />
            <NoteFormButton disabled={!areFormsClosed} />
          </>
        }
        customHeader={
          !areFormsClosed ? (
            <IconButton onClick={handleStepBack}>
              <ArrowBack fontSize='inherit' />
            </IconButton>
          ) : (
            <Stack direction='row' flex='1 1 auto' justifyContent='space-between'>
              <Typography variant='h6'>{item.id}</Typography>
              <Typography variant='h6'>{item.weekDayName}</Typography>
            </Stack>
          )
        }
        open={isDialogOpen}
        onCancel={handleDialogClose}
        onClose={handleDialogClose}
        onOk={handleDialogClose}
      >
        {areFormsClosed ? <ItemModalView item={item} /> : null}
        <HabitsForm />
        <NoteForm />
      </Dialog>
    </>
  )
})
