// /* eslint-disable react/prop-types */
// import { useReducer } from "react";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider =({children}) =>{

//     const initialState = {
//         // importar de UserService.js
//         // user: getUser(),
//         // token: getToken(),
//         user: JSON.parse(localStorage.getItem("user")) || null,
//         token: localStorage.getItem("token") || null,
//         isAuthenticated: !!localStorage.getItem("token"),
//     };

//     const authReducer = (state, action) => {
//         switch (action.type) {
//             case 'LOGIN':
//                 return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
//             case 'LOGOUT':
//                 return { user: null, token: null };
//             case 'GET_TOKEN':
//                 return { ...state, token: state.token };
//             default:
//                 return state;
//         }
//     };

//     // const AuthProvider = ({ children }) => {
//     const [authState, dispatch] = useReducer(authReducer, initialState);

//     const login = (user, token) =>{
//         const action ={
//             type :'LOGIN',
//             payload: {user, token}
//         }
//         dispatch(action)
//     }

//     const logout = () =>{
//         const action ={
//             type :'LOGOUT'
//         }
//         dispatch(action)
//     }

//     const getToken = () => {
//         dispatch({ type: 'GET_TOKEN' });
//     };

//     const getUser = () =>{
//         return authState.user
//     }
    
    
//     return (
//         <AuthContext.Provider value={{ authState, login, logout, getToken , getUser }}>
//         {children}
//         </AuthContext.Provider>
//     );


      
// }


//------------------------gemini:
/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        return {
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        };
      case "UPDATE":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return {
          user: action.payload.user,
          isAuthenticated: true,
        };
      case "LOGOUT":
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return { user: null, token: null, isAuthenticated: false };
      case "SETTOKEN":
        localStorage.setItem("token", action.payload.token);
        return {
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        };
      default:
        return state;
    }
  };



  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const getToken = () => {
    return authState.token;
  };

  const getUser = () => {
    return authState.user;
  };

  const setToken = (token) => {
    dispatch({  payload: { token }})
  };
  const update = (user) => {
    dispatch({ type: "UPDATE", payload: { user } });
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, getToken, getUser , setToken, update}}
    >
      {children}
    </AuthContext.Provider>
  );
};