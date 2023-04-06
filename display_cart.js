document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.querySelector('.cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let itemsInCart = {};
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        if (!itemsInCart[item.title]) {
            itemsInCart[item.title] = {
                item: item,
                quantity: 1,
                total: item.price
            };
        } else {
            itemsInCart[item.title].quantity++;
            itemsInCart[item.title].total += item.price;
        }
    }

    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.textContent = `Total Price: $${Object.values(itemsInCart).reduce((sum, item) => sum + item.total, 0).toFixed(2)}`;

    const purchaseButton = document.createElement('button');
    purchaseButton.classList.add('purchase-button');
    purchaseButton.textContent = 'Purchase';
    purchaseButton.style.backgroundColor = 'green';
    purchaseButton.style.color = 'white';
    
    purchaseButton.addEventListener('click', () => {
        
        window.location.href = 'order.html';
       
    });
    
    
const footerRow = document.createElement('tr');

const totalPriceCell = document.createElement('td');
totalPriceCell.appendChild(totalPriceDiv);
footerRow.appendChild(totalPriceCell);

const purchaseButtonCell = document.createElement('td');
purchaseButtonCell.appendChild(purchaseButton);
footerRow.appendChild(purchaseButtonCell);

const removeAllItemsButton = document.createElement('button');
removeAllItemsButton.classList.add('remove-all-items-button');
removeAllItemsButton.textContent = 'Remove All Items';
removeAllItemsButton.style.backgroundColor = 'red';
removeAllItemsButton.style.color = 'white';
removeAllItemsButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cartContainer.innerHTML = ''; 
});




const removeAllItemsButtonCell = document.createElement('td');
removeAllItemsButtonCell.colSpan = 2;

removeAllItemsButtonCell.appendChild(removeAllItemsButton); 
footerRow.appendChild(removeAllItemsButtonCell);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerImage = document.createElement('th');
   
    headerRow.appendChild(headerImage);

    const headerProductName = document.createElement('th');
    headerProductName.textContent = 'Product';
    headerRow.appendChild(headerProductName);

    const headerQuantity = document.createElement('th');
    headerQuantity.textContent = 'Quantity';
    headerRow.appendChild(headerQuantity);

    const headerPrice = document.createElement('th');
    headerPrice.textContent = 'Price';
    headerRow.appendChild(headerPrice);

    const headerRemoveAll = document.createElement('th');
    headerRemoveAll.textContent = 'Remove';
    headerRow.appendChild(headerRemoveAll);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    function removeItemFromCart(title) {
        cart = cart.filter(item => item.title !== title);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateTotalPrice() {
        totalPriceDiv.textContent = `Total Price: $${(Object.values(itemsInCart).reduce((sum, item) => sum + item.total, 0)).toFixed(2)}`;
    }
    
    

    Object.values(itemsInCart).forEach(itemInCart => {
        const itemRow = document.createElement('tr');

   const itemImageCell = document.createElement('td');
        const itemImage = document.createElement('img');
        itemImage.src = itemInCart.item.image;
        itemImage.width = "100";
        itemImage.height = "100";
        itemImageCell.appendChild(itemImage);
        itemRow.appendChild(itemImageCell);

        const itemTitleCell = document.createElement('td');
        itemTitleCell.textContent = itemInCart.item.title;
        itemRow.appendChild(itemTitleCell);

        const itemQuantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.value = itemInCart.quantity;
        quantityInput.style.width = '60px';
        itemQuantityCell.appendChild(quantityInput);
        itemRow.appendChild(itemQuantityCell);
        const itemPriceCell = document.createElement('td');
        itemPriceCell.textContent = `$${itemInCart.total}`;
        itemRow.appendChild(itemPriceCell);

        
        const removeAllButton = document.createElement('button');
        removeAllButton.textContent = 'Remove All';

        const removeAllButtonCell = document.createElement('td');
        removeAllButtonCell.appendChild(removeAllButton);
        itemRow.appendChild(removeAllButtonCell);

        quantityInput.addEventListener('change', () => {
            if (quantityInput.value <= 0) {
                removeItemFromCart(itemInCart.item.title);
                tbody.removeChild(itemRow);
            } else {
                itemInCart.quantity = parseInt(quantityInput.value);
                itemInCart.total = itemInCart.item.price * itemInCart.quantity;
                itemPriceCell.textContent = `$${itemInCart.total}`;
       
                if (itemInCart.quantity > 1) {
                    removeAllButton.textContent = 'Remove All';
                } else {
                    removeAllButton.textContent = 'Remove';
                }
            }
            updateTotalPrice();

        });
        
        // Set the initial button text based on the initial quantity
        if (itemInCart.quantity > 1) {
            removeAllButton.textContent = 'Remove All';
        } else {
            removeAllButton.textContent = 'Remove';
        }


        removeAllButton.addEventListener('click', () => {
            removeItemFromCart(itemInCart.item.title);
            tbody.removeChild(itemRow);
        
            updateTotalPrice();
        });

        tbody.appendChild(itemRow);
    });
    tbody.appendChild(footerRow);
    table.appendChild(tbody);
    cartContainer.appendChild(table);


    
});



function getCartSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemsInCart = {};
    let cartTotal = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        if (!itemsInCart[item.title]) {
            itemsInCart[item.title] = {
                item: item,
                quantity: 1,
                total: item.price
            };
        } else {
            itemsInCart[item.title].quantity++;
            itemsInCart[item.title].total += item.price;
        }
        cartTotal += item.price;
    }

    return {
        items: itemsInCart,
        total: cartTotal
    };
}