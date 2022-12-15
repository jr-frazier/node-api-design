// src/types/express/index.d.ts

import { User } from "@prisma/client";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
