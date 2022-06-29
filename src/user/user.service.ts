import { LoginDTO } from './../auth/login.dto';
import { Payload } from './../../types/payload';
import { RegisterDTO } from './register.dto';
import { User } from './../../types/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private usermodel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.usermodel.findOne({ email });
    if (user) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.usermodel(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.usermodel.findOne({ email });
  }
  async findByLogin(UserDto: LoginDTO) {
    const { email, password } = UserDto;
    const user = await this.usermodel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
