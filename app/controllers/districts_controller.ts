import type { HttpContext } from '@adonisjs/core/http'
import district_service from '#services/district_service'
import DistrictPolicy from '#policies/district_policy'
import ForbiddenException from '#exceptions/forbidden_exception'

export default class DistrictsController {
  async index(ctx: HttpContext) {
    if (await ctx.bouncer.with(DistrictPolicy).denies('index')) {
      throw new ForbiddenException()
    }
    return await district_service.getAllDistricts()
  }

  async store(ctx: HttpContext) {
    if (await ctx.bouncer.with(DistrictPolicy).denies('create')) {
      throw new ForbiddenException()
    }
    return await district_service.createDistrict(ctx)
  }

  async show(ctx: HttpContext) {
    return await district_service.getDistrict(ctx)
  }

  async update(ctx: HttpContext) {
    if (await ctx.bouncer.with(DistrictPolicy).denies('edit')) {
      throw new ForbiddenException()
    }
    return await district_service.updateDistrict(ctx)
  }

  async destroy(ctx: HttpContext) {
    if (await ctx.bouncer.with(DistrictPolicy).denies('delete')) {
      throw new ForbiddenException()
    }
    return await district_service.deleteDistrict(ctx)
  }
}
