// functionality for creating/using user profiles

import client from "./client"

// REQUIRES: uid: supabase client user id 
//           year: int
//           major: string
//           classes: string[]
//           firstName: string
//           lastName: string
// EFFECTS: creates a user profile for viewer if they are logged in 
async function createProfile(userID, year, major, classes, firstName, lastName) {
    client
    .from("profiles")
    .insert([
        {
            id: userID, 
            year: year, 
            major: major, 
            classes: classes, 
            first_name: firstName, 
            last_name: lastName
        }
    ]) 
    .catch((err) => {
        console.log("Error when creating profile!", err);
    })

}

async function updateProfile() {

}

async function deleteProfile() {

}