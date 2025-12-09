
// Products Data
// Ganti 'URL_GAMBAR_ANDA' dengan URL gambar produk Anda
const products = {
    unisex: [
        { id: 1, name: 'Velixir Essence', desc: 'Aroma segar dan clean, kombinasi citrus dan bunga ringan.', price: 350000, image: 'https://down-id.img.susercontent.com/file/id-11134207-7rbk0-m6jgznonp9b548.webp' },
        { id: 2, name: 'Velixir Bloom', desc: 'Aroma floral mewah, dominan mawar dan melati, dengan sentuhan musk lembut.', price: 380000, image: 'https://down-id.img.susercontent.com/file/id-11134207-81zte-mf57uh8fi39mef.webp' },
        { id: 3, name: 'Velixir Noir', desc: 'Aroma misterius dan sensual, perpaduan oud, kayu gelap, dan sedikit vanila.', price: 420000, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400' },
        { id: 4, name: 'Velixir Ombre', desc: 'Aroma hangat dan sophisticated dengan sentuhan amber dan spice.', price: 390000, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400' }
    ],
    men: [
        { id: 5, name: 'Velixir Eden', desc: 'Fresh dan natural dengan green notes yang menyegarkan.', price: 400000, image: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=400' },
        { id: 6, name: 'Velixir Sol', desc: 'Warm dan energetic dengan citrus dan woody notes.', price: 410000, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' },
        { id: 7, name: 'Velixir Night', desc: 'Deep dan masculine dengan leather dan tobacco.', price: 450000, image: 'https://i.pinimg.com/1200x/af/d6/6f/afd66fe886b2bdb4d43cb6deaa55ec8f.jpg' },
        { id: 8, name: 'Velixir Frost', desc: 'Cool dan refreshing dengan aquatic notes.', price: 395000, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400' }
    ],
    women: [
        { id: 9, name: 'Velixir Rose', desc: 'Romantic dan elegant dengan rose dan peony.', price: 385000, image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400' },
        { id: 10, name: 'Velixir Garden', desc: 'Fresh floral dengan jasmine dan lily.', price: 375000, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400' },
        { id: 11, name: 'Velixir Infinity', desc: 'Sweet dan powdery dengan vanilla dan musk.', price: 405000, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' },
        { id: 12, name: 'Velixir Eclipse', desc: 'Dark floral dengan patchouli dan sandalwood.', price: 425000, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400' }
    ]
};

let cart = [];

// Render Products
function renderProducts() {
    renderCategory('unisex', 'unisexProducts');
    renderCategory('men', 'menProducts');
    renderCategory('women', 'womenProducts');
}

function renderCategory(category, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = products[category].map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <button class="buy-btn" onclick="addToCart(${product.id})">Beli</button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const allProducts = [...products.unisex, ...products.men, ...products.women];
    const product = allProducts.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Keranjang kosong</div>';
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        </svg>
                    </button>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <div style="font-weight: bold;">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</div>
                </div>
            </div>
        `).join('');
        
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        document.getElementById('totalPrice').textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
        cartTotal.style.display = 'block';
    }
}

// Update Quantity
function updateQty(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle Cart
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    overlay.classList.toggle('active');
    sidebar.classList.toggle('active');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Initialize
renderProducts();