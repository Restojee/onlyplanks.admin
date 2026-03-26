import { injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { TreeNode } from '@ui/DataTreeTable';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { UserData, UserFormData } from '@/modules/users/model/entities/types';
import type {LevelData} from "@/modules/levels/common/types";

@injectable()
export class UserDataAccess {

  @State()
  public userFormData: UserFormData;

  @State()
  private readonly _entityManager: EntityManager<UserData>;

  constructor() {
    this._entityManager = new EntityManager<UserData>({
      getRowId: row => row.id
    });
    this.userFormData = { username: '', email: '', password: '', roleId: undefined };
  }

  @Computed()
  public get entityManager(): EntityManager<UserData> {
    return this._entityManager;
  }

  @Action()
  public add(user: UserData): void {
    this._entityManager.create(user);
  }

  @Action()
  public update(user: UserData): void {
    this._entityManager.set(user);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public removeMany(ids: number[]): void {
    ids.forEach(id => this._entityManager.remove(id));
  }

  @Action()
  public setMany(users: UserData[]): void {
    this._entityManager.setAll(users);
  }

  @Action()
  public addMany(users: UserData[]): void {
    users.forEach(user => this._entityManager.create(user));
  }

  @Action()
  public filter(predicate: (user: UserData) => boolean): TreeNode<UserData>[] {
    const filtered = this._entityManager.getCollection.filter(predicate);

    return filtered.map(user => ({
      id: user.id,
      data: user,
    }));
  }
}

export default UserDataAccess;
