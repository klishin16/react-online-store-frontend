import {ThemeAction, ThemeActionEnum, ThemeState, Themes} from "./types";

const initialState: ThemeState = {
    theme: Themes.LIGHT
}

export default function themeReducer (state = initialState, action: ThemeAction) {
    switch (action.type) {

        case ThemeActionEnum.SET_THEME:
            return {...state, theme: action.payload}

        default:
            return state;
    }
}
