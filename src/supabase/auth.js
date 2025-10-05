// functions that authenticate user for signing up and in 

import client from "./client"

// REQUIRES: password as string, email as string 
// EFFECTS: adds user information to supabase
// RETURNS: userID
async function signUp(user_password, user_email) {
    const { data, error } = await client.auth.signUp({
        email: user_email,
        password: user_password
    });

    if (error) throw error;

    return data.user.id;

}

// REQUIRES: password as string, email as string
// EFFECTS: logs user in if they are signed up already
// RETURNS: userID
async function signIn(user_password, user_email) {
    const { data, error } = await client.auth.signInWithPassword({
        email: user_email, 
        password: user_password
    });

    if (error) throw error;

    return data.user.id;
}

