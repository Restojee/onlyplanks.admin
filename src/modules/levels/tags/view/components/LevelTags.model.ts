import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { AsyncAction, Computed, OnMounted, State, Action } from '@common/hocs/withView/decorators';
import { LevelTagsDataAccess } from '../../model/services/LevelTagsDataAccess';
import { LevelTagsActions } from '../../model/services/LevelTagsActions';
import { LevelTagsDataAccessInjectKey, LevelTagsActionsInjectKey } from '../../model/common/constants';
import { getLevelTagsColumns } from '../utils/columns';
import { getLevelTagsToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { TagData } from '@/modules/levels/common/types';
import { LevelTagsProps } from './LevelTags';

class LevelTagsModel extends ViewModel<LevelTagsProps> {

  @State()
  public title = 'Управление тегами уровня';

  @State()
  public selectedRows: TreeNode<TagData>[] = [];

  constructor(
    @inject(LevelTagsDataAccessInjectKey) public dataAccess: LevelTagsDataAccess,
    @inject(LevelTagsActionsInjectKey) public actions: LevelTagsActions
  ) {
    super();
  }

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { levelId } = this.props;
    if (!levelId) return;

    await Promise.all([
      this.actions.loadAllTags(),
      this.actions.loadLevelTags(levelId)
    ]);
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns() {
    return getLevelTagsColumns((tagId: number) => this.dataAccess.isTagAttached(tagId));
  }

  @Computed()
  public get getToolbarItems() {
    return getLevelTagsToolbarItems({
      selectedRows: this.selectedRows,
      onAttach: this.handleAttach.bind(this),
      onDetach: this.handleDetach.bind(this),
      onClose: this.handleClose.bind(this),
    });
  }

  @Computed()
  public get tagCollection() {
    const tags = this.dataAccess.sortedTags as any[];
    const map = new Map<number, TreeNode<TagData>>();

    tags.forEach((tag: any) => {
      map.set(tag.id, {
        id: tag.id,
        data: tag,
        parentId: tag.parentTagId,
        children: [],
      });
    });

    map.forEach(node => {
      const parentId = (node.data as any).parentTagId;
      if (parentId && map.has(parentId)) {
        map.get(parentId)!.children!.push(node);
      }
    });

    const roots: TreeNode<TagData>[] = [];
    map.forEach(node => {
      const parentId = (node.data as any).parentTagId;
      if (!parentId || !map.has(parentId)) {
        roots.push(node);
      }
    });

    return roots;
  }

  public entityToTreeNode = (tag: TagData): TreeNode<TagData> => {
    return tag as any;
  }

  @Action()
  public handleRowSelect = (rows: TreeNode<TagData>[]): void => {
    this.selectedRows = rows;
  }

  @AsyncAction()
  public async handleAttach(tags: TreeNode<TagData>[]): Promise<void> {
    const tagIds = tags.map(t => t.data.id);
    await this.actions.attachTags(tagIds);
  }

  @AsyncAction()
  public async handleDetach(tags: TreeNode<TagData>[]): Promise<void> {
    const tagIds = tags.map(t => t.data.id);
    await this.actions.detachTags(tagIds);
  }

  public handleClose = (): void => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default LevelTagsModel;
