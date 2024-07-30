import EventEmitter from 'events'

import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

import { setAccessToken, tokenInterceptor } from './lib'
import { HabitsService, NotesService, UserService } from './model'

class Api extends EventEmitter {
  static commonHeaders = {
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
  }

  private readonly instance: AxiosInstance

  public userService: UserService

  public notesService: NotesService

  public habitsService: HabitsService

  constructor(config: CreateAxiosDefaults) {
    super()

    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers ?? Api.commonHeaders,
      timeout: config.timeout ?? 120000,
    })

    this.instance.interceptors.request.use((cfg) => tokenInterceptor(cfg))

    let isRefreshing = false
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (!isRefreshing) {
          isRefreshing = true
        }

        try {
          const response = await this.instance.get('/user/refresh')
          const newAccessToken = response.data.accessToken

          if (newAccessToken) {
            setAccessToken(newAccessToken)
            this.instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
            isRefreshing = false
            return await this.instance(originalRequest)
          }
        } catch (refreshError) {
          this.emit('apiError', refreshError)
          return Promise.reject(refreshError)
        }

        this.emit('apiError', error)
        return Promise.reject(error)
      }
    )

    this.userService = new UserService(this.instance)
    this.notesService = new NotesService(this.instance)
    this.habitsService = new HabitsService(this.instance)
  }
}

const api = new Api({ baseURL: '/api/v1/' })
export { api, Api }
