import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@common/hooks/useInjection';
import { AsyncServiceInjectKey } from '@common/services/async';
import { AsyncService } from '@common/services/async/AsyncService';
import { When } from '@ui/If';
import styles from './GlobalLoader.module.scss';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import GlobalLoaderModel from '@ui/GlobalLoader/GlobalLoaderModel';

const GlobalLoader: React.FC<WithViewProps<GlobalLoaderModel>> = (
  ({ viewModel }) => (
    <When condition={viewModel.isLoading}>
      <div className={styles.globalLoader}>
        <div className={styles.spinner}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </When>
  )
);

export default withView(GlobalLoader as any, GlobalLoaderModel)
