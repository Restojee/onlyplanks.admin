import { ContextMenu } from "@common/services/context-menu/ContextMenu";
import { ContextMenuDataAccess } from "@common/services/context-menu/ContextMenuDataAccess";

import { ContextMenuDataAccessInjectKey } from "@common/services/context-menu/constants";
import { inject, injectable } from "inversify";








@injectable()
export class ContextMenuService {
  constructor(
    @inject(ContextMenuDataAccessInjectKey)
    private readonly contextMenuDataAccess: ContextMenuDataAccess
  ) {}

  public registerContextMenu(contextMenu: ContextMenu) {
    this.contextMenuDataAccess.registerContextMenu(contextMenu);
  }

  public unregisterContextMenu(contextMenu: ContextMenu) {
    this.contextMenuDataAccess.unregisterContextMenu(contextMenu.getId());
  }
}
