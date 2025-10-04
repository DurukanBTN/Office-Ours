/*
Module responsible for functions that authenticate user given email and password
*/

import client from "./client"

// REQUIRES: password as a string, email as a string 
// EFFECTS: adds user to supabase 
async function signUp(user_password, user_email) {
    client.auth.signUp({
        email: user_email,
        password: user_password
    })
    .catch((err) => {
        console.log("SignUp error thrown!", err);
    });

}

async function signIn(user_password, user_email) {
    client.auth.signInWithPassword({
        email: user_email, 
        password: user_password
    })
    .catch((err) => {
        console.log("SignIn error thrown!", err);
    });
}

