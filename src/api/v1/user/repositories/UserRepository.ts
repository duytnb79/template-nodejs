import { Service } from 'typedi';
import { PrismaService } from '../../../../config/prisma';
import { users } from '@prisma/client';

@Service()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { id: id } });
  }

  find(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  add(user: Omit<users, 'id'>): Promise<users> {
    return this.prisma.users.create({ data: user });
  }

  update(id: number, data: Partial<users>): Promise<users> {
    return this.prisma.users.update({ where: { id }, data });
  }

  delete(id: number): Promise<users> {
    return this.prisma.users.delete({ where: { id } });
  }
}
