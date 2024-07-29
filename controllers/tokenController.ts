import type { PrismaClient } from '@prisma/client'
import { sign, decode } from 'jsonwebtoken'

import prisma from '../lib/prisma'

class TokenController {
  private readonly ormClient: PrismaClient

  constructor(private readonly prismaClient: PrismaClient) {
    this.ormClient = prismaClient
  }

  /**
   * generate tokens pair - access and refresh
   * @param username
   */
  public generateTokens = (username: string, userId: string) => {
    const accessToken = sign({ name: username, userId }, process.env.JWT_SECRET || 'username', {
      expiresIn: '1800s',
    })
    const refreshToken = sign({ name: username }, process.env.JWT_REFRESH_SECRET || 'username', {
      expiresIn: '60d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  // @TODO: add managing tokens from different devices
  /**
   * save refresh token into DB
   * @param userId - user id
   * @param refreshToken - generated refresh token
   */
  public saveToken = async (userId: string, refreshToken: string) => {
    // if token with userId exist we have to update this
    const foundedToken = await this.ormClient.token.findFirst({
      where: {
        userId,
      },
    })
    if (foundedToken) {
      const newToken = await this.updateToken(userId, refreshToken)
      return newToken
    }
    // save token into db
    const { token } = await this.ormClient.token.create({
      data: {
        userId,
        token: refreshToken,
      },
    })
    return token
  }

  /**
   * update token into DB
   * @param userId - user is
   * @param token - new token to save
   */
  private updateToken = async (userId: string, token: string) => {
    const { token: newToken } = await this.ormClient.token.update({
      where: {
        userId,
      },
      data: {
        token,
      },
    })
    return newToken
  }

  /**
   * Remove tokens
   */
  public removeToken = async (userId: string) => {
    await this.ormClient.token.delete({
      where: {
        userId,
      },
    })
  }

  /**
   * Get data from token
   */
  public getUserData = (req) => {
    const authHeader = req.headers?.authorization
    const token = authHeader?.split(' ')[1]
    if (token) {
      const obj = decode(token)
      return obj
    }
    return undefined
  }

  /**
   * Find existing token
   */
  public findToken = async (userId: string) => {
    const is_found = await this.ormClient.token.findFirst({
      where: {
        userId,
      },
    })
    return !!is_found
  }
}

export const tokenController = new TokenController(prisma)
