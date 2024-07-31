import { styled } from '@shared/lib'

const border = '1px solid #e0e0e0'

export const StyledTableWrapper = styled('div')`
  overflow: auto hidden;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`

export const StyledTable = styled('table')<{ $width?: number; $isSticky?: boolean }>`
  width: ${({ $width }) => ($width ? `calc(100% + ${$width}px)` : '100%')};
  min-width: 100%;
  table-layout: fixed;
  margin-bottom: 24px;

  & thead tr th.sticky-col {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.palette.background.default};

    ${({ $isSticky, theme }) => ($isSticky ? `box-shadow: ${theme.palette?.shadow?.x}` : undefined)}
  }

  & tbody tr td.sticky-col {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.palette.background.default};

    ${({ $isSticky, theme }) => ($isSticky ? `box-shadow: ${theme.palette?.shadow?.x}` : undefined)}
  }
`

export const StyledTableHeader = styled('thead')`
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
  border: ${border};
`

export const StyledTableBody = styled('tbody')`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`

export const StyledTableRow = styled('tr')`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
`

export const StyledTableTd = styled('td')<{ $color?: string; $isAchieved?: boolean }>`
  text-align: center;
  padding: 8px;
  border: ${border};
  display: table-cell;
  vertical-align: inherit;
  unicode-bidi: isolate;
  overflow-wrap: break-word;
  position: relative;
  background-color: ${({ $color, $isAchieved, theme }) =>
    $color || ($isAchieved ? theme.palette.primary.main : 'unset')};
`

export const StyledTableTh = styled('th')<{ $isCurrent?: boolean }>`
  text-align: center;
  padding: 14px 4px !important;
  border: ${border};
  background-color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.palette.primary.main : 'unset'};
`
