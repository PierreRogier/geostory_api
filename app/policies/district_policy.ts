import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { RolesEnum } from '../enums/roles_enum.js'

export default class DistrictPolicy extends BasePolicy {
  index(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.SUPER_USER
  }

  create(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.SUPER_USER
  }

  edit(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.SUPER_USER
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === RolesEnum.SUPER_USER
  }
}
