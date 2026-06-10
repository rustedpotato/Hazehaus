document.addEventListener('DOMContentLoaded', function() {
  // --- PRODUCT DATA & RENDERING ---
  // This is a list of your products. You can easily add, remove, or edit them here.
  const products = [
    { name: 'Yin & Yang Handbag', category: 'accessories', price: '3299', image: 'balckwhite.jpg', description: 'A stylish black and white yin-yang themed crochet handbag, perfect for everyday use.' },
    { name: 'Ruby Noir Handbag', category: 'accessories', price: '3299', image: 'redbalck.jpg', description: 'Elegant red and black crochet handbag, a bold statement piece for your collection.' },
    { name: 'Azure Tote Bag', category: 'accessories', price: '2999', image: 'bluewhite.jpg', description: 'A spacious blue and white tote bag, ideal for shopping or a day out.' },
    { name: 'Sweetheart Headband', category: 'apparel', price: '999', image: 'rosee.jpg', description: 'A cute and comfy crochet headband with a sweetheart design.' },
    { name: 'Sunny Keychain', category: 'amigurumi', price: '499', image: 'sunflower.jpg', description: 'A cheerful sunflower amigurumi keychain to brighten your day.' },
    { name: 'Coasters', category: 'accessories', price: '1499', image: 'coasters.jpg', description: 'A modern monochrome crochet shoulder bag for a chic look.' },
    { name: 'Flowery Bandana', category: 'accessories', price: '599', image: 'hairband.jpg', description: 'A floral crochet bandana, perfect for spring and summer.' },
    { name: 'The Santorini Tote', category: 'accessories', price: '2999', image: 'bluewhite1.jpg', description: 'Inspired by Santorini, this blue and white tote is both beautiful and practical.' },
    { name: 'Flower Bouquet', category: 'apparel', price: '2999', image: 'bouqet.jpg', description: 'A sweet symbol of love and friendship for your dear ones.' },
    { name: 'Sunflower', category: 'apparel', price: '999', image: 'sunflower3.jpg', description: 'A beautiful bouquet of crochet sunflowers.' },
    { name: 'Daisy Hairband', category: 'apparel', price: '999', image: 'hairband3.jpg', description: 'A charming hairband adorned with crochet daisies.' },
    { name: 'Mixed Flower Flock', category: 'apparel', price: '1999', image: 'flockofflowers2.jpg', description: 'A vibrant collection of various crochet flowers.' },
    { name: 'Classic Hair Bow', category: 'apparel', price: '299', image: 'bow1.jpg', description: 'A timeless and elegant crochet hair bow.' },
    { name: 'Clothing for the table?', category: 'apparel', price: '999', image: 'chatai2.jpg', description: '' },
    { name: 'Black Magic', category: 'apparel', price: '299', image: 'bindi.jpg', description: '' },
    { name: 'Flow of love!', category: 'apparel', price: '299', image: 'sunflow.jpg', description: '' },
    { name: 'Just what you need', category: 'apparel', price: '299', image: 'sunflower2.jpg', description: '' },
    { name: 'A bit of yellow', category: 'apparel', price: '299', image: 'bow.jpg', description: '' },
  ];
// Ensure this runs after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... your other code ...

    // Buy Now modal button - redirect to purchase.html
    var modalBuyNow = document.getElementById('modal-buy-now');
    if (modalBuyNow) {
        modalBuyNow.addEventListener('click', function() {
            window.location.href = 'purchase.html';
        });
    }

    // ... your other code ...
});

document.getElementById('checkout-btn').addEventListener('click', function() {
  window.location.href = 'purchase.html';
});

  const productsGrid = document.querySelector('.products-grid');

  // --- CART STATE ---
  let cart = [];
  const cartCountElement = document.getElementById('cart-count');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCloseBtn = document.querySelector('.cart-close-btn'); // More specific selector
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartOverlay = document.getElementById('cart-overlay');

  // Function to get the currently active filter
  function getActiveFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.dataset.filter : 'all';
  }

  function updateCartCount() {
    cartCountElement.textContent = cart.length;
    cartCountElement.classList.toggle('active', cart.length > 0);
  }

  function updateCartSidebar() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
      cartTotalElement.textContent = '';
      return;
    }
    let total = 0;
    cart.forEach((item, idx) => {
      total += parseInt(item.price);
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
        </div>
        <button class="cart-remove-btn" data-index="${idx}" aria-label="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
    cartTotalElement.textContent = `Total: ₹${total}`;
  }

  function openCartSidebar() {
    cartOverlay.style.display = 'flex';
    setTimeout(() => cartSidebar.classList.add('active'), 10);
  }
  
  function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    setTimeout(() => cartOverlay.style.display = 'none', 300); // Increased timeout for smoother transition
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCartSidebar);
  }
  document.querySelectorAll('[aria-label="Shopping Cart"]').forEach(btn => {
    btn.addEventListener('click', openCartSidebar);
  });

  cartOverlay.addEventListener('click', function(e) {
    if (e.target === cartOverlay) closeCartSidebar();
  });

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartOverlay.style.display !== 'none') {
      closeCartSidebar();
    }
  });

  cartItemsContainer.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('.cart-remove-btn');
    if (removeBtn) {
      const idx = removeBtn.dataset.index;
      cart.splice(idx, 1);
      updateCartCount();
      updateCartSidebar();
      renderProducts(getActiveFilter()); // Use active filter
      renderSearchResults(searchInput.value);
    }
  });

  checkoutBtn.addEventListener('click', function() {
    alert('Checkout is not implemented in this demo.');
  });

  // --- PRODUCT MODAL LOGIC ---
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalProductImage = document.getElementById('modal-product-image');
  const modalProductName = document.getElementById('modal-product-name');
  const modalProductCategory = document.getElementById('modal-product-category');
  const modalProductPrice = document.getElementById('modal-product-price');
  const modalProductDescription = document.getElementById('modal-product-description');
  const modalAddToCart = document.getElementById('modal-add-to-cart');
  const modalBuyNow = document.getElementById('modal-buy-now');
  let currentModalProduct = null;
  let modalContext = 'main'; 

  function openProductModal(product, context = 'main') {
    currentModalProduct = product;
    modalContext = context;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalProductCategory.textContent = product.category;
    modalProductPrice.textContent = `₹${product.price}`;
    modalProductDescription.textContent = product.description;

    modalAddToCart.style.display = 'inline-block';
    modalBuyNow.style.display = 'inline-block';

    productModal.style.display = 'flex';
    setTimeout(() => productModal.classList.add('active'), 10);
  }
  
  function closeProductModal() {
    productModal.classList.remove('active');
    setTimeout(() => {
      productModal.style.display = 'none';
    }, 200);
  }

  modalCloseBtn.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });

  modalAddToCart.addEventListener('click', function() {
    if (!cart.some(item => item.name === currentModalProduct.name)) {
      cart.push(currentModalProduct);
      updateCartCount();
      updateCartSidebar();
      renderProducts(getActiveFilter()); // Use active filter
      renderSearchResults(searchInput.value);
    }
    closeProductModal();
  });

  modalBuyNow.addEventListener('click', function() {
    if (!cart.some(item => item.name === currentModalProduct.name)) {
      cart.push(currentModalProduct);
      updateCartCount();
      updateCartSidebar();
      renderProducts(getActiveFilter()); // Use active filter
      renderSearchResults(searchInput.value);
    }
    closeProductModal();
    openCartSidebar();
  });

  // --- SEARCH OVERLAY ---
  const searchBtn = document.getElementById('search-btn');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.querySelector('.search-input');
  
  searchOverlay.style.zIndex = '3000';

  const openSearch = () => {
    if (cartSidebar.classList.contains('active')) {
      closeCartSidebar();
    }
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 300);
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      document.getElementById('hamburger').classList.remove('active');
      mobileMenu.classList.remove('active');
    }
    searchInput.value = '';
    renderSearchResults('');
  }

  const closeSearch = () => {
    searchOverlay.classList.remove('active');
    searchInput.blur();
  }

  searchBtn.addEventListener('click', openSearch);
  mobileSearchBtn.addEventListener('click', openSearch);
  searchCloseBtn.addEventListener('click', closeSearch);

  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    if ((e.key === '/' && activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA') || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  let searchResultsContainer = searchOverlay.querySelector('.search-results');
  if (!searchResultsContainer) {
    searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    const grid = document.createElement('div');
    grid.className = 'products-grid search-products-grid';
    searchResultsContainer.appendChild(grid);
    searchOverlay.querySelector('.search-content').appendChild(searchResultsContainer);
  }
  const searchGrid = searchResultsContainer.querySelector('.products-grid');

  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  function renderSearchResults(query) {
    const trimmed = query.trim().toLowerCase();
    
    // Clear previous content but keep the grid container
    searchGrid.innerHTML = '';
    
    let placeholder = searchResultsContainer.querySelector('.search-placeholder');
    let noResults = searchResultsContainer.querySelector('.no-results');

    if (placeholder) placeholder.remove();
    if (noResults) noResults.remove();
    
    if (!trimmed) {
      searchResultsContainer.insertAdjacentHTML('afterbegin', '<div class="search-placeholder">Type to search for creations...</div>');
      return;
    }
    
    const matches = products.filter(p => p.name.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed));

    if (matches.length === 0) {
      searchResultsContainer.insertAdjacentHTML('afterbegin', '<div class="no-results">No creations found.</div>');
      return;
    }

    searchGrid.innerHTML = matches.map((product, index) => {
      const inCart = cart.some(item => item.name === product.name);
      return `
        <div class="product-card fade-in visible" data-category="${product.category}" style="transition-delay: ${index * 50}ms">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            ${inCart ? '<span class="heart-icon">&#10084;</span>' : ''}
          </div>
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h4 class="product-name">${highlightMatch(product.name, trimmed)}</h4>
            <p class="product-price">₹${product.price}</p>
            ${inCart ? '<span class="in-cart-label">In Cart</span>' : '<button class="btn add-to-cart-btn">Add to Cart</button>'}
          </div>
        </div>
      `;
    }).join('');
  }
  
  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.replace(regex, '<mark>$1</mark>');
  }

  document.body.addEventListener('click', function(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const productNameEl = card.querySelector('.product-name');
    if (!productNameEl) return;
      
    const name = productNameEl.textContent;
    const product = products.find(p => p.name === name);
    if (!product) return;
    
    if (e.target.classList.contains('add-to-cart-btn')) {
      if (!cart.some(item => item.name === product.name)) {
        cart.push(product);
        updateCartCount();
        updateCartSidebar();
        renderProducts(getActiveFilter()); // Use active filter
        renderSearchResults(searchInput.value);
      }
    } else if (e.target.classList.contains('remove-from-cart-btn')) {
       // This button is on the main page, not in search results
       const idx = cart.findIndex(item => item.name === name);
       if (idx !== -1) {
         cart.splice(idx, 1);
         updateCartCount();
         updateCartSidebar();
         renderProducts(getActiveFilter()); // Use active filter
         renderSearchResults(searchInput.value);
       }
    } else {
      // Clicked on the card itself, not a button
      const context = card.closest('.search-overlay') ? 'search' : 'main';
      openProductModal(product, context);
    }
  });


  function renderProducts(filter = 'all') {
    if (!productsGrid) return; // Guard clause
    productsGrid.innerHTML = '';
    const filteredProducts = filter === 'all' 
      ? products 
      : products.filter(p => p.category === filter);

    filteredProducts.forEach((product, index) => {
      const inCart = cart.some(item => item.name === product.name);
      const productCard = document.createElement('div');
      productCard.className = 'product-card fade-in';
      productCard.setAttribute('data-category', product.category);
      productCard.style.transitionDelay = `${index * 50}ms`;
      productCard.innerHTML = `
        <div class="product-image-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          ${inCart ? '<span class="heart-icon">&#10084;</span>' : ''}
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h4 class="product-name">${product.name}</h4>
          <p class="product-price">₹${product.price}</p>
          ${inCart ? '<span class="in-cart-label">In Cart</span>' : '<button class="btn add-to-cart-btn">Add to Cart</button>'}
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
    
    // Animate new cards into view
    setTimeout(() => {
      const cards = productsGrid.querySelectorAll('.fade-in');
      cards.forEach(card => card.classList.add('visible'));
    }, 10);
  }

  // --- PRODUCT FILTERING ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderProducts(button.dataset.filter);
    });
  });

  // --- SPLASH SCREEN ANIMATION ---
  (function() {
    const splashScreen = document.getElementById('splash-screen');
    const body = document.body;

    if (!splashScreen) {
        // If no splash screen, run initial renders immediately
        renderProducts();
        updateCartCount();
        updateCartSidebar();
        return;
    }

    body.classList.add('splash-active');
    const totalDuration = 4500;

    setTimeout(() => {
      splashScreen.classList.add('open');
    }, 3500);

    setTimeout(() => {
      splashScreen.style.transition = 'opacity 0.5s';
      splashScreen.style.opacity = '0';
      body.classList.remove('splash-active');

      setTimeout(() => {
        splashScreen.remove();
        renderProducts();
        updateCartCount();
        updateCartSidebar();
      }, 500);

    }, totalDuration);
  })();
  
  // --- SCROLL-BASED ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header, .feature-card, .testimonial-card, .creator-card').forEach(el => observer.observe(el));

  // --- CUSTOM ORDERS LINK ---
  const customOrdersLink = document.getElementById('custom-orders-link');
  if (customOrdersLink) {
    customOrdersLink.addEventListener('click', function(event) {
      event.preventDefault(); 
      alert('For custom orders, please get in touch with us directly via Instagram or Email. We would be happy to create something unique for you!');
    });
  }
});