import { BaseSchema } from '@adonisjs/lucid/schema'
import { RolesEnum } from '../../app/enums/roles_enum.js'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 200).notNullable()
      table.string('firstname', 100).notNullable()
      table.string('lastname', 100).notNullable()

      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .defaultTo(RolesEnum.VISITOR)

      table
        .integer('district_id')
        .unsigned()
        .references('id')
        .inTable('districts')
        .onDelete('CASCADE')
        .nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: 1,
        email: 'admin@gmail.com',
        password: await hash.make('motdepasse'),
        firstname: 'pierre',
        lastname: 'rogier',
        role_id: RolesEnum.SUPER_USER,
        created_at: new Date(),
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
