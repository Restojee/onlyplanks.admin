import withModule from '@common/hocs/withModule';
import UserContent from './UserContent';

const UserContentModule = withModule({
  key: 'UserContentModule',
  component: UserContent,
  providers: []
});

export default UserContentModule;
