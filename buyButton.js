function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function order(item) {
    localStorage.removeItem('item');
    localStorage.setItem('item', JSON.stringify(item));
}

function getItem() {
    let item = JSON.parse(localStorage.getItem('item'));

    const orderContainer = document.querySelector('.order-container');

    let itemTitle = document.createElement('h2');
    itemTitle.textContent = item.title;
    orderContainer.appendChild(itemTitle);

    let itemImage = document.createElement('img');
    itemImage.src = item.image;
    orderContainer.appendChild(itemImage);

    let itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;
    orderContainer.appendChild(itemDescription);

    let itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`
    orderContainer.appendChild(itemPrice);
}

function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartContainer = document.querySelector('.cart-container');

    cart.forEach(item => {
        let itemTitle = document.createElement('h2');
        itemTitle.textContent = item.title;
        cartContainer.appendChild(itemTitle);

        let itemImage = document.createElement('img');
        itemImage.src = item.image;
        cartContainer.appendChild(itemImage);

        let itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        cartContainer.appendChild(itemDescription);

        let itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price}`
        cartContainer.appendChild(itemPrice);
    });
}
