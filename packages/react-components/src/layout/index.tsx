import AppBar from '@webb-dapp/react-components/AppBar/AppBar';
import { NoExtensions } from '@webb-dapp/react-components/Notices/NoExtensions';
import { BottomNavigation } from '@webb-dapp/react-components/BottomNavigation/BottomNavigation';
import { useStore } from '@webb-dapp/react-environment';
import { useApi, useIsAppReady, useSetting, useTranslation, useAccounts } from '@webb-dapp/react-hooks';
import { Alert, Page, PageLoading, styled } from '@webb-dapp/ui-components';
import { above } from '@webb-dapp/ui-components/utils/responsive-utils';
import { isEmpty, noop } from 'lodash';
import React, { FC, memo, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { SidebarConfig } from '../Sidebar';

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--platform-background);
  flex-direction: column;
`;
const ContentWrapper = styled.main`
  display: flex;
  flex: 1;
  max-height: calc(100vh - 110px);
  overflow: hidden;
  ${above.sm`
    max-height: calc(100vh - 65px);
	`}
`;

interface MainLayoutProps {
  sidebar: SidebarConfig;
  enableCollapse?: boolean;
}

const Main: FC<MainLayoutProps> = memo(({ children, enableCollapse = true, sidebar }) => {
  const { t } = useTranslation('react-components');
  const { init } = useApi();
  const { allEndpoints, endpoint } = useSetting();
  const isAppReady = useIsAppReady();
  const extension = useAccounts();
  const api = useApi();
  const ui = useStore('ui');
  const navigate = useNavigate();

  useEffect(() => {
    if (!endpoint) return;

    if (isAppReady) return;

    // initialize api
    init(endpoint, allEndpoints);
  }, [init, endpoint, allEndpoints, isAppReady]);

  const breadcrumb = useMemo(() => {
    if (ui.breadcrumb.length === 0) return [];

    return [
      ...ui.breadcrumb.map((item) => ({
        ...item,
        onClick: (): void => {
          navigate(item.path);
        },
      })),
      {
        content: ui.pageTitle,
        onClick: noop,
      },
    ];
  }, [ui.breadcrumb, navigate, ui.pageTitle]);

  const content = useMemo(() => {
    if (!isEmpty(api) && extension.extensionErrorStatus) return (<NoExtensions />);
    if (!isAppReady) return <PageLoading />;

    return (
      <Page>
        <Page.Content>{children}</Page.Content>
      </Page>
    );
  }, [isAppReady, children, extension.extensionErrorStatus]);
  return (
    <MainContainer>
      <AppBar />
      <ContentWrapper>{content}</ContentWrapper>
      <BottomNavigation />
    </MainContainer>
  );
});

Main.displayName = 'Main';

const Layout = { Main };

export { Layout };
