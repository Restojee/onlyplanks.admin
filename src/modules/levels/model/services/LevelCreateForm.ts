import { LevelEntityForm } from "@/modules/levels/model/entities/LevelEntityForm";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";
import { injectable } from "inversify";

@injectable()
class LevelCreateForm {

  constructor(
    private readonly levelSelectors: LevelSelectors
  ) {}

  
  
  
}

export default LevelCreateForm;
