import { createContext, useContext, useState, useRef } from "react";
//import { users } from "../data/data";
import { router } from "expo-router";

import { OrderContext } from "./OrderContext";

export const UserContext = createContext();

export function UserProvider({ children }) {
  
  const { setOrderGET, clearOrder } = useContext(OrderContext);
  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [user, setUser] = useState(null);//useState({'email':'test','password':'12345','name':'test','userid':'123456785'});
  const responseData = useRef(null)
  function login(name, password) {

  const options = {
    method: 'POST',
  }; 
  const response = fetch('https://prj-backend-mini-library.onrender.com/user/' + name, options)
    .then(response => response.json())
    .then(data => { 
      console.log('test',data)
//     console.log(data.name,name,'&&',data.password,password)
      if( data.name && (data.name.toUpperCase()==name.toUpperCase() || data.email.toUpperCase()==name) && data.password == password){
        setUser(
          {
            name: data.name,
            email: data.email,
            userid: data.id,
          }
        );
        
        setOrderGET(data.id, data.books)

        router.push('');
      }else{
        alert('Wrong Email or Password!')
      }
    })
    .catch(error => console.error(error));
  }

  function logout() {
    setUser(null);
    clearOrder(true);
  }
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
