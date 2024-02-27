import vine from '@vinejs/vine'

export const createDistrictValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().maxLength(100),
    code: vine.number().positive().withoutDecimals(),
  })
)

export const updateDistrictValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().maxLength(100),
    code: vine.number().positive().withoutDecimals(),
  })
)
