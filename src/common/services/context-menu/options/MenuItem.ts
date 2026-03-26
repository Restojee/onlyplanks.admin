import Icon from "@common/services/context-menu/options/Icon";
import Disable from "@common/services/context-menu/options/Disable";

class MenuItem {
  id: number;
  label: string;
  icon?: Icon;
  disable?: Disable;
  children?: MenuItem[];
  action: Function;

  constructor(id: number, label: string, action: Function) {
    this.id = id;
    this.label = label;
    this.action = action;
  }

  withIcon(icon: Icon): MenuItem {
    this.icon = icon;
    return this;
  }

  withDisable(disable: Disable): MenuItem {
    this.disable = disable;
    return this;
  }

  withChildren(children: MenuItem[]) {
    this.children = children;
    return this;
  }
}

export default MenuItem;