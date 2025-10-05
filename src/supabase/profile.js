// functionality for creating/using user profiles

import client from "./client"

// REQUIRES: year: int
//           major: string
//           classes: string[]
//           firstName: string
//           lastName: string
// EFFECTS: creates a user profile for viewer if they are logged in 
// RETURNS: profile that was created 
async function createProfile(year, major, classes, firstName, lastName) {
    const { data: { user }} = await client.auth.getUser();
    if (!user) throw new Error ("User not found!");

    const { data, error } = await client
        .from("profiles")
        .insert([
            {
                id: user.id, 
                year: year, 
                major: major, 
                classes: classes, 
                first_name: firstName, 
                last_name: lastName
            }
        ])
        .select("*");

    if (error) throw error;
    return data[0];
}

// REQUIRES: attributes of row we want to update (ALLOWED to be null)
//           classes should be a list of ONLY NEW classes
// EFFECTS: updates the user's profile with new attributes
// RETURNS: newly updated profile
async function updateProfile(year, major, classes, firstName, lastName) {
    // Debug: Check client initialization
    console.log("Client object:", client);
    console.log("Client.from:", client.from);
    console.log("Environment variables:", {
        url: import.meta.env.VITE_SUPABASE_URL,
        key: import.meta.env.VITE_SUPABASE_KEY
    });
    
    if (!client.from) {
        throw new Error("Supabase client not properly initialized. Check your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_KEY)");
    }
    
    // For development: Skip authentication and use mock user ID
    const mockUserId = "mock-user-123";
    console.log("Using mock user ID for development:", mockUserId);
    
    // Try to get existing profile, if it doesn't exist, use empty classes
    const {data, error} = await client.from("profiles").eq("id", mockUserId).select("*");
    let oldClasses = [];
    
    if (error) {
        console.log("No existing profile found, starting with empty classes");
    } else {
        oldClasses = data[0]?.classes || [];   //empty array if null
        console.log("Found existing profile with classes:", oldClasses);
    }

    const updates = {};
    if (year != null) updates.year = year;
    if (major != null) updates.major = major;
    if (firstName != null) updates.first_name = firstName;
    if (lastName != null) updates.last_name = lastName;

    if (classes == null) {
        updates.classes = oldClasses;
    } else {
        const mergedClasses = [...oldClasses];
        classes.forEach((newClass) => {
            if (!mergedClasses.includes(newClass)) mergedClasses.push(newClass);
        });
        updates.classes = mergedClasses;
    }

    const { data: updatedProfile, error: updateError} = await client
        .from("profiles")
        .update(updates)
        .eq("id", mockUserId)
        .select("*");

    if (updateError) throw (updateError);
    return updatedProfile[0];
}

// EFFECTS: deletes user's profile 
// RETURNS: deleted profile
async function deleteProfile() {
    const { data: { user }} = await client.auth.getUser();
    if (!user) throw new Error ("User not found!");

    const { data, error } = await client
        .from("profiles")
        .delete()
        .eq("id", user.id)
        .select("*");

    if (error) throw error;
    return data[0];
}

export { createProfile, updateProfile, deleteProfile };