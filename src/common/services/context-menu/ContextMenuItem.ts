import { Callback } from "@common/types/common";
import { ContextMenu } from "@common/services/context-menu/ContextMenu";

class ContextMenuItem {

    protected divider: boolean;
    protected subMenu: ContextMenu;

    constructor(
      public id: string,
      public label: string,
      public action: Callback,
      public icon?: string,
      public disabled?: boolean,
    ) {}

    public setIcon(icon: string): void {
        this.icon = icon;
    }

    public setSubMenu(items: ContextMenu) {
        this.subMenu = items;
    }

    public setDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }

    public setDivider(divider: boolean): void {
        this.divider = divider;
    }

    public withDivider(): this {
        this.setDivider(true);
        return this;
    }

    public withIcon(icon: string): this {
        this.setIcon(icon);
        return this;
    }

    public withDisabled(disabled: boolean): this {
        this.setDisabled(disabled);
        return this;
    }

    public withSubMenu(menu: ContextMenu): this {
        this.setSubMenu(menu);
        return this;
    }
}

export default ContextMenuItem;
