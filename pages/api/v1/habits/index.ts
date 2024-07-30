import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { habitsController } from 'controllers/habitsController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const habits = await habitsController.getAll(req)
    return res.status(200).send(habits)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while fetching habits' })
  }
})

export default router.handler()
