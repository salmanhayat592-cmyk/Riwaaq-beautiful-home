function updateCartCount() {
  const savedCart =
    JSON.parse(localStorage.getItem("riwaaqCart")) || [];

  const totalItems = savedCart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  document.querySelectorAll(".cart-count").forEach(function (count) {
    count.textContent = totalItems;
  });
}

updateCartCount();

const addButtons = document.querySelectorAll(
  'button[data-name][data-price]'
);

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.name;
    const productPrice = Number(button.dataset.price);
    const productImage = button.dataset.image;

    const cart = JSON.parse(localStorage.getItem("riwaaqCart")) || [];

    const existingProduct = cart.find(function (item) {
      return item.name === productName;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.image = productImage;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }

    localStorage.setItem("riwaaqCart", JSON.stringify(cart));
    updateCartCount();
  });
});

function showCart() {
  const itemsContainer = document.getElementById("cart-items");

  // Yeh section sirf cart.html mein hota hai
  if (!itemsContainer) {
    return;
  }

  const cartProducts =
    JSON.parse(localStorage.getItem("riwaaqCart")) || [];

  itemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cartProducts.length === 0) {
    itemsContainer.textContent = "Cart abhi khaali hai.";
  }

  cartProducts.forEach(function (item) {
    const article = document.createElement("article");
    const image = document.createElement("img");

      if (item.image) {
        image.src = item.image;
        image.alt = item.name;
        article.append(image);
      }
    const details = document.createElement("div");
    const name = document.createElement("h2");
    const price = document.createElement("p");
    

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
    const savedCart =
    JSON.parse(localStorage.getItem("riwaaqCart")) || [];

    const updatedCart = savedCart.filter(function (cartItem) {
    return cartItem.name !== item.name;
  });

  localStorage.setItem("riwaaqCart", JSON.stringify(updatedCart));
  updateCartCount();
  showCart();
});

    name.textContent = item.name;
    price.textContent = "Rs. " + item.price.toLocaleString();
    const quantityLabel = document.createElement("label");
quantityLabel.textContent = "Quantity: ";

const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.min = "1";
quantityInput.value = item.quantity;

quantityInput.addEventListener("change", function () {
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 1) {
    quantityInput.value = item.quantity;
    return;
  }

  const savedCart =
    JSON.parse(localStorage.getItem("riwaaqCart")) || [];

  const updatedCart = savedCart.map(function (cartItem) {
    if (cartItem.name === item.name) {
      cartItem.quantity = newQuantity;
    }

    return cartItem;
  });

  localStorage.setItem("riwaaqCart", JSON.stringify(updatedCart));
  updateCartCount();
  showCart();
});

quantityLabel.append(quantityInput);

    details.append(name, price, quantityLabel, removeButton);
    article.append(details);
    itemsContainer.append(article);

    subtotal += item.price * item.quantity;
  });

  document.getElementById("cart-subtotal").textContent =
    "Rs. " + subtotal.toLocaleString();

  document.getElementById("cart-total").textContent =
    "Rs. " + subtotal.toLocaleString();
}

showCart();
function showCheckout() {
  const itemsContainer = document.getElementById("checkout-items");

  // Yeh section sirf checkout.html mein hota hai
  if (!itemsContainer) {
    return;
  }

  const cartProducts =
    JSON.parse(localStorage.getItem("riwaaqCart")) || [];

  itemsContainer.innerHTML = "";
  let total = 0;

  if (cartProducts.length === 0) {
    itemsContainer.textContent = "Aapka cart khaali hai.";
  }

  cartProducts.forEach(function (item) {
    const productLine = document.createElement("p");

    productLine.textContent =
      item.name +
      " — " +
      item.quantity +
      " × Rs. " +
      item.price.toLocaleString();

    itemsContainer.append(productLine);
    total += item.price * item.quantity;
  });

  document.getElementById("checkout-total").textContent =
    "Rs. " + total.toLocaleString();
}

showCheckout();

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const savedCart =
      JSON.parse(localStorage.getItem("riwaaqCart")) || [];

    const message = document.getElementById("order-message");

    if (savedCart.length === 0) {
      message.textContent = "Aapka cart khaali hai.";
      return;
    }

    const customerName =
      document.getElementById("customer-name").value.trim();

    message.textContent =
      "Shukriya " + customerName + "! Aapka demo order confirm ho gaya.";

    localStorage.removeItem("riwaaqCart");
    updateCartCount();
    showCheckout();
    checkoutForm.reset();
  });
}

const productSearch = document.getElementById("product-search");

if (productSearch) {
  const productCards = document.querySelectorAll(".product-grid article");

  productSearch.addEventListener("input", function () {
    const searchText = productSearch.value.trim().toLowerCase();

    productCards.forEach(function (card) {
      const productInfo = card.textContent.toLowerCase();
      card.hidden = !productInfo.includes(searchText);
    });
  });
}