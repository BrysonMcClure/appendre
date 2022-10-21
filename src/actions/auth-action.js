import * as authService from '../services/auth-service';

export const signUp = async (newuser) => {
    authService.signup(newuser)
}
