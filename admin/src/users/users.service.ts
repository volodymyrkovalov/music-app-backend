import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findOne(id: ObjectId) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    // TODO
    return addRoleDto.userId;
  }

  async remove(id: ObjectId) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user._id;
  }
}
