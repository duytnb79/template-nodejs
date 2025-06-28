import { Response } from 'express';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Res,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Logger } from '../../../../config/logger';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../models/User';
import { UserService } from '../services/UserService';
import { parseNumber } from '../../../../utils/common';

@Service()
@JsonController('/v1/users')
export class UserController {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}

  @Get('/:id')
  async getUser(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<{ data: GetUserResponse | null }>> {
    const validId = parseNumber(id);
    if (!validId) {
      return response.status(400).json({ data: null });
    }

    try {
      const user = await this.userService.getUserById(id);
      return response.status(200).json({ data: user });
    } catch (error) {
      return response.status(404).json({ data: null });
    }
  }

  @Get('/')
  async getUsers(
    @Res() response: Response,
  ): Promise<Response<{ data: GetUserResponse[] }>> {
    try {
      const users = await this.userService.getUsers();
      return response.status(200).json({ data: users });
    } catch (error) {
      Logger.error(`getUsers error: ${error}`);
      return response.status(500).json({ data: [] });
    }
  }

  @Post('/')
  async createUser(
    @Body() user: CreateUserRequest,
    @Res() response: Response,
  ): Promise<Response<{ data: CreateUserResponse | null }>> {
    try {
      const userCreated = await this.userService.create(user);
      return response.status(201).json({ data: userCreated });
    } catch (error) {
      Logger.error(`createUser error: ${error}`);
      return response.status(400).json({ data: null });
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserRequest,
    @Res() response: Response,
  ): Promise<Response<{ data: UpdateUserResponse | null }>> {
    const validId = parseNumber(id);
    if (!validId) {
      return response.status(400).json({ data: null });
    }

    try {
      const userUpdated = await this.userService.update(id, user);
      return response.status(200).json({ data: userUpdated });
    } catch (error) {
      return response.status(404).json({ data: null });
    }
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const validId = parseNumber(id);
    if (!validId) {
      return response.status(400).json({ data: null });
    }

    try {
      await this.userService.delete(id);
      return response.status(204).json({});
    } catch (error) {
      return response.status(404).json({});
    }
  }
}
