export interface User {
  id: number,
  avatar: string,
  username: string,
  email: string,
  createdUtcDate: string,
  modifiedUtcDate: string,
}

export interface Tag {
  id: number;
  name: string;
  description: string;
  parentTagId?: number;
  parentTag?: { id: number; name: string };
  childs?: Tag[];
  createdUtcDate?: string,
  modifiedUtcDate?: string,
  user?: User
}

export interface TagRemoveArgs { id: number; }
export interface TagRemoveResponse {}

export interface TagCreateArgs { name: string; description?: string; parentTagId?: number; }
export interface TagCreateResponse extends Tag {}

export interface TagUpdateArgs { id: number; name?: string; description?: string; parentTagId?: number; }
export interface TagUpdateResponse extends Tag {}

export interface TagCollectArgs { }
export type TagCollectResponse = Array<Tag>
