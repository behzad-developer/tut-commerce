import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ManagerUserInterface } from '../interfaces/managerUser.interfaces';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { UserQueryDto } from '../dto/managerUser-query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  createAndSave(payload?: Partial<ManagerUserInterface>) {
    const entity = new UserEntity(payload);
    if (payload.roleId) {
      entity.roles = payload.roleId.map(
        (roleIds) =>
          new RoleEntity({
            id: roleIds,
          }),
      );
    }
    if (payload.permissionId) {
      entity.permissions = payload.permissionId.map(
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
      roleId,
      permissionId,
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
      .take(roleId)
      .take(permissionId)
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
