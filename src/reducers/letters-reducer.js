import {FIND_ALL_LETTERS, FIND_LETTERS_BY_ATTRIBUTE, FIND_LETTER_BY_ID, CREATE_LETTER, DELETE_LETTER, UPDATE_LETTER} from "../actions/letters-action";

const lettersReducer = (state = [], action) => {
    switch(action.type) {
        case FIND_ALL_LETTERS:
            return action.letters;
        case FIND_LETTERS_BY_ATTRIBUTE:
            return action.letters;
        case FIND_LETTER_BY_ID:
            console.log(action.letter, "hi");
            return [action.letter];
        case CREATE_LETTER:
            return [...state, action.newLetter];
        case DELETE_LETTER:
            return state.filter((letter) => letter._id !== action.letter._id);
        case UPDATE_LETTER:
            return state.map(letter => letter._id === action.updatedLetter._id ? action.updatedLetter : letter);
        default:
            return state;
    }
}

export default lettersReducer;