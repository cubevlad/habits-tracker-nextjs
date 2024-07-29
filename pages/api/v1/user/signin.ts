import type { NextApiRequest, NextApiResponse } from 'next'

import { userController } from 'controllers/userController'
import { setCookie } from 'lib/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json({ message: 'Name or password is not provided' })
  }

  try {
    const { accessToken, refreshToken } = await userController.singIn({ name, password })

    setCookie(res, 'jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ accessToken, refreshToken })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
