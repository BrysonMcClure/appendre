import * as lettersService from "../services/letters-service"

export const FIND_ALL_LETTERS = 'FIND_LETTERS';
//This is what will utlimatley handle rending a specific user's letters
export const FIND_LETTERS_BY_ATTRIBUTE = 'FIND_LETTERS_BY_ATTRIBUTE';
export const CREATE_LETTER = 'CREATE_LETTER';
export const DELETE_LETTER = 'DELETE_LETTER';
export const UPDATE_LETTER = 'UPDATE_LETTER';

export const findAllLetters = async (dispatch) => {
    const letters = await lettersService.findAllLetters();
    dispatch({
        type: FIND_ALL_LETTERS,
        letters
    });
}

export const findLettersByAttribute = async (dispatch, attribute, value) => {
    const letters = await lettersService.findLettersByAttribute(attribute,value);
    dispatch({
        type: FIND_LETTERS_BY_ATTRIBUTE,
        letters
    });
}

export const createLetter = async (dispatch, letter) => {
    const newLetter = await lettersService.createLetter(letter);
    dispatch({
        type: CREATE_LETTER,
        newLetter
    });
}

export const deleteLetter = async (dispatch, letter) => {
    const response = await lettersService.deleteLetter(letter);
    //Meaning it was succesful so delete from reducer, otherwise we would run the risk of inconsistent data sets, otherwise kind of just fail silently for now I guess
    if (response.deletedCount === 1) {
        dispatch({
            type: DELETE_LETTER,
            letter
        })
    }
}

export const updateLetter = async (dispatch, letter) => {
    const response = await lettersService.updateLetter(letter);
    if (response.modifiedCount === 1) {
        dispatch({
            type: UPDATE_LETTER,
            letter
        });
    }
}

