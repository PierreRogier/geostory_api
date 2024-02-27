import { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { loginValidator } from '#validators/auth'
import User from '#models/user'
import BadRequestException from '#exceptions/bad_request_exception'

class SessionService {
  public async regiser(ctx: HttpContext) {
    return await UserService.createUser(ctx)
  }

  public async login(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(payload.email, payload.password)
      await ctx.auth.use('api').login(user)
      return user
    } catch (error) {
      throw new BadRequestException('Oups! Invalid credentials')
    }
  }

  public async logout(ctx: HttpContext) {
    return await ctx.auth.use('api').logout()
  }
}

export default new SessionService()
