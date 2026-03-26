import { ModalDataAccess } from "@common/services/modal/ModalDataAccess";
import { ModalEntity } from "@common/services/modal/ModalEntity";
import { injectable } from "inversify";

@injectable()
export class ModalService {

  private readonly _modalDataAccess: ModalDataAccess;

  public registerModal(modal: ModalEntity) {
    this._modalDataAccess.registerModal(modal);
  }

  public unregisterModal(modal: ModalEntity) {
    this._modalDataAccess.unregisterModal(modal.id);
  }
}