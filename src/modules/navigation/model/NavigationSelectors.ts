import { inject, injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/entities/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/entities/NavigationItemCategoryEntity";
import { IntlService, IntlServiceInjectKey } from "@common/services/intl";
import { getNavCategory, getNavSection } from "@/modules/navigation/common/utils";
import Computed from "@common/hocs/withView/decorators/Computed";
import State from "@common/hocs/withView/decorators/State";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { AuthServiceInjectKey } from "@common/containers/Security/Auth/constants";
import AuthService from "@common/containers/Security/Auth/Auth.service";

@injectable()
export class NavigationSelectors {

  constructor(
    @inject(NavigationDataAccessInjectKey) private navigationDataAccess: NavigationDataAccess,
    @inject(IntlServiceInjectKey) private intlService: IntlService,
    @inject(AuthServiceInjectKey) private authService: AuthService
  ) {}

  @Computed()
  public get getNavigationItems(): NavigationSectionEntity[] {
    const t = this.intlService.t;
    const has = (key: string) => this.authService.hasPolicy(key);

    const securityItems: NavigationItemCategoryEntity[] = [];
    if (has('UsersRead')) securityItems.push(new NavigationItemCategoryEntity('users', t(getNavCategory('Users')), 'IconUser'));
    if (has('InvitesRead')) securityItems.push(new NavigationItemCategoryEntity('invites', t(getNavCategory('Invites')), 'IconInvite'));
    if (has('UserSession')) securityItems.push(new NavigationItemCategoryEntity('user-sessions', t(getNavCategory('UserSessions')), 'IconSettings'));
    if (has('UserAuditLog')) securityItems.push(new NavigationItemCategoryEntity('user-audit-logs', t(getNavCategory('UserAuditLogs')), 'IconFileCode'));
    if (has('RolesRead')) securityItems.push(new NavigationItemCategoryEntity('roles', t(getNavCategory('Roles')), 'IconRole'));

    const sections: NavigationSectionEntity[] = [
      new NavigationSectionEntity('main', t(getNavSection('Main')), [
        new NavigationItemCategoryEntity('tags', t(getNavCategory('Tags')), 'IconTag'),
        new NavigationItemCategoryEntity('tips', t(getNavCategory('Tips')), 'IconNote'),
        new NavigationItemCategoryEntity('levels', t(getNavCategory('Levels')), 'IconLevels'),
      ]),
      new NavigationSectionEntity('myCollection', t(getNavSection('Control')), [
        new NavigationItemCategoryEntity('level-tags', t(getNavCategory('Tags')), 'IconTag', false),
        new NavigationItemCategoryEntity('commented', t(getNavCategory('Commented')), 'IconCommented', false),
        new NavigationItemCategoryEntity('completed', t(getNavCategory('Completed')), 'IconCompleted', false),
        new NavigationItemCategoryEntity('favorites', t(getNavCategory('Favorites')), 'IconFavorite', false),
        new NavigationItemCategoryEntity('hasNote', t(getNavCategory('Notes')), 'IconNote', false),
      ]),
    ];

    if (securityItems.length > 0) {
      sections.push(new NavigationSectionEntity('security', t(getNavSection('Security')), securityItems));
    }

    sections.push(new NavigationSectionEntity('requests', t(getNavSection('RequestsAndCategories')), [
      new NavigationItemCategoryEntity('moderate-levels', t(getNavCategory('Cards')), 'IconLevels', true),
      new NavigationItemCategoryEntity('moderate-tags', t(getNavCategory('Tags')), 'IconTag', true),
    ]));

    if (has('Settings')) {
      sections.push(new NavigationSectionEntity('requests', t(getNavSection('Other')), [
        new NavigationItemCategoryEntity('system-settings', t(getNavCategory('SystemSettings')), 'IconSettings'),
      ]));
    }

    return sections;
  };
}
