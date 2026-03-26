import EntityManager from "@common/store/entity/EntityManager";
import { ModalEntity } from "@common/services/modal/ModalEntity";

export class ModalDataAccess {
  private readonly _modalEntityManager: EntityManager<ModalEntity>;
  private getModalEntityManager(): EntityManager<ModalEntity>{
    return this._modalEntityManager;
  };

  public registerModal(modalEntity: ModalEntity) {
    this.getModalEntityManager().create(modalEntity);
  }

  public unregisterModal(id: string) {
    this.getModalEntityManager().remove(id);
  }
}
