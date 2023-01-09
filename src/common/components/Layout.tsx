import React from 'react';
import { Layout as AntLayout, theme } from 'antd';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { token: { colorBgContainer, colorPrimary } } = theme.useToken();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout className="site-layout">
        <AntLayout.Header style={{ background: colorPrimary, lineHeight: '1rem', color: '#fff', display: 'flex', alignItems: 'center' }} data-cy="header-background">
          <div className="container">
            <h1 data-cy="header-title" className='header-title'>TO DO LIST APP</h1>
          </div>
        </AntLayout.Header>
        <AntLayout.Content style={{ margin: '0 16px' }} className="container">
          <div style={{ padding: 24, minHeight: '100vh', background: colorBgContainer }}>
            {children}
          </div>
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;