import { useStatusCallback } from '@frknnice/feature-hooks'
import { Delete, Edit } from '@mui/icons-material'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { DeleteModalContent } from '@features/TableView/ui/TableViewList/ui/HabitsList/ui/HabitTableCellItemWithActions/ui'
import { useFormCtx, useStore } from '@shared/context'
import { useModal } from '@shared/lib'
import type { Habit, TableViewItem } from '@shared/types'

import { StyledHabitsCardListItem, StyledIconsWrapper } from './HabitsCardListItem.styled'

type HabitsCardListItemProps = {
  habit: Habit
  item: TableViewItem
}

export const HabitsCardListItem: React.FC<HabitsCardListItemProps> = observer(({ habit, item }) => {
  const {
    habitStore: { flatHabitsWithFlatRecordsList, updateHabitRecord },
  } = useStore()

  const { handleHabitsFormOpen } = useFormCtx()

  const currentRecord = flatHabitsWithFlatRecordsList[habit.id][item.habitRecordId]

  const { isPending, wrappedCallback: handleCheck } = useStatusCallback(async () => {
    await updateHabitRecord({ ...currentRecord, done: !currentRecord.done })
  })

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleHabitsFormOpen(habit)
    e.stopPropagation()
  }

  const { Modal, handleOpen, handleClose } = useModal()

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    handleOpen()
  }

  return (
    <Grid item xs={12}>
      <StyledHabitsCardListItem
        $achieved={currentRecord.done}
        $disabled={isPending}
        direction='row'
        onClick={handleCheck}
      >
        <Typography sx={{ wordBreak: 'break-word' }} variant='body1'>
          {habit.name}
        </Typography>
        {isPending ? (
          <CircularProgress
            color='primary'
            size={24}
            sx={{
              position: 'absolute',
              left: '50%',
            }}
          />
        ) : null}
        <StyledIconsWrapper direction='row'>
          <Box onClick={handleEdit}>
            <Edit />
          </Box>
          <Box onClick={handleOpenDeleteModal}>
            <Delete />
          </Box>
        </StyledIconsWrapper>
        <Modal>
          <DeleteModalContent id={habit.id} onClose={handleClose} />
        </Modal>
      </StyledHabitsCardListItem>
    </Grid>
  )
})
