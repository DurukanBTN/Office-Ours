// functions that authenticate user for signing up and in 

import client from "./client"

// REQUIRES: password as string, email as string 
// EFFECTS: adds user information to supabase
// RETURNS: userID
async function signUp(user_password, user_email) {
    client.auth.signUp({
        email: user_email,
        password: user_password
    })
    .then((response) => {
        return response.user.id;
    })
    .catch((err) => {
        console.log("SignUp error thrown!", err);
    })

}

// REQUIRES: password as string, email as string
// EFFECTS: logs user in if they are signed up already
async function signIn(user_password, user_email) {
    client.auth.signInWithPassword({
        email: user_email, 
        password: user_password
    })
    .then((response) => {
        return response.user.id;
    })
    .catch((err) => {
        console.log("SignIn error thrown!", err);
    });
}

