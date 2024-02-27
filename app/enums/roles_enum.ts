export enum RolesEnum {
  // Can do everything
  SUPER_USER = 1,

  // Can do everything in district except delete district
  ADMIN = 2,

  // Can do everything with stories
  EDITOR = 3,

  // Can only view stories
  VISITOR = 4,
}
