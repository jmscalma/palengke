document.addEventListener("DOMContentLoaded", function() {
    fetch('/user/products/all')
        .then(response => response.json())
        .then(products => {
            console.log(products)
            const productContainer = document.getElementById('product_container');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-container');
                productDiv.innerHTML = `
                    <img class="product_image" src="/images/${product.name}.png" alt="${product.name}">
                    <h2 class="product_name">${product.name}</h2>
                    <h4 class="product_price">Php ${product.price}</h4>
                `;
                // productDiv.addEventListener('click', ()=> openModal(product.product_id))
                productDiv.addEventListener('click', ()=> openModal(product.product_id))
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

        const modal = document.getElementById("productModal");
        // const closeModal = document.getElementsByClassName("close")[0];

        const orderModal = document.getElementById("order_details_modal");
        const closeOrderModal = document.getElementsByClassName("close")[0];


        function openModal(product_id){
            // modal.style.display = "block";
            fetch(`/user/products/${product_id}`)
            // console.log(product_id)
                .then(response => response.json())
                .then(product => {
                    console.log(product)
                    const modalContent = document.getElementById('product-modal-content')
                    modalContent.innerHTML = `
                        <span class="close" onClick="closeModal()">&times;</span>
                        <img class="product_image" src="/images/${product[0].name}.png">
                        <h2 class="product_name">${product[0].name}</h2>
                        <h4 class="product_price">Available: ${product[0].qty} ${product[0].bundle} | Php ${product[0].price}</h4>
                        <button class="buy_button" onclick="buyNow(${product[0].product_id})">Buy Now</button>
                    `;

                    modal.style.display = "block";
                })
                .catch(error => console.error('Error fetching products:', error));
        }

        // buy now
        window.buyNow = function(productId) {
            // alert(`Product with ID ${productId} purchased!`);
            modal.style.display = "none";
            fetch(`/user/products/${productId}`)
            // console.log(product_id)
                .then(response => response.json())
                .then(product => {
                    console.log(product)
                    const modalContent = document.getElementById('order_details_content_modal')
                    modalContent.innerHTML = `
                    <div class="product_details">
                        <img class="product_image_order_confirmation_modal" src="/images/${product[0].name}.png" alt="${product[0].name}">
                        <h2 class="product_name_order_confirmation_modal">${product[0].name}</h2>
                        <p class="product_price_order_confirmation_modal">Php ${product[0].price} per ${product[0].bundle}</p>
                    </div>
                    <div class="customer_details">
                        <span class="close_order_confirmation_modal" onclick="window.closeOrderModal()">&times;</span>
                        <input type="text" id="buyer_name" placeholder="Name of Buyer">
                        <input type="email" id="buyer_email" placeholder="Email address">
                        <input type="text" id="buyer_mobile" placeholder="Mobile #" required maxlength="11" minlength="11">
                        <input type="number" id="buyer_qty" placeholder="Qty" min="1" max="${product[0].qty}" oninput="calculateTotal(${product[0].price})">
                        <input type="text" id="total_price" placeholder="Total Price" readonly>
                        <button class="place_order_button" onclick="placeOrder(${product[0].product_id})">Place Order</button>
                    </div>
                `;

                    orderModal.style.display = "block";
                })
                .catch(error => console.error('Error fetching products:', error));
        };

        window.placeOrder = function(product_id) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;


            const customer_name = document.getElementById('buyer_name').value;
            const email = document.getElementById('buyer_email').value;
            const number = document.getElementById('buyer_mobile').value;
            const quantity = document.getElementById('buyer_qty').value;
            const total_price = document.getElementById('total_price').value;

            
            if(!emailRegex.test(email)){
                alert("invalid email")
            }

            const orderData = {
                product_id,
                customer_name,  
                email,
                number,
                quantity,
                total_price
            };

            // fetch(`/user/products/${product_id}/order`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(orderData)
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     console.log(data);
            //     alert('Order placed successfully!');
            //     orderModal.style.display = "none";
                
            //     // receipt
            //     // openReceiptModal();
                

            // })
            // .catch(error => {
            //     console.error('Error placing order:', error);
            // });
        };

        window.closeModal = function() {
            console.log("modal close")
            modal.style.display = "none";
        };

        window.closeOrderModal = function() {
            console.log("order modal close")
            orderModal.style.display = "none";
        };

        window.calculateTotal = function(price) {
            const qty = document.getElementById('buyer_qty').value;
            const total = qty * price;
            document.getElementById('total_price').value = `${total}`;
        };

        window.onClick = function(event){
            if(event.target == modal){
                modal.style.display = "none";
            }
        }


        
});
