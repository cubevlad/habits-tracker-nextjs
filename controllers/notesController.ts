import type { PrismaClient } from '@prisma/client'
import type { NextApiRequest } from 'next'

import prisma from 'lib/prisma'

import { tokenController } from './tokenController'

class NotesController {
  private readonly _prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this._prisma = prismaClient
  }

  async getAll(req: NextApiRequest) {
    const token = tokenController.getUserData(req)

    if (!token) {
      throw new Error('Token not found')
    }

    const { userId } = token

    const user = await this._prisma.user.findFirst({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const { start_date, end_date } = req.query

    const gte = new Date(start_date as string)
    gte.setHours(0, 0, 0, 0)

    const lte = new Date(end_date as string)
    lte.setHours(23, 59, 59, 999)

    const notes = await this._prisma.note.findMany({
      where: {
        userId,
        createdAt: {
          gte,
          lte,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return notes
  }
}

export const notesController = new NotesController(prisma)
