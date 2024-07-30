import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { notesController } from 'controllers/notesController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const deletedNote = await notesController.delete(req)

    return res.status(200).json(deletedNote)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while deleting note' })
  }
})

export default router.handler()
