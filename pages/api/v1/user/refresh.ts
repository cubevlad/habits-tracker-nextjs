import type { NextApiRequest, NextApiResponse } from 'next'

import { userController } from 'controllers/userController'
import { removeCookie, setCookie } from 'lib/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken, refreshToken } = await userController.refresh(req)

    res.status(200)
    setCookie(res, 'jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.send({ accessToken, refreshToken })
  } catch (error) {
    removeCookie(res, 'jwt')
    res.redirect('/login')

    return res.status(403).json({ message: error.message })
  }
}
