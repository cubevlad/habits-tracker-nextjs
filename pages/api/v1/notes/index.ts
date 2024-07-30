import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { notesController } from 'controllers/notesController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notes = await notesController.getAll(req)
    return res.status(200).send(notes)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while fetching notes' })
  }
})

export default router.handler()
