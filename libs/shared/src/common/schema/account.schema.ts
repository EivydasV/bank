import { CurrencyEnum, DocId } from '@app/shared';
import { TimestampModel } from '@app/shared/db';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
	timestamps: true,
})
export class Account extends TimestampModel {
	@Prop({ type: String, required: true, unique: true })
	number: string;

	@Prop({ type: BigInt, required: true })
	balance: bigint;

	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
	belongsTo: DocId;

	@Prop({ type: String, enum: CurrencyEnum, required: true })
	currency: CurrencyEnum;
}
