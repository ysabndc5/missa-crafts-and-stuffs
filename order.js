import {
db,
collection,
addDoc
}
from "./firebase.js";


document
.getElementById("orderForm")
.addEventListener(
"submit",

async function(e){

e.preventDefault();

const form = e.target;

const name =
form.customer_name.value;

const phone =
form.contact_number.value;

const category =
form.order_type.value;

const quantity =
parseInt(form.quantity.value);

const address =
form.address.value;

const description =
form.description.value;

const estimatedPrice =
form.estimated_price.value || 0;

const timestamp =
new Date().toLocaleString();


const categoryBasePrice={
bouquets:300,
keychains:50,
cardholders:40
};

const basePrice=
categoryBasePrice[category]||0;

const totalPrice=
basePrice*quantity;


const order={

id:"ORD-"+Date.now(),

type:"custom",

name,

phone,

category,

quantity,

estimated_price:
estimatedPrice,

base_price:
basePrice,

total_price:
totalPrice,

address,

description,

timestamp

};


try{

await addDoc(
collection(db,"orders"),
order
);

alert(
"Order placed successfully!"
);

form.reset();

window.location.href=
"index.html";

}

catch(error){

console.log(error);

alert(
"Failed to place order"
);

}

});