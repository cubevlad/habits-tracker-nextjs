import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { userController } from 'controllers/userController'
import { setCookie } from 'lib/cookies'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(cors())

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json({ message: 'Name or password is not provided' })
  }

  try {
    const { accessToken, refreshToken } = await userController.singIn({ name, password })

    setCookie(res, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ accessToken, refreshToken })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router.handler()
