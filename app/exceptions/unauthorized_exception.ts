import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ErrorsEnum } from '../enums/errors_enum.js'

export default class UnauthorizedException extends Exception {
  static status = 401
  static code = ErrorsEnum.UNAUTHORIZED
  static defaultMessage = 'Oups! The door is closed...'

  constructor(message?: string) {
    super(message || UnauthorizedException.defaultMessage)
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response
      .status(this.status)
      .send({ code: this.code, message: error.message, status: this.status })
  }
}
