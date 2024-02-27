import type { HttpContext } from '@adonisjs/core/http'
import user_service from '#services/user_service'

export default class UsersController {
  async index({}: HttpContext) {
    return await user_service.getAllUsers()
  }

  async show(ctx: HttpContext) {
    return await user_service.getUser(ctx)
  }

  async update(ctx: HttpContext) {
    return await user_service.updateUser(ctx)
  }

  async destroy(ctx: HttpContext) {
    return await user_service.deleteUser(ctx)
  }
}
