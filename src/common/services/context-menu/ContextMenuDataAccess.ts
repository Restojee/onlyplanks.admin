import EntityManager from "@common/store/entity/EntityManager";
import { ContextMenu } from "@common/services/context-menu/ContextMenu";
import { injectable } from "inversify";

@injectable()
export class ContextMenuDataAccess {
  private readonly contextMenuEntityManager: EntityManager<ContextMenu>;

  constructor() {
    this.contextMenuEntityManager = new EntityManager<ContextMenu>({
      getRowId: row => row.id
    });
  }

  private getContextMenuEntityManager(): EntityManager<ContextMenu>{
    return this.contextMenuEntityManager;
  };

  public registerContextMenu(contextMenuEntity: ContextMenu) {
    this.getContextMenuEntityManager().create(contextMenuEntity);
  }

  public unregisterContextMenu(id: string) {
    this.getContextMenuEntityManager().remove(id);
  }
}
