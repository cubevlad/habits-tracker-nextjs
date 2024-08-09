import { useStatusCallback } from '@frknnice/feature-hooks'
import { Done } from '@mui/icons-material'
import { Box, CircularProgress } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { HabitRecord } from '@shared/types'
import { StyledTableTd } from '@styles'

import { StyledCellItemIcon } from './HabitTableCellItem.styled'

type HabitTableCellItemProps = {
  record: HabitRecord | (HabitRecord & { disabled: boolean })
  completeRecordColor: string
}

export const HabitTableCellItem: React.FC<HabitTableCellItemProps> = observer(
  ({ record, completeRecordColor }) => {
    const {
      habitStore: { updateHabitRecord },
    } = useStore()

    const { isPending, wrappedCallback: handleCellClick } = useStatusCallback(async () => {
      if ('disabled' in record && record.disabled) {
        return
      }

      await updateHabitRecord({ ...record, done: !record.done })
    })

    const color = record.done ? completeRecordColor : undefined

    return (
      <StyledTableTd $color={color} onClick={handleCellClick}>
        {isPending ? (
          <Box
            sx={{
              top: '50%',
              left: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress color='primary' size={12} />
          </Box>
        ) : null}
        {record.done ? (
          <StyledCellItemIcon>
            <Done fontSize='inherit' />
          </StyledCellItemIcon>
        ) : null}
      </StyledTableTd>
    )
  }
)
