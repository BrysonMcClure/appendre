import * as lettersService from "../services/letters-service"

export const FIND_ALL_LETTERS = 'FIND_LETTERS';
//This is what will utlimatley handle rending a specific user's letters
export const FIND_LETTERS_BY_ATTRIBUTE = 'FIND_LETTERS_BY_ATTRIBUTE';
export const FIND_LETTER_BY_ID = 'FIND_LETTER_BY_ID';
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

export const findLetterById = async (dispatch, lid) => {
    console.log("this is firing");
    const letter = await lettersService.findLetterById(lid);
    dispatch({
        type: FIND_LETTER_BY_ID,
        letter
    });
}

export const createLetter = async (dispatch, letter, author) => {
    const newLetter = await lettersService.createLetter(letter, author);
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
    //This is a little bass ackwards, but is a neccessary work around to populate properly the reducer with the populated
    //version of the updated letter, (something only the mongoose db on teh other end of the service has access to,
    //otherwise using the updatedLetter object we sent, while persistent/consistent with and maintaining parody with the data base,
    //is not in a format we can use. THe id field matches how it appears in the db, but our app depends on populate document by id reference
    //objects to display properly, and this is the best way I can think of for now to do it. GOing to sleep on this for a bit as something about this
    //doesnt feel right on the face, but i may be/ hopefully I am wrong about that. Lets sleep on it and we shall seee..... but at least we fixed it/
    //and figured out what the problem was, no small feet/feat at all. Nice job and well done Bryson, yayayayayayayay!!
    const updatedLetter = await lettersService.findLetterById(letter._id);
    if (response.modifiedCount === 1) {
        dispatch({
            type: UPDATE_LETTER,
            updatedLetter
        });
    }
}

