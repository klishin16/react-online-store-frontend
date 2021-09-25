import React, {useEffect} from 'react';
// import './App.css';

import './styles/themes/theme.light.less'
import './styles/themes/theme.dark.less'
import './styles/App.css'


import AppRouter from './components/AppRouter';
import {userTypedSelector} from "./hooks/userTypedSelector";
import {Themes} from "./store/reducers/userSettings/types";
import {useActions} from "./hooks/useActions";


function App() {
    const { theme } = userTypedSelector(state => state.them)

    useEffect(() => {
        downloadTheme(theme)
        console.log("Theme downloaded!");
    }, [theme])

    const downloadTheme = (theme: Themes) => {
        if (theme === Themes.LIGHT) {
            document.body.classList.remove('dark')
            document.body.classList.add('light')
            // return import((`./styles/themes/theme.light.less`));
        } else {
            document.body.classList.remove('light')
            document.body.classList.add('dark')
            // return import((`./styles/themes/theme.dark.less`));
        }
    }

    const {authenticate} = useActions()
    useEffect(() => {
        authenticate()
    }, [])

    return (
        <div>
            <AppRouter />
        </div>
  );
}

export default App;

