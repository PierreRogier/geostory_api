import { BaseSchema } from '@adonisjs/lucid/schema'
import { RolesEnum } from '../../app/enums/roles_enum.js'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { id: RolesEnum.SUPER_USER, name: 'superuser' },
        { id: RolesEnum.ADMIN, name: 'admin' },
        { id: RolesEnum.VISITOR, name: 'visitor' },
        { id: RolesEnum.EDITOR, name: 'editor' },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}