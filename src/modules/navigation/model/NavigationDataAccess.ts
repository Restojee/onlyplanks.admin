import { inject, injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/entities/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/entities/NavigationItemCategoryEntity";
import { IntlService, IntlServiceInjectKey } from "@common/services/intl";
import State from "@common/hocs/withView/decorators/State";
import EntityManager from "@common/store/entity/EntityManager";

@injectable()
export class NavigationDataAccess {

  @State()
  public navigationItems: EntityManager<NavigationSectionEntity> = new EntityManager({
    getRowId: row => row.id
  });

  constructor(
    @inject(IntlServiceInjectKey) private intlService: IntlService
  ) {

  }
}
