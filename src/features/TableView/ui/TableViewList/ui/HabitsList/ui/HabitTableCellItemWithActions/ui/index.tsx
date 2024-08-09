import { useStatusCallback } from '@frknnice/feature-hooks'
import { Button, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { LoadingButton } from '@shared/ui'
import { StyledFormWrapper, StyledTitle } from '@styles'

type DeleteModalContentProps = {
  id: string
  onClose: (e: React.MouseEvent) => void
}

export const DeleteModalContent: React.FC<DeleteModalContentProps> = observer(({ onClose, id }) => {
  const {
    habitStore: { deleteHabit },
  } = useStore()

  const { isPending, wrappedCallback: handleDelete } = useStatusCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      await deleteHabit(id)
      onClose(e)
    }
  )

  return (
    <StyledFormWrapper
      sx={{ maxWidth: '600px', height: '200px', alignItems: 'center', justifyContent: 'center' }}
    >
      <StyledTitle variant='h4'>Удалить привычку?</StyledTitle>
      <Stack direction='row' spacing={2}>
        <Button variant='outlined' onClick={onClose}>
          Нет
        </Button>
        <LoadingButton isLoading={isPending} variant='outlined' onClick={handleDelete}>
          Да
        </LoadingButton>
      </Stack>
    </StyledFormWrapper>
  )
})
