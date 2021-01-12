import React, { useEffect, useState } from 'react';
import classes from './OrderElement.module.css';
import moment from "moment";        // used for timestamps
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import hash from 'object-hash';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import { database } from '../../firebase';
import ProductPrice from '../ProductPrice/ProductPrice';

function OrderElement({ orderDetails }) {

    const [{ user }] = useStateValue();

    const orderCancelDuration = 15;          // days

    const displayOrderTime = moment.unix(orderDetails.data.created).format("MMMM Do YYYY, h:mma");
    const orderTime = moment.unix(orderDetails.data.created).format("D/MM/YYYY, H:m:s");
    const today = new Date();

    const currentDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // returns whether to display cancel order button or not
    // return policy : 15 days
    const calculateDaysDifference = (orderTimeStamp, currentDate, currentTime) => {
        const [orderDate, orderTime] = orderTimeStamp.split(',');
        //console.log(orderDate + " ---" + orderTime );

        const [orderDay, orderMonth, orderYear] = orderDate.split('/');
        const [orderHour, orderMinute, orderSec] = orderTime.split(':');

        // -1 because month range is from 0 to 11, not 1 to 12
        const orderMoment = moment([parseInt(orderYear), parseInt(orderMonth - 1), parseInt(orderDay), parseInt(orderHour), parseInt(orderMinute), parseInt(orderSec)]);
        // console.log(orderMoment);
        const [currentDay, currentMonth, currentYear] = currentDate.split('/');
        const [currentHour, currentMinute, currentSec] = orderTime.split(':');

        const currentMoment = moment([parseInt(currentYear), parseInt(currentMonth - 1), parseInt(currentDay), parseInt(currentHour), parseInt(currentMinute), parseInt(currentSec)]);
       // console.log(currentMoment);

        return currentMoment.diff(orderMoment, 'days');
    }

    const cancelMyOrder = async () => {
        console.log('Order cancel clicked!');
        // delete record in firebase
        // store order info to firebase database
        const collectionName = 'users';
        // every user can have multiple orders, so orders is a collection
        // paymentIntent.id is treated as order id

        database.collection(collectionName)
            .doc(user?.uid)             // this uid is got from user and it is set in App.js when user is successfully logged in. uid is supplied by Firebase on successfull login.
            .collection('orders')
            .doc(orderDetails.id).delete();

        const response = await axios({
            method: 'POST',
            url: `/cancelorder?paymentIntent=` + orderDetails.id,
        });

    }

    const cancelOrderButton = (
        <button onClick={cancelMyOrder} className={classes.CancelButton}>
            Cancel order
        </button>
    );

    return (
        <div className={classes.OrderElement}>
            <h2>Order</h2>
            {/* data is the name of key that contains the data fetched from Firebase */}
            <p>{displayOrderTime}</p>

            <p>
                <small className={classes.Id}><strong>Order Id:</strong> {orderDetails.id}</small>
            </p>
            {/* One Order can have multiple items, so we need to loop through every item
                Basket is saved to the database at time of successfull payment! */}
            {orderDetails.data.basket?.map(item => {
               // console.log("Days difference: " + calculateDaysDifference(orderTime, currentDate, currentTime));
                return (
                    <CheckoutProduct
                        key={hash(item.id + Math.random())}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hideButton={true}
                    />
                );
            })}

            <div className={classes.CancelButtonAndOrderTotal}>
                {calculateDaysDifference(orderTime, currentDate, currentTime) < orderCancelDuration ? cancelOrderButton : <span className={classes.Empty}></span>}
                {/* / 100 because while creating a payment request amount is specified in paise(smallest subunit of INR). */}
                <p className={classes.OrderTotal}>Order total: <ProductPrice price={orderDetails.data.amount / 100} /></p>
            </div>
        </div>
    )
}

export default OrderElement
