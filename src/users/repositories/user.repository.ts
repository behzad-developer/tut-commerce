import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserInterface } from '../interface/user.interface';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { UserQueryDto } from '../dto/user-query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  createAndSave(payload?: Partial<UserInterface>) {
    const entity = new UserEntity(payload);
    if (payload.roleIds) {
      entity.roles = payload.roleIds.map(
        (roleIds) =>
          new RoleEntity({
            id: roleIds,
          }),
      );
    }
    if (payload.permissionIds) {
      entity.permissions = payload.permissionIds.map(
        (permissionId) =>
          new PermissionEntity({
            id: permissionId,
          }),
      );
    }
    return this.save(entity);
  }

  findAll(dto: UserQueryDto) {
    const {
      limit,
      search,
      skip,
      orderBy,
      orderDirection,
      regionId,
      status,
      typeId,
    } = dto;
    const query = this.createQueryBuilder('users');
    if (search) {
      query.where(
        'users.firstName ILIKE (:search) OR  users.lastName ILIKE (:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    return query
      .orderBy(orderBy)
      .orderBy(orderDirection)
      .addSelect(status)
      .take(typeId)
      .take(regionId)
      .take(limit)
      .skip((skip - 1) * limit)
      .getMany();
  }
  findOneByCredential(id: number) {
    return this.createQueryBuilder('u')
      .leftJoinAndSelect('users.role', 'role')
      .leftJoinAndSelect('users.permision', 'permission')
      .where('u.id =:id', { id })
      .getOne();
  }
  findIds(ids: number[]) {
    return this.createQueryBuilder('users')
      .where('users.id IN (:...ids)', { ids })
      .getMany();
  }
}
