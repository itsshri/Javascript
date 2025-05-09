const restaurants = [
    {
      name: 'KFC',
      location: 'Rs Puram',
      description: 'Burger, Crispy Chicken & Rolls',
      rating: '4.1',
      price: '₹200 for one',
      imageUrl: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/12/9/41c8f4e8-8579-4742-a5dd-37a224347a7c_737927.JPG',
    },
    {
      name: 'Pizza Hut',
      location: 'Rs Puram',
      description: 'Pizza, Fries & Coke',
      rating: '4.5',
      price: '₹350 for one',
      imageUrl: 'https://b.zmtcdn.com/data/pictures/chains/5/3000095/9979d1d417e4516c475045031bb9b4b1_o2_featured_v2.jpg?output-format=webp',
    },
    {
      name: 'Dominos Pizza',
      location: 'Rs Puram',
      description: 'Cheese Burst Pizza',
      rating: '4.3',
      price: '₹300 for one',
      imageUrl: 'https://www.dominos.co.in/assets/images/foodItems/pizza.jpg',
    }
];

// Function to display restaurant cards
function displayRestaurants(filteredRestaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = ''; // Clear the list before adding

    filteredRestaurants.forEach(restaurant => {
      const card = document.createElement('div');
      card.classList.add('restaurant-card');

      card.innerHTML = `
        <img src="${restaurant.imageUrl}" alt="${restaurant.name}">
        <div class="restaurant-info">
          <h3>${restaurant.name}</h3>
          <p>Location: ${restaurant.location}</p>
          <p>${restaurant.description}</p>
          <p>Rating: ${restaurant.rating}</p>
          <p>Price: ${restaurant.price}</p>
        </div>
      `;
      restaurantList.appendChild(card);
    });
}

// Initial display of all restaurants
displayRestaurants(restaurants);

// Search function to filter restaurants
function searchRestaurants() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm)
    );
    displayRestaurants(filteredRestaurants);
}
