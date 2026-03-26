import { TreeEntity } from '@common/entities/TreeEntity';
import { LevelData } from '@/modules/levels/common/types';

export class LevelEntity extends TreeEntity<LevelData> {
  constructor(id: string, data: LevelData, children: LevelEntity[] = []) {
    super(id, data, children);
  }

  get name(): string {
    return this.data.name;
  }

  get description(): string {
    return this.data.description;
  }

  clone(): LevelEntity {
    const clonedChildren = this.children.map(child => (child as LevelEntity).clone());
    return new LevelEntity(this.id, { ...this.data }, clonedChildren);
  }
}
