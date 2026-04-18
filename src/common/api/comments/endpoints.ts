export enum CommentEndpoints {
  Collect = 'Collect',
  CollectPaged = 'CollectPaged',
  Create = 'Create',
  CreateAdmin = 'CreateAdmin',
  Update = 'Update',
  UpdateAdmin = 'UpdateAdmin',
  DeleteBulk = 'DeleteBulk',
}

export const CommentUrls: Record<CommentEndpoints, string> = {
  [CommentEndpoints.Collect]: 'comments/collect',
  [CommentEndpoints.CollectPaged]: 'comments/collect-paged',
  [CommentEndpoints.Create]: 'admin/comments/create',
  [CommentEndpoints.CreateAdmin]: 'admin/comments/create-admin',
  [CommentEndpoints.Update]: 'admin/comments/update',
  [CommentEndpoints.UpdateAdmin]: 'admin/comments/update-admin',
  [CommentEndpoints.DeleteBulk]: 'admin/comments/delete-bulk',
};
