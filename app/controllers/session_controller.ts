import type { HttpContext } from '@adonisjs/core/http'
import session_service from '#services/session_service'

export default class SessionController {
  async register(ctx: HttpContext) {
    return await session_service.regiser(ctx)
  }

  async login(ctx: HttpContext) {
    const res = await session_service.login(ctx)
    ctx.response.ok(res)
  }

  async logout(ctx: HttpContext) {
    return await session_service.logout(ctx)
  }
}
