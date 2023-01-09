import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './app/App';
import { store } from './app/stores';
import './main.css'
import { ConfigProvider } from 'antd'

const theme = {
  token: {
    colorPrimary: '#16ABF8'
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)