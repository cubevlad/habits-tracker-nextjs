import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { StyledTableHeader, StyledTableRow, StyledTableTh } from '@styles'

type Base = {
  shortWeekDayName: string
  id: string
  dayOfTheMonth: number
  isCurrent: boolean
}

type ColgroupProps<T extends Base> = {
  list: T[]
}

export const TableHeader = observer(<T extends Base>({ list }: ColgroupProps<T>) => {
  return (
    <StyledTableHeader>
      <StyledTableRow>
        <StyledTableTh align='center' className='sticky-col' colSpan={1} rowSpan={2}>
          <Typography variant='body1'>Привычки</Typography>
        </StyledTableTh>
        {list.map(({ id, shortWeekDayName, isCurrent }) => (
          <StyledTableTh key={id} $isCurrent={isCurrent}>
            <Typography variant='subtitle2'>{shortWeekDayName}</Typography>
          </StyledTableTh>
        ))}
        <StyledTableTh rowSpan={2}>
          <Typography variant='body1'>Цель</Typography>
        </StyledTableTh>
        <StyledTableTh rowSpan={2}>
          <Typography variant='body1'>Выполнено</Typography>
        </StyledTableTh>
      </StyledTableRow>
      <StyledTableRow>
        {list.map(({ id, dayOfTheMonth, isCurrent }) => (
          <StyledTableTh key={id} $isCurrent={isCurrent}>
            <Typography variant='subtitle2'>{dayOfTheMonth}</Typography>
          </StyledTableTh>
        ))}
      </StyledTableRow>
    </StyledTableHeader>
  )
})
