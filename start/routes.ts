/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')

const authRoutes = () =>
  router
    .group(() => {
      router.post('register', [SessionController, 'register'])
      router.post('login', [SessionController, 'login'])
      router.get('logout', [SessionController, 'logout']).use(middleware.auth({ guards: ['api'] }))
    })
    .prefix('auth')

const usersRoutes = () =>
  router
    .group(() => router.resource('users', UsersController).apiOnly().except(['store']))
    .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    authRoutes()
    usersRoutes()
  })
  .prefix('api/v1')
