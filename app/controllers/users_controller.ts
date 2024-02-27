import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'

export default class UsersController {
  async index({}: HttpContext) {
    return await UserService.getAllUsers()
  }

  async show(ctx: HttpContext) {
    return await UserService.getUser(ctx)
  }

  async update(ctx: HttpContext) {
    return await UserService.updateUser(ctx)
  }

  async destroy(ctx: HttpContext) {
    return await UserService.deleteUser(ctx)
  }
}
