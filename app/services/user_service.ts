import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'
import { RolesEnum } from '../enums/roles_enum.js'
import district_service from './district_service.js'

class UserService {
  private async findUserById(id: number) {
    try {
      return await User.findOrFail(id)
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
  }
  public async createUser({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    if (payload.roleId === RolesEnum.SUPER_USER) {
      return await User.create(payload)
    }
    if (payload.roleId !== RolesEnum.SUPER_USER && !payload.districtId) {
      throw new BadRequestException('districtId is required')
    }
    await district_service.findDistrictById(payload.districtId!)
    return await User.create(payload)
  }

  public async getAllUsers() {
    return await User.all()
  }

  public async getUser({ params }: HttpContext) {
    return await this.findUserById(+params.id)
  }

  public async updateUser({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    try {
      await User.updateOrCreate({ id: +params.id }, payload)
    } catch (error) {
      throw new NotFoundException(`User with id ${params.id} not found`)
    }
  }

  public async deleteUser({ params }: HttpContext) {
    const user = await this.findUserById(+params.id)
    try {
      await user.delete()
    } catch (error) {
      throw new BadRequestException()
    }
  }
}

export default new UserService()
