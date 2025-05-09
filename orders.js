document.getElementById('apply-coupon-btn').addEventListener('click', function () {
    // Retrieve the entered coupon code
    let couponCode = document.querySelector('input[placeholder="Coupon Code"]').value.trim();
    console.log("Coupon Code Entered:", couponCode); // Debugging line

    // Original price and offer price calculations
    const originalPrice = 200;
    const offerPrice = 100;
    const tax = 20; // Assuming tax is 20 to make total = 120
    let totalPrice = originalPrice + tax;
    let discount = 0;

    // Check if coupon code matches
    if (couponCode === 'FLAT100') {
        Toastify({
            text: "Coupon added successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50", // Success color
            stopOnFocus: true
        }).showToast();

        // Calculate the reduced amount and update the total price
        discount = originalPrice - offerPrice;
        totalPrice = offerPrice + tax;

        // Update the total price display
        document.getElementById('total-price-1').innerText = totalPrice;

    } else {
        Toastify({
            text: "Incorrect coupon code",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336", // Error color
            stopOnFocus: true
        }).showToast();
    }
});

// PAYMENT

function placeOrder(orderId) {
    // Define sample data for the receipt based on orderId
    const orderData = {
        1: {
            restaurant: "Boomerang",
            address: "RSPURAM | PEELAMEDU | THUDIYALUR",
            items: [
                { sno: 1, name: "Nuttycrunch Icecream", quantity: 1, amount: 150 },
                { sno: 2, name: "DBC", quantity: 1, amount: 200 }
            ],
            tax: 20,
            subtotal: 350 // Subtotal before discount and tax
        },
        2: {
            restaurant: "Frozen Bottle",
            address: "RS PURAM",
            items: [
                { sno: 1, name: "Milkshake", quantity: 1, amount: 120 },
                { sno: 2, name: "Brownie", quantity: 1, amount: 80 }
            ],
            tax: 30,
            subtotal: 200
        },
        3: {
            restaurant: "SS HYDERABAD BIRIYANI",
            address: "Gandhipuram",
            items: [
                { sno: 1, name: "Chicken Biriyani", quantity: 1, amount: 230 },
                { sno: 2, name: "Grill(FULL)", quantity: 1, amount: 400 }
            ],
            tax: 20,
            subtotal: 730
        }
    };

    const order = orderData[orderId];

    // Retrieve the coupon code entered by the user
    const couponCode = document.querySelector('input[placeholder="Coupon Code"]').value.trim();
    console.log("Coupon Code for Order", orderId, ":", couponCode); // Debugging line

    let discount = 0;
    if (couponCode === 'FLAT100') {
        discount = 100; // Apply FLAT100 discount
    }

    // Compute the final total after applying discount and adding tax
    const total = order.subtotal - discount + order.tax;

    // Create the receipt HTML
    let receiptHTML = `
        <div class="receipt">
            <h2>Bill Receipt</h2>
            <p><strong>Restaurant:</strong> ${order.restaurant}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <table border="1" cellpadding="10">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Food Item</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => ` 
                        <tr>
                            <td>${item.sno}</td>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.amount}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Subtotal:</strong></td>
                        <td>₹${order.subtotal}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Discount:</strong></td>
                        <td>-₹${discount}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Tax:</strong></td>
                        <td>₹${order.tax}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                        <td>₹${total}</td>
                    </tr>
                </tbody>
            </table>
            <button onclick="payNow()" style="margin-top: 10px; background-color: rgb(226, 150, 43);">Pay Now</button>
            <!-- Back Button -->
            <button onclick="closeReceipt()" style="margin-top: 10px; background-color: #f44336; color: white;">Back</button>
        </div>
    `;

    // Append the receipt to the body or show in a modal
    const receiptContainer = document.createElement('div');
    receiptContainer.classList.add('receipt-container');
    receiptContainer.innerHTML = receiptHTML;
    document.body.appendChild(receiptContainer);

    // Display a Toastify notification for the restaurant
    Toastify({
        text: `Order placed at ${order.restaurant}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
        stopOnFocus: true
    }).showToast();
}

// Function to close the receipt form and keep the user on the same page
function closeReceipt() {
    const receiptContainer = document.querySelector('.receipt-container');
    if (receiptContainer) {
        receiptContainer.remove(); // Removes the receipt form from the DOM
    }
}

// Update order link navigation to direct user to "Orders.html" with the relevant restaurant page
function navigateToOrderPage(restaurant) {
    const orderUrl = `Orders.html#${restaurant}`;
    window.location.href = orderUrl; // Navigate to the orders page with the restaurant section
}


// Slider


// Function to change the image for each card
function changeSlideForCard(cardIndex) {
    const slides = document.querySelectorAll(`.order-card:nth-child(${cardIndex}) img`); // Get images in the specific card
    let currentSlide = 0;

    // Function to change the image
    function changeSlide() {
        // Hide all images in this specific card
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });
        
        // Show the current slide for this card
        currentSlide = (currentSlide + 1) % slides.length; // Cycle through slides
        slides[currentSlide].style.display = 'block'; // Show the current slide
    }

    // Initial call to display the first image
    changeSlide();

    // Change the image every 3 seconds (3000 milliseconds)
    setInterval(changeSlide, 2000);
}

// Call the function for each order card (assuming 3 cards)
for (let i = 1; i <= 3; i++) {
    changeSlideForCard(i);
}


