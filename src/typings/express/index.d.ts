// node_modules > @types > passport > index.d.ts
// declare global {
//   namespace Express {
//       interface User {}

// because passport.js overrides the interface of Request
// and adds a property User whose type is an empty interface,
// so that's the reason, for the error because there is no property in User.

import { UserTokenCredentials } from '../../type/user.type';

declare global {
  namespace Express {
    interface User extends UserTokenCredentials {}
  }
}
