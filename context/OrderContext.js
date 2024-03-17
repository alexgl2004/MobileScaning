import { createContext, useState } from "react";
//import { user_books } from "../data/data";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [order, setOrder] = useState(null);

  function clearOrder(all=false) {
    
    if(all){
      setOrder(null)  
    }else{
      setOrder({
        updated: true,
        suerId: order.suerId,
        books: [],
      });
    }

  }

  function setOrderGET(userId, orderGET) {
//    console.log('++++++',orderGET)
    let temp_array=[];

    if(orderGET){
      orderGET.forEach((elem) => {
        if(temp_array.indexOf(elem)==-1)
          temp_array.push(elem)
      })
    }

    setOrder({
      updated: true,
      suerId: userId,
      books: temp_array/*orderGET.map((elem) => {
        return elem.book
      })*/,
    });
  }

  function changeOrderState(stateUpdate) {
    //console.log(stateUpdate)
    setOrder({
      updated: stateUpdate,
      suerId: order.suerId,
      books: order.books
    });

  }

  function addToOrder(userId, id) {
    console.log(userId,id)
    
    fetch('https://prj-backend-mini-library.onrender.com/users/'+userId+'/rent', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'bookId':id})
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)
      if(order==null){

        setOrder({
          updated: true,
          suerId: userId,
          books: [
            id
          ],
        });
  
      }else{

        if(order.books.indexOf(id)==-1){
          setOrder({
            updated: true,
            suerId: userId,
            books: [
              ... order.books,
              id
            ],
          });
        }
      }

    })
  }

  function deleteFromOrder(userId, id) {
    if(order==null){
    }else{

      fetch('https://prj-backend-mini-library.onrender.com/users/'+userId+'/delete', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({'bookId':id})
      })
      .then(response => response.json())
      .then(data => { 
        console.log(data)
        setOrder({
          updated: true,
          suerId: userId,
          books: order.books.filter(
            (book) => {
  //            console.log(book,isbn)
              if(book!=id){
                return 1;
              }
            }
          ),
        });        
      })
    }
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addToOrder,
        deleteFromOrder,
        setOrderGET,
        changeOrderState,
        clearOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
