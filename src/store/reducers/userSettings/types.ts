export enum Themes {
    LIGHT = "light",
    DARK = "dark"
}

export interface ThemeState {
    theme: Themes;
}

export enum ThemeActionEnum {
    SET_THEME="SET_THEME"
}

export interface SetThemeAction {
    type: ThemeActionEnum.SET_THEME;
    payload: Themes
}

export type ThemeAction = SetThemeAction
