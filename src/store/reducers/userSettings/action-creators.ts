import {SetThemeAction, ThemeActionEnum, Themes} from "./types";

export const ThemeActionCreators = {
    setTheme: (theme: Themes): SetThemeAction => ({type: ThemeActionEnum.SET_THEME, payload: theme})
}
