"use strict";document.addEventListener("scroll",stickyNav);let deviceWidth=window.visualViewport.width;function stickyNav(){let e=document.documentElement.scrollTop;document.querySelector(".account-cart-icons").style.display=e>=120&&deviceWidth>=992||e>=0&&deviceWidth<992?"flex":"none"}let seeMoreLessBtn=document.querySelectorAll(".see-more-less>.btn");for(let e=0;e<seeMoreLessBtn.length;e++)seeMoreLessBtn[e].addEventListener("click",seeMoreLess);let cart=document.querySelector("aside.cart");cart.addEventListener("scroll",(function(){document.querySelector("main").style.position="fixed"})),document.addEventListener("click",(function(e){e.target.classList.contains("remove-cart-item")&&removeItem(e)})),document.addEventListener("change",(function(e){e.target.classList.contains("qty")&&updateTotal()}));let cartIcon=document.querySelector(".cart-icon");cartIcon.addEventListener("click",showCart);let navBarCartIcon=document.querySelector(".account-cart-icons .my-cart");navBarCartIcon.addEventListener("click",showCart);let hideCartBtn=document.querySelector(".fa-angle-double-down");hideCartBtn.addEventListener("click",hideCart);let addToCartBtns=Array.from(document.querySelectorAll(".add-to-cart-btn"));for(let e=0;e<addToCartBtns.length;e++)deviceWidth>=992&&addToCartBtns[e].addEventListener("click",showCart),addToCartBtns[e].addEventListener("click",addToCart);let cartItemsCount=Array.from(document.querySelectorAll(".cart-items-count")),purchaseBtn=document.querySelector(".purchase");function showCart(){cart.classList.contains("hide-cart")&&(cart.classList.replace("hide-cart","show-cart"),cart.parentElement.previousElementSibling.getAttribute("src"))}function hideCart(){clearThankYouMsg(),cart.classList.contains("show-cart")&&cart.classList.replace("show-cart","hide-cart")}function clearCart(){let e=document.querySelector(".cart-items"),t=e.childElementCount;for(let n=0;n<t;n++)e.firstElementChild.remove()}function addToCart(e){clearThankYouMsg();let t=e.target.parentElement.parentElement,n=getItemImg(t);if(document.querySelector(".cart-items").childElementCount>0){let e=document.querySelectorAll(".cart-item img");for(let t=0;t<e.length;t++){if(n==e[t].getAttribute("src"))return void alert("This product has already been added to your cart")}}createItem(n,getItemImgCaption(t),getItemPrice(t)),updateCartItemCount(),updateTotal()}function getItemImg(e){return e.querySelector("a>img").getAttribute("src")}function getItemImgCaption(e){return e.querySelector(".img-caption").innerText}function getItemPrice(e){return e.querySelector(".price").innerText}function createItem(e,t,n){let r=document.createElement("div"),c=document.querySelector(".cart-items").appendChild(r);c.classList.add("row","cart-item"),c.innerHTML=`\n  <div class="col-2">\n    <img class="img-fluid" src="${e}" alt="">\n  </div>\n  <div class="col-4">\n    <span class="img-caption">${t}</span>\n  </div>\n  <div class="col-3">\n    <span class="price">${n}</span>\n  </div>\n  <div class="col-3">\n    <input type="number" name="qty" class="qty" value="1" min="1">\n  </div>\n  <i class="fas fa-times remove-cart-item"></i>\n`}function removeItem(e){e.target.parentElement.remove(),updateCartItemCount(),updateTotal()}function updateCartItemCount(){let e=document.querySelectorAll(".cart-item");for(let t=0;t<cartItemsCount.length;t++)cartItemsCount[t].innerText=e.length}function updateTotal(){let e=Array.from(cart.querySelectorAll(".cart-item")),t=0;for(let n=0;n<e.length;n++){let r=e[n].querySelector(".qty").value;t+=e[n].querySelector(".price").innerText.replace("$","")*r}t=t.toFixed(2),cart.querySelector(".cart-total-price").innerText=`$${t}`}function makePurchase(){let e=document.querySelector(".cart-items");0==e.childElementCount||e.firstElementChild.classList.contains("thank-you-msg")||(clearCart(),updateCartItemCount(),updateTotal(),thankYouMsg())}function thankYouMsg(){let e=document.createElement("div"),t=document.querySelector(".cart-items").appendChild(e);t.classList.add("row","thank-you-msg"),t.style.fontSize="2rem",t.style.height="200px",t.style.justifyContent="center",t.innerHTML='\n  <div class="fa-2x">\n    <i class="fas fa-spinner fa-pulse"></i>\n  </div>',setTimeout((()=>{t.innerText="Thank you for your purchase!"}),1e3)}function clearThankYouMsg(){let e=document.querySelector(".cart-items");e.childElementCount>0&&e.firstElementChild.classList.contains("thank-you-msg")&&clearCart()}function seeMoreLess(e){var t=e.target.parentElement.parentElement;t.classList.contains("show-more-items")?(t.classList.remove("show-more-items"),e.target.innerText="See more..."):(t.classList.add("show-more-items"),e.target.innerText="See less...")}purchaseBtn.addEventListener("click",makePurchase);