import { Delete, Edit } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useFormCtx, useStore } from '@shared/context'
import { formatRu, useMatchMedia } from '@shared/lib'
import type { Note } from '@shared/types'

import { ICON_SX, MOBILE_ICON_SX } from './lib'
import { StyledNoteListItem, StyledNoteListItemHeader } from './NoteListItem.styled'

type NoteListItemProps = {
  note: Note
  isCardsView?: boolean
}

export const NoteListItem: React.FC<NoteListItemProps> = observer(
  ({ note, isCardsView = false }) => {
    const createdAt = formatRu(new Date(note.createdAt), 'd MMMM yyyy', false)

    const {
      notesStore: { deleteNote },
    } = useStore()

    const { handleNoteFormOpen } = useFormCtx()

    const handleDeleteNote = async () => {
      await deleteNote(note.id, note.createdAt)
    }

    const handleClick = () => handleNoteFormOpen(note, createdAt)

    const gridProps = isCardsView
      ? { item: true, xs: 12 }
      : { item: true, lg: 4, md: 6, sm: 6, xl: 2, xs: 12 }

    const { isSm } = useMatchMedia()

    return (
      <Grid {...gridProps}>
        <StyledNoteListItem>
          <StyledNoteListItemHeader direction='row' spacing={1}>
            <Typography flex='1 1 auto' variant='body2'>
              {createdAt}
            </Typography>
            <IconButton size='small' onClick={handleClick}>
              <Edit fontSize='inherit' sx={isSm ? MOBILE_ICON_SX : ICON_SX} />
            </IconButton>
            <IconButton size='small' onClick={handleDeleteNote}>
              <Delete fontSize='small' sx={isSm ? MOBILE_ICON_SX : ICON_SX} />
            </IconButton>
          </StyledNoteListItemHeader>
          <Typography sx={{ wordBreak: 'break-word' }} variant='body1'>
            {note.content}
          </Typography>
        </StyledNoteListItem>
      </Grid>
    )
  }
)
