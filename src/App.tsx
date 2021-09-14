import React from 'react';
// import './App.less';
// import 'antd/dist/antd.variable.min.css';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.variable.css'
import  './styles/App.less'

import AppRouter from './components/AppRouter';
import {ConfigProvider} from "antd";
import {ConfigConsumerProps, ConfigProviderProps} from "antd/es/config-provider";


type ConfigProps = {
    theme: any,
};


function App() {

    return (
        <div>
            <AppRouter />
        </div>
  );
}

export default App;

