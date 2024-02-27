import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ErrorsEnum } from '../enums/errors_enum.js'

export default class BadRequestException extends Exception {
  static status = 400
  static code = ErrorsEnum.BAD_REQUEST
  static defaultMessage = 'Oups! something went wrong...'

  constructor(message?: string) {
    super(message || BadRequestException.defaultMessage)
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response
      .status(this.status)
      .send({ code: this.code, message: error.message, status: this.status })
  }
}
