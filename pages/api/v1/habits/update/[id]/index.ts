import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { habitsController } from 'controllers/habitsController'
import { verifyToken } from 'lib/verifyToken'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())
router.use(verifyToken)

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const habit = await habitsController.updateHabit(req)
    return res.status(200).send(habit)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while updating habit' })
  }
})

export default router.handler()
