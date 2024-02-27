import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ErrorsEnum } from '../enums/errors_enum.js'

export default class ForbiddenException extends Exception {
  static status = 403
  static code = ErrorsEnum.FORBIDDEN
  static defaultMessage = 'Oups! The door is closed...'

  constructor(message?: string) {
    super(message || ForbiddenException.defaultMessage)
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response
      .status(this.status)
      .send({ code: this.code, message: error.message, status: this.status })
  }
}
