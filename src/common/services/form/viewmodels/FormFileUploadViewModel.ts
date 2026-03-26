import State from "@common/hocs/withView/decorators/State";
import Action from "@common/hocs/withView/decorators/Action";
import Prop from "@common/hocs/withView/decorators/Prop";
import Computed from "@common/hocs/withView/decorators/Computed";
import { FormField } from "@common/services/form/FormField";
import { BaseFieldViewModel } from "@common/services/form/containers";

export class FormFileUploadViewModel extends BaseFieldViewModel {
  @State()
  avatar: boolean = false;

  @Action()
  setAvatar(avatar: boolean): void {
    this.field.setConfig({ avatar });
  }

  @Computed()
  get previewUrl(): string | null {
    if (this.field.value && this.avatar) {
      return URL.createObjectURL(this.field.value);
    }
    return null;
  }
}
