/*
    products.js
    Loads supermarket specials from JSON and automatically fetches images
    using Google Custom Search API.
*/

// Replace with your actual API key and Search Engine ID
const apiKey = "AIzaSyAcS9Z8NRho5LiDWdeevD8jRbSspc4ff38";
const cx = "c58aea6b245cc42a3";

// Helper: fetch image from Google Custom Search
function fetchProductImage(query) {
    const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&num=1&key=${apiKey}&cx=${cx}`;

    return fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                return data.items[0].link; // first image result
            }
            return "img/product-1.jpg"; // fallback if no result
        })
        .catch(() => "img/product-1.jpg"); // fallback on error
}

// Load JSON file with products
let http = new XMLHttpRequest();
http.open("get", "./js/novSpecials.json", true);
http.send();

http.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
        const products = JSON.parse(this.responseText);
        const container = document.querySelector(".products");

        if (!container) {
            console.warn('Products container ".products" not found.');
            return;
        }

        // Build product cards asynchronously
        const productPromises = products.map(item => {
            const query = `${item.name} ${item.category}`;
            return fetchProductImage(query).then(imageUrl => {
                return `
                    <div class="product">
                        <img src="${imageUrl}" alt="${item.name}" class="product-img"
                             loading="lazy"
                             onerror="this.onerror=null; this.src='img/product-1.jpg'">
                        <p class="category">${item.category}</p>
                        <p class="name">${item.name}</p>
                        <p class="price"><span>${item.price}</span></p>
                    </div>
                `;
            });
        });

        // Render once all images are resolved
        Promise.all(productPromises).then(cards => {
            container.innerHTML = cards.join("");
        });
    } else if (this.readyState === 4) {
        console.error("Failed to load JSON:", this.status, this.statusText);
    }
};
