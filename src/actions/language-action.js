import * as languageService from "../services/language-service"

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const GET_LANGUAGE = 'GET_LANGAUGE';

export const getLanguage = async (dispatch) => {
    const language = await languageService.getLanguage();
    dispatch({
        type: GET_LANGUAGE,
        language
    });
}

export const setLanguage = async (dispatch, language) => {
    const response = await languageService.setLanguage(language);
    dispatch({
        type: SET_LANGUAGE,
        language
    });
}