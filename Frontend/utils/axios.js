import axios from "axios";//Axios is a popular JavaScript library for making HTTP requests from the browser or from Node.js. It's commonly used to communicate with APIs (Application Programming Interfaces).

const api=axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    withCredentials:true
})

export default api 