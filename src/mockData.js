// TODO: Mock data to showcase main page functionality
export const mockStudySessions = [
  {
    id: 1,
    pid: 1, // Current user's sessions
    location: "Library Room 201",
    start_time: "2024-01-15T14:00:00Z",
    end_time: "2024-01-15T16:00:00Z",
    class: "CPSC 210",
    description: "Data Structures Review Session"
  },
  {
    id: 2,
    pid: 1, // Current user's sessions
    location: "Math Building Room 501",
    start_time: "2024-01-16T18:00:00Z",
    end_time: "2024-01-16T20:00:00Z",
    class: "MATH 200",
    description: "Calculus Study Group"
  },
  {
    id: 3,
    pid: 2, // Different user's session
    location: "Physics Building Room 105",
    start_time: "2024-01-18T13:00:00Z",
    end_time: "2024-01-18T15:00:00Z",
    class: "PHYS 101",
    description: "Physics Problem Solving"
  },
  {
    id: 4,
    pid: 2, // Same user as session 3
    location: "Buchanan Building Room 202",
    start_time: "2024-01-19T10:00:00Z",
    end_time: "2024-01-19T12:00:00Z",
    class: "ENGL 112",
    description: "English Literature Discussion"
  },
  {
    id: 5,
    pid: 1, // Current user's sessions
    location: "Library Room 301",
    start_time: "2024-01-20T15:00:00Z",
    end_time: "2024-01-20T17:00:00Z",
    class: "CPSC 210",
    description: "Software Engineering Concepts"
  },
  {
    id: 6,
    pid: 3, // Different user's session
    location: "Math Building Room 203",
    start_time: "2024-01-22T19:00:00Z",
    end_time: "2024-01-22T21:00:00Z",
    class: "MATH 200",
    description: "Advanced Calculus Problems"
  },
  {
    id: 7,
    pid: 1, // Current user's sessions
    location: "Physics Building Room 108",
    start_time: "2024-01-23T14:00:00Z",
    end_time: "2024-01-23T16:00:00Z",
    class: "PHYS 101",
    description: "Mechanics and Dynamics"
  },
  {
    id: 8,
    pid: 4, // Different user's session
    location: "Buchanan Building Room 305",
    start_time: "2024-01-24T11:00:00Z",
    end_time: "2024-01-24T13:00:00Z",
    class: "ENGL 112",
    description: "Creative Writing Workshop"
  }
]
