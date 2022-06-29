/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    nome: string

    @Prop()
    idade: string

    @Prop()
    estado_civil: string
}

export const UserSchema = SchemaFactory.createForClass(User)