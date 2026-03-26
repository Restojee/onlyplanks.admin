import Entity from '@common/store/entity/Entity';
import { Field } from '@common/store/entity/utils';
import { TagMeta } from '@/modules/tags/model/common/constants';

export class TagEntity extends Entity {
  @Field(TagMeta.id)
  public id: string;

  @Field(TagMeta.name)
  public name: string;

  @Field(TagMeta.description)
  public description: string;
}
