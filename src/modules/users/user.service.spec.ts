import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

type MockRepo<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const userStub = (): UserEntity => ({
  id: 1,
  name: 'Parsa',
  email: 'parsavalizadeh@yahoo.com',
  created_at: new Date('2025-09-25T08:42:42.973Z') as any,
  updated_at: new Date('2025-09-25T08:42:42.973Z') as any,
} as unknown as UserEntity);

describe('UserService (unit)', () => {
  let service: UserService;
  let repo: MockRepo<UserEntity>;

  beforeEach(async () => {
    const repoMock: MockRepo<UserEntity> = {
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(UserEntity), useValue: repoMock },
      ],
    }).compile();

    service = module.get(UserService);
    repo = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('createUser: creates when email is free', async () => {
    const dto = { name: 'Parsa', email: 'parsavalizadeh@yahoo.com' };
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    (repo.create as jest.Mock).mockReturnValue(userStub());
    (repo.save as jest.Mock).mockResolvedValue(userStub());

    const result = await service.createUser(dto as any);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(result).toMatchObject({ name: dto.name, email: dto.email });
  });

  it('createUser: throws ConflictException when email exists', async () => {
    const dto = { name: 'Parsa', email: 'parsavalizadeh@yahoo.com' };
    (repo.findOne as jest.Mock).mockResolvedValue(userStub());

    await expect(service.createUser(dto as any)).rejects.toBeInstanceOf(ConflictException);
    expect(repo.create).not.toHaveBeenCalled();
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('getAllUsers: returns users + pagination', async () => {
    const dto: PaginationDto = { page: 2, limit: 5 } as any;
    const users = [userStub()];
    (repo.findAndCount as jest.Mock).mockResolvedValue([users, 13]);

    const { users: out, pagination } = await service.getAllUsers(dto);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      skip: 5,
      take: 5,
      order: { id: 'DESC' },
    });
    expect(out).toHaveLength(1);
    expect(pagination).toMatchObject({
      totalItems: 13,
      page: 2,
      limit: 5,
      totalPages: 3,
    });
  });

  it('getUserById: returns user', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(userStub());

    const u = await service.getUserById(1);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(u).toMatchObject({ id: 1 });
  });

  it('getUserById: throws NotFound when missing', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.getUserById(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('updateUser: updates when user exists', async () => {
    const existing = { ...userStub() };
    (repo.findOne as jest.Mock).mockResolvedValue(existing);
    (repo.save as jest.Mock).mockImplementation(async (v) => v);

    const updated = await service.updateUser(1, { name: 'P' } as any);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(updated.name).toBe('P');
    expect(repo.save).toHaveBeenCalled();
  });

  it('updateUser: throws NotFound when missing', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.updateUser(123, { name: 'X' } as any)).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.save).not.toHaveBeenCalled();
  });


  it('removeUser: deletes when user exists', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(userStub());
    (repo.delete as jest.Mock).mockResolvedValue({});

    await service.removeUser(1);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('removeUser: throws NotFound when missing', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.removeUser(1)).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
