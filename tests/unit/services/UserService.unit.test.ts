import { UserService } from '../../../src/api/v1/user/services/UserService';
import { UserRepository } from '../../../src/api/v1/user/repositories/UserRepository';
import { MockContext, createMockContext } from '../../utils/prisma-mock';

let mockCtx: MockContext;

beforeEach(() => {
  mockCtx = createMockContext();
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository(mockCtx.prisma);
    userService = new UserService(userRepository);
  });

  it('should return user by ID', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'John@mail.com',
      password: 'password',
    };

    mockCtx.prisma.users.findUnique.mockResolvedValue(user);

    const foundUser = await userService.getUserById('1');

    expect(foundUser?.id).toEqual(user.id);
    expect(foundUser?.email).toEqual(user.email);
    expect(foundUser?.name).toEqual(user.name);
  });
});
