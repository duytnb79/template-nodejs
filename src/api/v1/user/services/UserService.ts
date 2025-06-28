import { Service } from 'typedi';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  User,
} from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<GetUserResponse | null> {
    const user = await this.userRepository.findById(Number(id));
    if (!user) return null;
    return this.mapGetUserResponse(user);
  }

  async getUsers(): Promise<GetUserResponse[]> {
    const users = await this.userRepository.find();
    if (!users) return [];
    const userMapped = users.map((user) => this.mapGetUserResponse(user));
    return userMapped;
  }

  async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    //TODO: hash password
    const userCreated = await this.userRepository.add(data);
    return this.mapGetUserResponse(userCreated);
  }

  async update(
    id: string,
    data: UpdateUserRequest,
  ): Promise<UpdateUserResponse | null> {
    const _id = Number(id);
    const updateData: Partial<User> = { ...data, id: _id };
    const userUpdated = await this.userRepository.update(_id, updateData);
    if (!userUpdated) return null;
    return this.mapGetUserResponse(userUpdated);
  }

  delete(id: string) {
    return this.userRepository.delete(Number(id));
  }

  private mapGetUserResponse(user: User): GetUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
