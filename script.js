// Quantity Controls
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const quantityDisplay = document.getElementById('quantity');
let quantity = 1;
const productPrice = 125.00; // Define the product price

// Cart Functionality
const cartBtn = document.getElementById('cart-btn');
const cartPopup = document.getElementById('cart-popup');
const addToCartBtn = document.getElementById('add-to-cart-btn');
let cartItems = [];
let mainimg = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg"
];
let v = 0;
// Function to update the cart display
function updateCartDisplay() {
  if (cartItems.length === 0) {
    cartPopup.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartPopup.innerHTML = `
      <p>Cart</p>
      <hr id="cart-title">
      ${cartItems.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="Product Image" class="cart-item-image">
          <div class="cart-item-details">
            <p>${item.name}</p>
            <p>${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}</p>
          </div>
            <img src="./images/icon-delete.svg" alt="dlt Image" id="dlt">
        </div>
      `).join('')}
      <button id="checkout">Checkout</button>
    `;
    document.getElementById('dlt').addEventListener('click', function() {
      cartPopup.innerHTML =  `<p id="c">Cart</p>
      <hr id="cart-title">
      <p id="P">Your cart is empty.</p>`;
    })
    // Attach event listener to the checkout button
    document.getElementById('checkout').addEventListener('click', function(event) {
      cartPopup.style.display = 'none'; 
      event.preventDefault(); 
    confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 1 }
    });
    setTimeout(() => {
    location.reload();
  }, 3000); 
    });
  }
}

// Function to update the total price in the cart
function updateTotalPriceInCart() {
  const totalPrice = quantity * productPrice;
  const totalPriceElement = document.getElementById('cart-total-price');
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
}

// Add to Cart button functionality

addToCartBtn.addEventListener('click', () => {
  const productName = 'Fall Limited Edition Sneakers';
  const productImage = './images/image-product-1-thumbnail.jpg';

  // Check if the item is already in the cart
  const existingItem = cartItems.find(item => item.name === productName);

  if (existingItem) {
    // Do not increase the quantity if the item is already in the cart
    console.log('Item already in cart, quantity not increased.');
  } else {
    // Add the item to the cart with the current quantity
    cartItems.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity
    });
    console.log('Item added to cart.');
  }

  updateCartDisplay();
  updateTotalPriceInCart(); // Ensure total price is updated in the cart

  // Open the cart popup
  cartPopup.style.display = 'block';
});

// Toggle cart popup display
cartBtn.addEventListener('click', () => {
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
});

// Image and Lightbox Functionality
const mainImage = document.getElementById('main-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
let currentIndex = 0;

mainImage.addEventListener('click', function() {
  if (window.innerWidth > 375) {
    lightboxImage.src = mainImage.src;
    lightbox.style.display = 'block';
  }
});

document.getElementById('close-lightbox').addEventListener('click', function() {
  lightbox.style.display = 'none';
});

document.getElementById('prev').addEventListener('click', function() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
  updateLightboxImage();
});

document.getElementById('next').addEventListener('click', function() {
  currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
  updateLightboxImage();
});

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', function() {
    currentIndex = index;
    updateImages(index);
  });
});

lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', function() {
    currentIndex = index;
    updateLightboxImage();
  });
});

function updateImages(index) {
  mainImage.src = thumbnails[index].src.replace('-thumbnail', '');
  lightboxImage.src = thumbnails[index].src.replace('-thumbnail', '');

  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  lightboxThumbnails.forEach(thumb => thumb.classList.remove('active'));

  thumbnails[index].classList.add('active');
  lightboxThumbnails[index].classList.add('active');
}

function updateLightboxImage() {
  lightboxImage.src = thumbnails[currentIndex].src.replace('-thumbnail', '');
}


document.querySelectorAll('.prev, .next').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 300);
  });
});

// Initialize total price display
updateTotalPriceInCart();
// Function to update the cart item quantity
function updateCartItemQuantity() {
  const productName = 'Fall Limited Edition Sneakers';
  const existingItem = cartItems.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity = quantity; // Update the quantity of the existing item
  } else {
    // If the item is not in the cart, add it with the current quantity
    cartItems.push({
      name: productName,
      price: productPrice,
      image: './images/image-product-1-thumbnail.jpg',
      quantity: quantity
    });
  }
  updateCartDisplay();
}

increaseBtn.addEventListener('click', () => {
  quantity++;
  quantityDisplay.textContent = quantity;
  updateTotalPriceInCart(); // Update total price in cart when quantity changes
  updateCartItemQuantity(); // Update cart item quantity
  cartPopup.style.display = 'block'; // Ensure cart is visible
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = quantity;
    updateTotalPriceInCart(); // Update total price in cart when quantity changes
    updateCartItemQuantity(); // Update cart item quantity
    cartPopup.style.display = 'block'; // Ensure cart is visible
  }
});

document.getElementById('menu-icon').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu.style.display === 'block') {
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'block';
  }
});
document.getElementById('cross').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.style.display = 'none';
});

document.getElementById('mprev').addEventListener('click', function() {
  if (v > 0) { // Ensure index stays within bounds
    v--;
  }
  mainImage.src = mainimg[v];
});

document.getElementById('mnext').addEventListener('click', function() {
  if (v < mainimg.length - 1) { // Ensure index stays within bounds
    v++;
  }
  mainImage.src = mainimg[v];
});




