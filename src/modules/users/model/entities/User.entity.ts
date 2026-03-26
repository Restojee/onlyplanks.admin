import Entity from '@common/store/entity/Entity';
import { Field } from '@common/store/entity/utils';
import { UserMeta } from '@/modules/users/model/common/constants';

export class UserEntity extends Entity {
  @Field(UserMeta.id)
  public id: number;

  @Field(UserMeta.username)
  public username: string;

  @Field(UserMeta.email)
  public email: string;

  @Field(UserMeta.avatar)
  public avatar?: string;
}
