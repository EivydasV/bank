import { DocId } from '@app/shared';
import { TimestampModel } from '@app/shared/db';
import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

@Schema({
	timestamps: true,
})
export class CreditCard extends TimestampModel {
	@Prop({ type: String, required: true, unique: true })
	number: string;

	@Prop({ type: String, required: true })
	firstName: string;

	@Prop({ type: String, required: true })
	lastName: string;

	@Prop({ type: String, required: true })
	cvv: string;

	@Prop({ type: Date, required: true })
	@Transform(({ value }) => new Date(value), { toClassOnly: true })
	expirationDateAt: Date;

	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
	connectedToAccount: DocId;
}
