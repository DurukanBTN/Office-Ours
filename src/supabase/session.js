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

    // Check if profile exists, if not create a default one
    const { data: existingProfile, error: profileError } = await client
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

    if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create a default one
        const { error: createError } = await client
            .from("profiles")
            .insert([{
                id: user.id,
                year: 1,
                major: "Undeclared",
                classes: [],
                first_name: "User",
                last_name: "Name"
            }]);
        
        if (createError) throw createError;
    } else if (profileError) {
        throw profileError;
    }

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

// RETURNS: all sessions in the db
async function allSessions() {
    const { data, error } = await client
        .from("sessions")
        .select("*");

    if (error) throw error;
    return data;
}

// REQUIRES: className: string
// RETURNS: all sessions that have className
async function filterSessions(className) {
    const { data, error } = await client   
        .from("sessions")
        .select("*")
        .eq("class", className)
    
    if (error) throw error;
    return data;
}

// RETURNS: all sessions current user created
async function getUserSessions() {
    const { data: { user }} = await client.auth.getUser();
    if (!user) throw new Error("User not found!");

    const { data: sessionsData, error } = await client 
        .from("sessions")
        .select("*")
        .eq("pid", user.id)

    if (error) throw error;
    return sessionsData;
}

export { createSession, deleteSession, allSessions, filterSessions, getUserSessions };