import {
db,
collection,
addDoc
}
from "./firebase.js";

/* ======================
SUCCESS MODAL
====================== */

function showSuccess(){

const modal =
document.getElementById(
"successModal"
);

if(!modal){
window.location.href =
"receipt.html";
return;
}

modal.style.display =
"flex";

setTimeout(()=>{

window.location.href =
"receipt.html";

},2000);

}

/* ======================
SUBMIT CUSTOM ORDER
====================== */

document
.getElementById(
"orderForm"
)
.addEventListener(

"submit",

async function(e){

e.preventDefault();

const form =
e.target;

/* GET VALUES */

const name =
form.customer_name.value.trim();

const phone =
form.contact_number.value.trim();

const category =
form.order_type.value;

const quantity =
parseInt(
form.quantity.value
)||1;

const address =
form.address.value.trim();

const description =
form.description.value.trim();

const estimatedPrice =
Number(
form.estimated_price.value
)||0;

const timestamp =
new Date()
.toISOString();

/* VALIDATION */

if(
!name||
!phone||
!category||
!address||
!description
){
alert(
"Please complete all fields."
);
return;
}

/* CATEGORY LABEL */

const categoryNames={

bouquets:
"Bouquet",

keychains:
"Mirror Keychain",

cardholders:
"Card Holder"

};

/* PRICE */

const categoryBasePrice={

bouquets:300,

keychains:50,

cardholders:40

};

const basePrice=

categoryBasePrice[
category
]

||

0;

const totalPrice=

basePrice*

quantity;

/* ORDER */

const order={

id:
"ORD-"+Date.now(),

type:
"custom",

payment_method:
"Custom Order",

status:
"Pending",

name,

phone,

category,

customType:
categoryNames[
category
],

quantity,

estimated_price:
estimatedPrice,

base_price:
basePrice,

subtotal:
totalPrice,

shipping:
0,

total_price:
totalPrice,

address,

description,

items:[

{

name:
categoryNames[
category
],

category:
"Custom",

quantity,

price:
basePrice

}

],

timestamp

};

/* SAVE */

try{

await addDoc(

collection(
db,
"orders"
),

order

);

/* SAVE RECEIPT */

localStorage.setItem(

"lastOrder",

JSON.stringify(
order
)

);

/* RESET */

form.reset();

/* SHOW THANK YOU */

showSuccess();

}

catch(error){

console.log(error);

alert(
"Failed to submit custom order."
);

}

}

);