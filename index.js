'use strict';

document.addEventListener('scroll', stickyNav);

let deviceWidth = window.visualViewport.width;

function stickyNav() {
  let scrollHeight = document.documentElement.scrollTop;

  if ((scrollHeight >= 120) && (deviceWidth >= 992)) {
    document.querySelector('.account-cart-icons').style.display = 'flex';
  } else if ((scrollHeight >= 0) && (deviceWidth < 992)) {
    document.querySelector('.account-cart-icons').style.display = 'flex';
  } else {
    document.querySelector('.account-cart-icons').style.display = 'none';
  }
}

let seeMoreLessBtn = document.querySelectorAll(".see-more-less>.btn");
for (let i = 0; i < seeMoreLessBtn.length; i++) {
  seeMoreLessBtn[i].addEventListener('click', seeMoreLess);
}

let cart = document.querySelector("aside.cart");
cart.addEventListener('scroll', function () {
  let main = document.querySelector('main');
  main.style.position = 'fixed';
})
document.addEventListener('click', function (e) {
  if (e.target.classList.contains("remove-cart-item")) {
    removeItem(e);
  }
})

document.addEventListener('change', function (e) {
  if (e.target.classList.contains("qty")) {
    updateTotal();
  }
})

let cartIcon = document.querySelector(".cart-icon");
cartIcon.addEventListener('click', showCart);

let navBarCartIcon = document.querySelector(".account-cart-icons .my-cart");
navBarCartIcon.addEventListener('click', showCart);

let hideCartBtn = document.querySelector(".fa-angle-double-down");
hideCartBtn.addEventListener('click', hideCart);

let addToCartBtns = Array.from(document.querySelectorAll('.add-to-cart-btn'));
for (let i = 0; i < addToCartBtns.length; i++) {
  if (deviceWidth >= 992) {
    addToCartBtns[i].addEventListener('click', showCart);
  }
  addToCartBtns[i].addEventListener('click', addToCart);
}

let cartItemsCount = Array.from(document.querySelectorAll(".cart-items-count"));

let purchaseBtn = document.querySelector(".purchase");
purchaseBtn.addEventListener('click', makePurchase);

function showCart() {
  if (cart.classList.contains('hide-cart')) {
    cart.classList.replace('hide-cart', 'show-cart');
    cart.parentElement.previousElementSibling.getAttribute('src')
  }
}

function hideCart() {
  clearThankYouMsg();
  if (cart.classList.contains('show-cart')) {
    cart.classList.replace('show-cart', 'hide-cart');
  }
}

function clearCart() {
  let cartItemsDiv = document.querySelector('.cart-items');
  let numOfCartItems = cartItemsDiv.childElementCount;
  for (let i = 0; i < numOfCartItems; i++) {
    cartItemsDiv.firstElementChild.remove();
  }
}

function addToCart(e) {
  clearThankYouMsg();
  let itemRow = e.target.parentElement.parentElement;
  let itemImg = getItemImg(itemRow);
  let cartItemsDiv = document.querySelector(".cart-items");
  if (cartItemsDiv.childElementCount > 0) {
    let itemImgs = document.querySelectorAll(".cart-item img");
    for (let i = 0; i < itemImgs.length; i++) {
      let imgName = itemImgs[i].getAttribute('src');
      if (itemImg == imgName) {
        alert('This product has already been added to your cart');
        return;
      }
    }
  }
  let itemImgCaption = getItemImgCaption(itemRow);
  let itemPrice = getItemPrice(itemRow);
  createItem(itemImg, itemImgCaption, itemPrice);
  updateCartItemCount();
  updateTotal();
}

function getItemImg(itemRow) {
  let img = itemRow.querySelector("a>img").getAttribute('src');
  return img;
}

function getItemImgCaption(itemRow) {
  let caption = itemRow.querySelector(".img-caption").innerText;
  return caption;
}

function getItemPrice(itemRow) {
  let price = itemRow.querySelector(".price").innerText;
  return price;
}

function createItem(itemImg, itemImgCaption, itemPrice) {
  let div = document.createElement('div');
  let cartItemsDiv = document.querySelector(".cart-items");
  let itemDiv = cartItemsDiv.appendChild(div);
  itemDiv.classList.add("row", "cart-item");
  itemDiv.innerHTML = `
  <div class="col-2">
    <img class="img-fluid" src="${itemImg}" alt="">
  </div>
  <div class="col-4">
    <span class="img-caption">${itemImgCaption}</span>
  </div>
  <div class="col-3">
    <span class="price">${itemPrice}</span>
  </div>
  <div class="col-3">
    <input type="number" name="qty" class="qty" value="1" min="1">
  </div>
  <i class="fas fa-times remove-cart-item"></i>
`
}

function removeItem(e) {
  let itemRow = e.target.parentElement;
  itemRow.remove();
  updateCartItemCount();
  updateTotal();
}

function updateCartItemCount() {
  let itemRows = document.querySelectorAll(".cart-item");
  for (let i = 0; i < cartItemsCount.length; i++) {
    cartItemsCount[i].innerText = itemRows.length;
  }
}

function updateTotal() {
  let itemRows = Array.from(cart.querySelectorAll(".cart-item"));
  let total = 0
  for (let i = 0; i < itemRows.length; i++) {
    let qty = itemRows[i].querySelector(".qty").value;
    let priceElement = itemRows[i].querySelector(".price");
    let price = priceElement.innerText.replace('$', '');
    total = total + (price * qty);
  }
  total = total.toFixed(2);
  cart.querySelector(".cart-total-price").innerText = `$${total}`;
}

function makePurchase() {
  let cartItemsDiv = document.querySelector(".cart-items");
  if (cartItemsDiv.childElementCount == 0 || cartItemsDiv.firstElementChild.classList.contains("thank-you-msg")) {
    return;
  }
  clearCart();
  updateCartItemCount();
  updateTotal();
  thankYouMsg();
}

function thankYouMsg() {
  let div = document.createElement('div');
  let cartItemsDiv = document.querySelector('.cart-items');
  let thankYouDiv = cartItemsDiv.appendChild(div);
  thankYouDiv.classList.add("row", "thank-you-msg");
  thankYouDiv.style.fontSize = '2rem';
  thankYouDiv.style.height = '200px';
  thankYouDiv.style.justifyContent = 'center';
  thankYouDiv.innerHTML = `
  <div class="fa-2x">
    <i class="fas fa-spinner fa-pulse"></i>
  </div>`
  setTimeout(() => {
    thankYouDiv.innerText = `Thank you for your purchase!`;
  }, 1000);
}

function clearThankYouMsg() {
  let cartItemsDiv = document.querySelector('.cart-items');
  if (cartItemsDiv.childElementCount > 0) {
    if (cartItemsDiv.firstElementChild.classList.contains("thank-you-msg")) {
      clearCart();
    }
  }
}

function seeMoreLess(e) {
  var items = e.target.parentElement.parentElement;
  if (items.classList.contains("show-more-items")) {
    items.classList.remove("show-more-items");
    e.target.innerText = "See more...";
  } else {
    items.classList.add("show-more-items");
    e.target.innerText = "See less...";
  }
}