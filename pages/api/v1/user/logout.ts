import type { NextApiRequest, NextApiResponse } from 'next'

import { userController } from 'controllers/userController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await userController.logout(req.body)
    return res.status(200)
  } catch (error) {
    return res.status(400).json({ message: 'Name or password is not provided' })
  }
}
