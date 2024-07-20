import { TimestampModel } from '@app/shared/db';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
	timestamps: true,
})
export class User extends TimestampModel {
	@Prop({ required: true, maxlength: 255, unique: true })
	email: string;

	@Prop({ required: true, maxlength: 255 })
	password: string;

	@Prop({ required: true, maxlength: 255 })
	firstName: string;

	@Prop({ required: true, maxlength: 255 })
	lastName: string;

	@Prop({ required: false, maxlength: 255 })
	forgotPasswordToken?: string;

	@Prop({ required: false })
	forgotPasswordTokenExpiresAt?: Date;

	// @Prop({ required: false, type: Types.ObjectId, ref: 'Role' })
	// @Field(() => Role, { nullable: true })
	// role?: DocId;
}
