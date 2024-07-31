import { observer } from 'mobx-react-lite'

import { useMatchMedia } from '@shared/lib'

type ColgroupProps<T> = {
  list: T[]
}

export const Colgroup = observer(
  <T extends { id: string; isCurrent: boolean }>({ list }: ColgroupProps<T>) => {
    const { isSm } = useMatchMedia()

    const habitsColWidth = isSm ? 3 : 5

    return (
      <colgroup>
        <col key='name' width={habitsColWidth} />
        {list.map(({ id }) => {
          return <col key={id} width='1px' />
        })}
        <col key='goal' width='2px' />
        <col key='done' width='3px' />
      </colgroup>
    )
  }
)
