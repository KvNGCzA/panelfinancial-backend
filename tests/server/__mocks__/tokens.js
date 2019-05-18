import helpers from '../../../server/helpers';

const { createToken } = helpers;

export const superAdminToken = createToken('122b0f86-8e78-5cc8-a28f-8e9f7811c457');
export const adminToken = createToken('133b0f86-8e78-3bb4-a28f-8e9f7811c457');
export const employeeToken = createToken('144b0f86-8e78-3bb4-a28f-8e9f7811c489', '10m');
