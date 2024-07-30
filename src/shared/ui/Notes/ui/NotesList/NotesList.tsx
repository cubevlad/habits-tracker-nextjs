import { Box, Grid, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import type { Note } from '@shared/types'

import { NoteListItem } from './ui/NoteListItem'

type NotesListProps = {
  notes: Note[]
}

export const NotesList: React.FC<NotesListProps> = observer(({ notes }) => {
  return (
    <Stack spacing={1}>
      <Typography variant='h6'>Заметки</Typography>
      {!notes.length ? <Typography variant='body1'>Нет заметок</Typography> : null}
      <Box sx={{ width: '100%' }}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
          {notes.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </Grid>
      </Box>
    </Stack>
  )
})
