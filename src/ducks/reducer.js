import axios from 'axios'

const initialState = {
  user: {},
  isLoggedIn: false
}


const LOGIN_USER = "LOGIN_USER"
const LOGOUT_USER = "LOGOUT_USER"
const GET_USER = "GET_USER"


export function login(user) {
  console.log(user)
  return { type: LOGIN_USER, payload: user }
}


export function logout() {
  axios.post("/auth/logout").catch((err) => console.log(err))
  return { type: LOGOUT_USER }
}

export function getUser() {
  const payload = axios.get("/auth/user")
    .then((results) => results)
    .catch((err) => console.log(err))
  return { type: GET_USER, payload: payload }
}


 
  


export default function reducer(state = initialState, action) {

  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user:action.payload, isLoggedIn: true }
    case LOGOUT_USER:
      return { ...state, ...action.payload }
    case GET_USER + 'PENDING':
        return this
    case GET_USER + 'FULFILLED':
      return { ...state, user: action.payload.data, isLoggedIn: true} 
    default:
      return state
  }
}
