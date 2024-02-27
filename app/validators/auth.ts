import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(254),
    password: vine.string().trim().minLength(6).maxLength(40),
  })
)
