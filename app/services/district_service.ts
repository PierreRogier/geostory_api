import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import { HttpContext } from '@adonisjs/core/http'
import District from '#models/district'
import { createDistrictValidator, updateDistrictValidator } from '#validators/district'

class DistrictService {
  public async findDistrictById(id: number) {
    try {
      return await District.findOrFail(id)
    } catch (error) {
      throw new NotFoundException(`District with id ${id} not found`)
    }
  }
  public async createDistrict({ request }: HttpContext) {
    const payload = await request.validateUsing(createDistrictValidator)
    return await District.create(payload)
  }

  public async getAllDistricts() {
    return await District.all()
  }

  public async getDistrict({ params }: HttpContext) {
    return await this.findDistrictById(+params.id)
  }

  public async updateDistrict({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateDistrictValidator)
    try {
      await District.updateOrCreate({ id: +params.id }, payload)
    } catch (error) {
      throw new NotFoundException(`District with id ${params.id} not found`)
    }
  }

  public async deleteDistrict({ params }: HttpContext) {
    const district = await this.findDistrictById(+params.id)
    try {
      await district.delete()
    } catch (error) {
      throw new BadRequestException()
    }
  }
}

export default new DistrictService()
