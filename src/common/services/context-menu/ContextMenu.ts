import { ReactNode } from "react";
import ContextMenuItem from "@common/services/context-menu/ContextMenuItem";

export class ContextMenu {
  private _items: ContextMenuItem[];

  constructor(public id: string) {}

  public getId(): string {
    return this.id;
  }

  public render(): ReactNode {
      throw new Error("Method not implemented.");
  }

  public getItems(): ContextMenuItem[] {
    return this._items;
  }

  public getLastItem(): ContextMenuItem {
    const items = this.getItems();
    return items[items.length - 1];
  }

  public setItems(items: ContextMenuItem[]): this {
    this._items = items;
    return this;
  }

  public addItem(item: ContextMenuItem): this {
    this.setItems(this.getItems().concat(item));
    return this;
  }

  public addDivider(): this {
    this.getLastItem()?.withDivider();
    return this;
  }

  public withSubMenu(menu: ContextMenu): this {
    this.getLastItem()?.withSubMenu(menu);
    return this;
  }
}
