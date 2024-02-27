import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ErrorsEnum } from '../enums/errors_enum.js'

export default class InternalServerErrorException extends Exception {
  static status = 500
  static code = ErrorsEnum.INTERNAL_SERVER_ERROR
  static defaultMessage = 'Oups! something went wrong...'

  constructor(message?: string) {
    super(message || InternalServerErrorException.defaultMessage)
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response
      .status(this.status)
      .send({ code: this.code, message: error.message, status: this.status })
  }
}
