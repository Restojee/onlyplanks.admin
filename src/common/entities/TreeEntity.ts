export abstract class TreeEntity<TData = any> {
  public id: string;
  public children: TreeEntity<TData>[];
  public parent?: TreeEntity<TData>;
  public data: TData;

  constructor(id: string, data: TData, children: TreeEntity<TData>[] = []) {
    this.id = id;
    this.data = data;
    this.children = [];

    children.forEach(child => {
      child.parent = this;
      this.children.push(child);
    });
  }

  addChild(child: TreeEntity<TData>): void {
    child.parent = this;
    this.children.push(child);
  }

  addChildren(children: TreeEntity<TData>[]): void {
    children.forEach(child => {
      child.parent = this;
      this.children.push(child);
    });
  }

  removeChild(childId: string): boolean {
    const index = this.children.findIndex(c => c.id === childId);
    if (index !== -1) {
      this.children.splice(index, 1);
      return true;
    }
    return false;
  }

  clearChildren(): void {
    this.children = [];
  }

  updateData(data: Partial<TData>): void {
    this.data = { ...this.data, ...data };
  }

  get hasChildren(): boolean {
    return this.children.length > 0;
  }

  get level(): number {
    let level = 0;
    let current: TreeEntity<TData> = this.parent;
    while (current) {
      level++;
      current = current.parent;
    }
    return level;
  }

  get isRoot(): boolean {
    return !this.parent;
  }

  findById(id: string): TreeEntity<TData> {
    if (this.id === id) return this;
    
    for (const child of this.children) {
      const found = child.findById(id);
      if (found) return found;
    }
    
    return undefined;
  }

  toTreeNode(): { id: string; data: TData; children?: any[] } {
    return {
      id: this.id,
      data: this.data,
      children: this.children.length > 0 
        ? this.children.map(c => c.toTreeNode()) 
        : undefined,
    };
  }

  static fromTreeNode<T extends TreeEntity<any>>(
    node: { id: string; data: any; children?: any[] },
    EntityClass: new (id: string, data: any, children?: T[]) => T
  ): T {
    const children = node.children?.map(child => 
      TreeEntity.fromTreeNode(child, EntityClass)
    ) || [];
    
    return new EntityClass(node.id, node.data, children);
  }
}
