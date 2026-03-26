import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State, OnMounted } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { Notification } from '@ui/Notification';
import SystemSettingsService from '@common/services/systemSettings/SystemSettingsService';
import { SystemSettingsServiceInjectKey } from '@common/services/systemSettings/constants';
import RolesService from '@/modules/roles/model/services/RolesService';
import { RolesServiceInjectKey } from '@/modules/roles/model/common/constants';
import type { SystemSettings } from '@common/api/systemSettings/models';
import type { RoleCardResponse } from '@common/api/roles/types';

class SystemSettingsModel extends ViewModel {
  @State()
  public settings: SystemSettings = { language: 'ru', defaultRoleId: undefined };

  @State()
  public roles: RoleCardResponse[] = [];

  @State()
  public isLoading: boolean = false;

  constructor(
    @inject(SystemSettingsServiceInjectKey) private settingsService: SystemSettingsService,
    @inject(RolesServiceInjectKey) private rolesService: RolesService
  ) {
    super();
    this.setDefaultRoleId = this.setDefaultRoleId.bind(this);
    this.loadSettings = this.loadSettings.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  @OnMounted()
  @AsyncAction()
  public async loadSettings(): Promise<void> {
    this.isLoading = true;
    try {
      this.settings = await this.settingsService.getSettings();
      await this.rolesService.loadRoles(1, 100);
      this.roles = this.rolesService.dataAccess.entityManager.getCollection;
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить настройки');
    } finally {
      this.isLoading = false;
    }
  }

  @Action()
  public setLanguage(language: string): void {
    this.settings.language = language;
  }

  @Action()
  public setDefaultRoleId(roleId: number): void {
    this.settings.defaultRoleId = roleId;
  }

  @Computed()
  public get roleOptions(): { value: number; label: string }[] {
    return this.roles.map(r => ({ value: r.id, label: r.name }));
  }

  @AsyncAction()
  public async handleSave(): Promise<void> {
    this.isLoading = true;
    try {
      await this.settingsService.updateSettings({
        language: this.settings.language,
        defaultRoleId: this.settings.defaultRoleId,
      });
      Notification.success('Успех', 'Настройки сохранены');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось сохранить настройки');
    } finally {
      this.isLoading = false;
    }
  }
}

export default SystemSettingsModel;
