import { Document } from 'mongoose';

export type NotDocument<T> = T extends Document ? never : T;
