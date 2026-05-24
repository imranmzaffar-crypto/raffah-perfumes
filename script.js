const whatsappNumber = "971569546069";

let cart = JSON.parse(localStorage.getItem("raffahCart")) || {};

window.onload = function(){
  loadSizes();
  showCart();
  refreshButtons();
updatePrice('Hawas Black','size1','price1');
updatePrice('Hawas Fire','size2','price2');
updatePrice('Hawas Ice','size3','price3');
updatePrice('9PM Black','size4','price4');
updatePrice('9PM Red','size5','price5');
updatePrice('Liquid Brun','size6','price6');
updatePrice('Prestige Ruby','size7','price7');
updatePrice('Ivory Nuit','size8','price8');
updatePrice('Island Rose','size9','price9');
updatePrice('High Dreams','size10','price10');
updatePrice('Cuir','size11','price11');
updatePrice('Boisee','size12','price12');
updatePrice('Noir','size13','price13');
updatePrice('Marj','size14','price14');
updatePrice('Lattafa Khamrah','size15','price15');
updatePrice('Imperial Woods','size16','price16');
updatePrice('Desire Oud','size17','price17');
updatePrice('Bin Shekh','size18','price18');
updatePrice('Ignite Oud','size19','price19');
updatePrice('Nihla','size20','price20');
updatePrice('Hind','size21','price21');
};

function saveSize(sizeId){
  const size = document.getElementById(sizeId).value;
  localStorage.setItem(sizeId, size);
}

function loadSizes(){
  document.querySelectorAll("select").forEach(select => {
    const saved = localStorage.getItem(select.id);
    if(saved){
      select.value = saved;
    }
  });
}
function getPrice(name, size){

  const prices = {

    "Hawas Black": {
      "5ML": 10,
      "3ML": 7
    },

    "Hawas Fire": {
      "5ML": 10.50,
      "3ML": 7.75
    },

    "Hawas Ice": {
      "5ML": 9,
      "3ML": 6.50
    },

    "9PM Black": {
      "5ML": 10,
      "3ML": 7
    },

    "9PM Red": {
      "5ML": 11,
      "3ML": 8
    },

    "Liquid Brun": {
    "5ML": 12,
    "3ML": 8.50
    },

    "Prestige Ruby": {
      "5ML": 15,
      "3ML": 10
    },

    "Ivory Nuit": {
    "5ML": 9,
    "3ML": 7
    },

    "Island Rose": {
    "5ML": 10,
    "3ML": 7.75
    },

    "High Dreams": {
    "5ML": 10,
    "3ML": 7.75
    },

    "Cuir": {
    "5ML": 10,
    "3ML": 8
    },

    "Boisee": {
    "5ML": 10,
    "3ML": 8
    },

    "Noir": {
    "5ML": 10,
    "3ML": 8
    },

    "Marj": {
    "5ML": 20,
    "3ML": 13
    },

    "Lattafa Khamrah": {
    "5ML": 10,
    "3ML": 7
    },

    "Imperial Woods": {
    "5ML": 19,
    "3ML": 6
    },

    "Desire Oud": {
    "5ML": 9,
    "3ML": 6
    },

    "Bin Shekh": {
    "5ML": 20,
    "3ML": 17
    },

    "Ignite Oud": {
    "5ML": 23,
    "3ML": 18
    },

    "Nihla": {
    "5ML": 17,
    "3ML": 14
    },

    "Hind": {
    "5ML": 30,
    "3ML": 25
    },

    
  };

return prices[name]?.[size] || 0;
}

function updatePrice(name, sizeId, priceId){
  const size = document.getElementById(sizeId).value;
  const price = getPrice(name, size);

  document.getElementById(priceId).innerText = `AED ${price}`;
}

function getItemKey(name, size){
  return name + "-" + size;
}

function addToCart(name, sizeId, btn){
  const size = document.getElementById(sizeId).value;
  const itemKey = getItemKey(name, size);

  if(cart[itemKey]){
    delete cart[itemKey];
  } else {
    cart[itemKey] = {
      key: itemKey,
      name: name,
      size: size,
      qty: 1,
      price: getPrice(name, size)
    };
  }

  localStorage.setItem("raffahCart", JSON.stringify(cart));
  showCart();
  refreshButtons();
}

function refreshButtons(){
  document.querySelectorAll(".card").forEach(card => {
    const name = card.querySelector("h3").innerText;
    const select = card.querySelector("select");
    const btn = card.querySelector("button");

    const size = select.value;
    const itemKey = getItemKey(name, size);

    if(cart[itemKey]){
      btn.classList.add("added");
      btn.innerText = "Added";
    } else {
      btn.classList.remove("added");
      btn.innerText = "Add to Cart";
    }
  });
}

function increaseQty(itemKey){
  cart[itemKey].qty++;

  localStorage.setItem("raffahCart", JSON.stringify(cart));
  showCart();
}

function decreaseQty(itemKey){
  if(cart[itemKey].qty > 1){
    cart[itemKey].qty--;
  } else {
    delete cart[itemKey];
  }

  localStorage.setItem("raffahCart", JSON.stringify(cart));
  showCart();
  refreshButtons();
}

function showCart(){
  const cartItems = document.getElementById("cartItems");
  const items = Object.values(cart);

  if(items.length === 0){
    cartItems.innerHTML = "No items added";
    return;
  }

  let total = 0;

  cartItems.innerHTML = items.map(item => {
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    return `
      <div class="cart-item">
        <div>
          ${item.name} - ${item.size}<br>
          AED ${item.price} x ${item.qty} = AED ${itemTotal}
        </div>

        <div class="qty-box">
          <button onclick="decreaseQty('${item.key}')">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty('${item.key}')">+</button>
        </div>
      </div>
    `;
  }).join("");

  cartItems.innerHTML += `
    <div class="total-box">Total: AED ${total}</div>
  `;
}

function placeOrder(){
  const items = Object.values(cart);

  if(items.length === 0){
    alert("Please add perfume first");
    return;
  }

  let total = 0;
  let message = "Hi, I want to place an order from Raffah:%0A%0A";

  items.forEach((item, index) => {
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    message += `${index + 1}. ${item.name} - ${item.size} - Qty ${item.qty} - AED ${itemTotal}%0A`;
  });

  message += `%0ATotal: AED ${total}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
}