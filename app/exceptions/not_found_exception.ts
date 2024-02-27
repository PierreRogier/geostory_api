import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { ErrorsEnum } from '../enums/errors_enum.js'

export default class NotFoundException extends Exception {
  static status = 404
  static code = ErrorsEnum.NOT_FOUND
  static defaultMessage = 'Oups! something went wrong...'

  constructor(message?: string) {
    super(message || NotFoundException.defaultMessage)
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response
      .status(this.status)
      .send({ code: this.code, message: error.message, status: this.status })
  }
}
