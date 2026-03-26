import { withView } from '@common/hocs/withView';
import LoginModel from '@common/containers/Security/Login/Login.model';
import React from 'react';
import { WithViewProps } from '@common/hocs/withView/types';
import FormBuilderView from '@common/services/form/FormBuilderView';
import styles from './Login.module.scss'
import { Center, Column } from '@ui/Layout';

const Login: React.FC<WithViewProps<LoginModel, {}>> = ({ viewModel }) => {
  return (
    <div className={styles.wrapper}>
      <Center>
        <Column width={400}>
          <FormBuilderView formBuilder={viewModel.form} />
        </Column>
      </Center>
    </div>
  )
}

export default withView(Login as any, LoginModel);
