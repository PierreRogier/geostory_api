import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(254),
    password: vine.string().trim().minLength(6).maxLength(40),
    firstname: vine.string().trim().escape().maxLength(100),
    lastname: vine.string().trim().escape().maxLength(100),
    roleId: vine.number().optional(),
    districtId: vine.number().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(254).optional(),
    firstname: vine.string().trim().escape().maxLength(100).optional(),
    lastname: vine.string().trim().escape().maxLength(100).optional(),
  })
)
