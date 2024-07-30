import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { notesController } from 'controllers/notesController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const createdNote = await notesController.create(req)

    return res.status(200).json(createdNote)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while creating note' })
  }
})

export default router.handler()
