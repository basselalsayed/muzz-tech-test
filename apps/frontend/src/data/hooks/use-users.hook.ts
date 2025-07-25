import { UserSchema } from '../schemas/user.schema';

import { useValidatedQuery } from './use-validated-query.hook';

export const useUsers = () =>
  useValidatedQuery('/api/user/all.json', UserSchema.array());
