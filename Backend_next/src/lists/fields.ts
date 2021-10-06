import { checkbox } from '@keystone-next/keystone/fields';

export const permissionFields = {
  canManageCourses: checkbox({
    defaultValue: false,
    label: 'User can Update and delete any Course',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageSubscriptions: checkbox({
    defaultValue: false,
    label: 'User can see and manage Subscriptions',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];