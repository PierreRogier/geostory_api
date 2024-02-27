import type { HttpContext } from '@adonisjs/core/http'
import district_service from '#services/district_service'

export default class DistrictsController {
  async index({}: HttpContext) {
    return await district_service.getAllDistricts()
  }

  async store(ctx: HttpContext) {
    return await district_service.createDistrict(ctx)
  }

  async show(ctx: HttpContext) {
    return await district_service.getDistrict(ctx)
  }

  async update(ctx: HttpContext) {
    return await district_service.updateDistrict(ctx)
  }

  async destroy(ctx: HttpContext) {
    return await district_service.deleteDistrict(ctx)
  }
}
