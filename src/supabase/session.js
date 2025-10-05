// functionality for creating and manipulating study sessions

import client from "./client"

// REQUIRES: location: string 
//           start_time: timestamp
//           end_time: timestamp
//           study_class: string
//           description: string 
// EFFECTS: create a session associated with only one profile (represents study session)
// RETURNS: newly created session 
async function createSession(location, start_time, end_time, study_class, description) {
    const { data: { user } } = await client.auth.getUser();
    if (!user) throw new Error ("User not found!");

    const { data, error } = await client
        .from("sessions")
        .insert([{
            pid: user.id, 
            location: location, 
            start_time: start_time, 
            end_time: end_time, 
            class: study_class, 
            description: description
        }])
        .select("*");

    if (error) throw error;
    return data[0];
}

// REQUIRES: id of section to be deleted
// EFFECTS: deletes specified session
// RETURNS: deleted session
async function deleteSession(sid) {
    if (!sid) throw new Error ("No session ID provided!");

    const { data, error } = await client   
        .from("sessions")
        .delete()
        .eq("id", sid)
        .select("*");

    if (error) throw error;
    return data[0];
}

export { createSession, deleteSession };