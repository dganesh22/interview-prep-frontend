export const BASE_URL="http://localhost:5222";
export  const API_PATHS = {
    AUTH: {
        REGISTER:"/api/auth/register", // register new user
        LOGIN: "/api/auth/login", // authenticate user and jwt login token
        GET_PROFILE:"/api/auth/profile" // get login user details
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image" // upload profile picture
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // generate interview questions and answers
        GENERATE_EXPLANATION: "/api/ai/generate-explanation" // generate concept explanation for question
    },
    SESSION: {
        CREATE: "/api/sessions/create", // create a new interview session with questions
        GET_ALL: "/api/sessions/my-sessions", // get all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`, // get session details with questions
        DELETE: (id) => `/api/sessions/${id}` // delete a session
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", // add more questions to session
        PIN:(id) => `/api/questions/${id}/pin`, // pin or unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note` // update / add note to question
    }
}