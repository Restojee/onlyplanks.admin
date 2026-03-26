import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TagModule from '@/modules/tags/view';
import LevelTagsModule from '@/modules/levelTags/view';
import LevelModule from '@/modules/levels/view';
import TipModule from '@/modules/tips/view';
import UserModule from '@/modules/users/view';
import RoleModule from '@/modules/roles/view';
import InvitesModule from '@/modules/invites/view';
import UserSessionsModule from '@/modules/userSessions/view';
import UserAuditLogsModule from '@/modules/userAuditLogs/view';
import CommentedModule from '@/modules/commented/view';
import CompletedModule from '@/modules/completed/view';
import FavoritesModule from '@/modules/favorites/view';
import NotesModule from '@/modules/notes/view';
import SystemSettingsModule from '@/modules/systemSettings';

export const routeMap: Record<string, string> = {
  'tags': '/tags',
  'level-tags': '/level-tags',
  'commented': '/commented',
  'completed': '/completed',
  'favorites': '/favorites',
  'hasNote': '/notes',
  'levels': '/levels',
  'tips': '/tips',
  'users': '/users',
  'invites': '/invites',
  'roles': '/roles',
  'user-sessions': '/user-sessions',
  'user-audit-logs': '/user-audit-logs',
  'system-settings': '/system-settings',
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tags" replace />} />
      <Route path="/tips" element={<TipModule />} />
      <Route path="/tags" element={<TagModule />} />
      <Route path="/level-tags" element={<LevelTagsModule />} />
      <Route path="/levels" element={<LevelModule />} />
      <Route path="/users" element={<UserModule />} />
      <Route path="/invites" element={<InvitesModule />} />
      <Route path="/roles" element={<RoleModule />} />
      <Route path="/user-sessions" element={<UserSessionsModule />} />
      <Route path="/user-audit-logs" element={<UserAuditLogsModule />} />
      <Route path="/commented" element={<CommentedModule />} />
      <Route path="/completed" element={<CompletedModule />} />
      <Route path="/favorites" element={<FavoritesModule />} />
      <Route path="/notes" element={<NotesModule />} />
      <Route path="/system-settings" element={<SystemSettingsModule />} />
    </Routes>
  );
};

export default AppRoutes;
