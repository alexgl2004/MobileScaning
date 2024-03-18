import { createContext, useContext, useState, useRef } from "react";
//import { users } from "../data/data";
import { router } from "expo-router";

export const UserContext = createContext();

export function UserProvider({ children }) {
  
  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [user, setUser] = useState(null);//useState({'email':'test','password':'12345','name':'test','userid':'123456785'});
  const responseData = useRef(null)

  function setUserPromo(promo) {

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'actionId':promo})
    }; 

    const response = fetch('https://prj-backend-shopping-basket.onrender.com/user/' + user.userid + '/activatepromotion', options)
    .then(response => response.json())
    .then(data => { 
      console.log('test-AKT-------------------------'+"\n", user, promo, data)

      setUser(
        {
          name: user.name,
          email: user.email,
          userid: user.userid,
          promotionCode: promo,
          promoactive: data.promotion,
        }
      );      
      
      
//     console.log(data.name,name,'&&',data.password,password)
/*
      if( data.name && (data.name.toUpperCase()==name.toUpperCase() || data.email.toUpperCase()==name) && data.password == password){
        setUser(
          {
            name: data.name,
            email: data.email,
            userid: data.id,
            promotion: data.promotion,
          }
        );

        router.push('');

      }else{
        alert('Wrong Email or Password!')
      }
*/      
    })
    .catch(error => console.error(error));

  }

  function delUserPromo() {

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'actionId':"PROMO10"})
    }; 

    const response = fetch('https://prj-backend-shopping-basket.onrender.com/user/' + user.userid + '/deactivatepromotion', options)
    .then(response => response.json())
    .then(data => { 
      console.log('test-DEL-------------------------'+"\n", user, response, data)

      setUser(
        {
          name: user.name,
          email: user.email,
          userid: user.userid,
          promotionCode: '',
          promoactive: false,
        }
      );            
      
    })
    .catch(error => console.error(error));

  }  

  function login(name, password) {

    const options = {
      method: 'GET',
    }; 

    let nemeEmailed= (name.indexOf('@')!=-1?name.toLowerCase():name.toLowerCase() + '@test.com')

    const response = fetch('https://prj-backend-shopping-basket.onrender.com/user/' + nemeEmailed, options)
    .then(response => response.json())
    .then(data => { 
      console.log('test',data)
      console.log('test', data.email, data.name, name, data.password, password)
//     console.log(data.name,name,'&&',data.password,password)
      if( data.email && nemeEmailed.toUpperCase()==data.email.toUpperCase() && data.password == password){
        setUser(
          {
            name: data.name,
            email: data.email,
            userid: data.id,
            promotionCode: '',
            promoactive: data.promotion,
          }
        );

        router.push('');

      }else{
        alert('Wrong Email or Password!')
      }
    })
    .catch(error => console.error(error));
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        setUserPromo,
        delUserPromo,
      }}
    >
      {children}
    </UserContext.Provider>
  );

}
