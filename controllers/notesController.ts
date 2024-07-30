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

  async create(req: NextApiRequest) {
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

    const { content, createdAt: bodyDate } = req.body
    const createdAt = bodyDate ? new Date(bodyDate) : new Date(Date.now())

    return this._prisma.note.create({
      data: {
        content,
        userId,
        createdAt,
      },
    })
  }

  async update(req: NextApiRequest) {
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

    const { content, id: noteId } = req.body

    return this._prisma.note.update({
      where: {
        id: noteId,
        userId,
      },
      data: {
        content,
        modifiedAt: new Date(Date.now()),
      },
    })
  }

  async delete(req: NextApiRequest) {
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

    const noteId = req.query.id as string

    return this._prisma.note.delete({
      where: {
        id: noteId,
        userId,
      },
    })
  }
}

export const notesController = new NotesController(prisma)
