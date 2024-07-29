import { randomUUID } from 'crypto'

import type { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcrypt'

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
}

export const userController = new UserController(prisma)
