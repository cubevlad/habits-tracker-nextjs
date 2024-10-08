import { randomUUID } from 'crypto'

import type { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import type { NextApiRequest } from 'next'

import prisma from 'lib/prisma'

import { tokenController } from './tokenController'

class UserController {
  private readonly _prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this._prisma = prismaClient
  }

  public async singIn(user: { name: string; password: string }) {
    const { name, password } = user

    const userFromDb = await this._prisma.user.findFirst({
      where: { name },
    })

    if (!userFromDb) {
      throw new Error('User not found')
    }

    const isPasswordCorrect = await compare(password, userFromDb.password)

    if (!isPasswordCorrect) {
      throw new Error('Invalid password')
    }

    const { accessToken, refreshToken } = tokenController.generateTokens(name, userFromDb.id)
    await tokenController.saveToken(userFromDb.id, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async singUp(user: { name: string; password: string; email: string }) {
    const { name, password, email } = user

    const userFromDb = await this._prisma.user.findFirst({
      where: { name },
    })

    if (userFromDb) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 10)
    const userId = randomUUID()

    const newUser = await this._prisma.user.create({
      data: {
        email,
        createdAt: new Date(Date.now()),
        role: 'USER',
        id: userId,
        name,
        password: hashedPassword,
      },
    })

    const { accessToken, refreshToken } = tokenController.generateTokens(name, newUser.id)
    await tokenController.saveToken(newUser.id, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async logout(req: NextApiRequest) {
    const token = tokenController.getUserData(req)

    if (!token) {
      throw new Error('Token not found')
    }

    const { userId } = token

    await tokenController.removeToken(userId)
  }

  async refresh(req: NextApiRequest) {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    const isValid = verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'username')

    if (!isValid) {
      throw new Error('Invalid refresh token')
    }

    const user = tokenController.getUserData(req)

    if (!user) {
      throw new Error('User not found')
    }

    const { name, userId } = user

    const savedToken = await tokenController.findToken(userId)

    if (!savedToken) {
      throw new Error('Token not found')
    }

    const newTokens = tokenController.generateTokens(name, userId)

    await tokenController.saveToken(userId, refreshToken)

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    }
  }
}

export const userController = new UserController(prisma)
