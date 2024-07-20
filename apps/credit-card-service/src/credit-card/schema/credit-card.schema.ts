import { CreditCard } from '@app/shared';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreditCardDocument = HydratedDocument<CreditCard>;

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
