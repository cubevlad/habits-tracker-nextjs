import { GridView, TableChart } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useViewModeCtx } from '@shared/context'
import { getCurrentViewMode } from '@shared/lib'

export const ViewModeToggler: React.FC = () => {
  const { handleChangeViewMode, mode } = useViewModeCtx()

  const { isCardsView } = getCurrentViewMode(mode)

  const handleChangeMode = () => {
    handleChangeViewMode({ type: isCardsView ? 'table' : 'cards' })
  }

  return (
    <IconButton disableRipple size='small' onClick={handleChangeMode}>
      {isCardsView ? <TableChart /> : <GridView />}
    </IconButton>
  )
}
