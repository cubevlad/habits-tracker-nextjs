import type { PrismaClient } from '@prisma/client'
import type { NextApiRequest } from 'next'

import prisma from 'lib/prisma'
import { createHabitRecords, formatDate, getFirstAndLastDayOfMonth } from 'utils'

import { tokenController } from './tokenController'

class HabitsController {
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

    if (!start_date || !end_date) {
      throw new Error('Start date and end date are required')
    }

    const gte = new Date(start_date as string)
    gte.setHours(0, 0, 0, 0)

    const lte = new Date(end_date as string)
    lte.setHours(23, 59, 59, 999)

    const habits = await this._prisma.habit.findMany({
      where: {
        userId,
        startedAt: {
          lte,
        },
      },
      include: {
        records: {
          where: {
            date: {
              gte,
              lte,
            },
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
      orderBy: {
        startedAt: 'asc',
      },
    })

    return habits.map((habit) => ({
      ...habit,
      records: habit.records.map((record) => ({
        ...record,
        date: formatDate(record.date),
      })),
      achieved: habit.records.reduce((acc, record) => (record.done ? acc + 1 : acc), 0),
    }))
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

    const { goal, name, startedAt: bodyStartedAt } = req.body
    const startedAt = bodyStartedAt ? new Date(bodyStartedAt) : new Date(Date.now())
    const records = createHabitRecords(startedAt)

    const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(startedAt)

    const gte = new Date(firstDayOfMonth)
    gte.setHours(0, 0, 0, 0)

    const lte = new Date(lastDayOfMonth)
    lte.setHours(23, 59, 59, 999)

    const habit = await this._prisma.habit.create({
      data: {
        goal: Number(goal),
        name,
        userId: user.id,
        startedAt,
        records: {
          createMany: {
            data: records,
          },
        },
      },
      include: {
        records: {
          where: {
            date: {
              gte,
              lte,
            },
          },
        },
      },
    })

    return {
      ...habit,
      records: habit.records.map((record) => ({ ...record, date: formatDate(record.date) })),
    }
  }

  async updateHabit(req: NextApiRequest) {
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

    const { id } = req.query

    if (!id) {
      throw new Error('Id is required')
    }

    const { goal, name } = req.body

    if (!goal || !name) {
      throw new Error('Goal and name are required')
    }

    const startedAt = new Date(Date.now())
    const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(startedAt)

    const gte = new Date(firstDayOfMonth)
    gte.setHours(0, 0, 0, 0)

    const lte = new Date(lastDayOfMonth)
    lte.setHours(23, 59, 59, 999)

    return this._prisma.habit.update({
      where: {
        id: id as string,
        userId,
      },
      data: {
        goal: Number(goal),
        name,
      },
      include: {
        records: {
          where: {
            date: {
              gte,
              lte,
            },
          },
        },
      },
    })
  }

  async updateHabitRecords(req: NextApiRequest) {
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

    const { id: habitId } = req.query

    if (!habitId) {
      throw new Error('Habit id is required')
    }

    const { id, done } = req.body

    if (typeof id === 'undefined' || typeof done === 'undefined') {
      throw new Error('Record id and done values are required')
    }

    const updatedRecord = await this._prisma.record.update({
      where: {
        id,
        habitId: habitId as string,
      },
      data: {
        done,
      },
    })

    return { ...updatedRecord, date: formatDate(updatedRecord.date) }
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

    const { id: habitId } = req.query

    if (!habitId) {
      throw new Error('Habit id is required')
    }

    const habit = await this._prisma.habit.findFirst({
      where: {
        userId: user.id,
        id: habitId as string,
      },
    })

    if (!habit) {
      throw new Error('Habit not found')
    }

    return this._prisma.habit.delete({
      where: {
        id: habitId as string,
        userId: user.id,
      },
    })
  }
}

export const habitsController = new HabitsController(prisma)
