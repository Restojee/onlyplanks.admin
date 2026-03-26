import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { LevelEntityForm } from "@/modules/levels/model/entities/LevelEntityForm";
import LevelActions from "@/modules/levels/model/services/LevelActions";
import LevelCreateForm from "@/modules/levels/model/services/LevelCreateForm";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi from "@common/api/levels";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  
  
}

export interface LevelModuleProps {
  levelActions: LevelActions,
  levelDataAccess: LevelDataAccess,
  levelCreateForm: LevelCreateForm,
  levelApi: LevelsApi,
  levelSelectors: LevelSelectors,
}
