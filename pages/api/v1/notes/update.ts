import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { notesController } from 'controllers/notesController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const updatedNote = await notesController.update(req)

    return res.status(200).json(updatedNote)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while updating note' })
  }
})

export default router.handler()
