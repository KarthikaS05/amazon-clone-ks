import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import { useStateValue } from './StateProvider';


function Orders() {
    const [orders, setOrders] = useState([]);// create a state and resp for storing all the orders with inital value of empty array
    const [{ basket, user }, dispatch] = useStateValue();
   // when app loads useEffectt hook
    //snapshot - gives real time snapshot of db if we push/remove va;ue into db
useEffect(() => {
  if (user) {
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  } else {
    setOrders([]);
  }
}, [user]);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            {/**
             * This is where firestore db comes in
             */}
            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
            
        </div>
    )
}

export default Orders
