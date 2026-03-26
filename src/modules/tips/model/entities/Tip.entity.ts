import Entity from '@common/store/entity/Entity';
import { Field } from '@common/store/entity/utils';
import { TipMeta } from '@/modules/tips/model/common/constants';

export class TipEntity extends Entity {
  @Field(TipMeta.id)
  public id: string;

  @Field(TipMeta.title)
  public title: string;

  @Field(TipMeta.text)
  public text: string;
}
