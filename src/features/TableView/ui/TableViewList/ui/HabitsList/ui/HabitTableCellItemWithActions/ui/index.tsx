import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { useStatusCallback } from '@shared/lib'
import { LoadingButton } from '@shared/ui'
import { StyledFormWrapper, StyledTitle, StyledSubmitButton } from '@styles'

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
    <StyledFormWrapper borderRadius={8} maxWidth={520} p={4}>
      <StyledTitle variant='h4'>Удалить привычку?</StyledTitle>
      <Stack direction='row' spacing={2}>
        <StyledSubmitButton variant='contained' onClick={onClose}>
          Нет
        </StyledSubmitButton>
        <LoadingButton isLoading={isPending} variant='outlined' onClick={handleDelete}>
          Да
        </LoadingButton>
      </Stack>
    </StyledFormWrapper>
  )
})
