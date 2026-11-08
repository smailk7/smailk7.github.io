
const books = [
    {
        id: 1,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        category: "fiksi",
        price: 95000,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "self-dev",
        price: 108000,
        image: "https://cdn.phototourl.com/member/2026-11-08-24b51640-bcfb-4017-924b-7bed189e848b.jpg"
    },
    {
        id: 3,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "fantasy",
        price: 125000,
        image: "https://cdn.phototourl.com/member/2026-11-08-be8f932b-5c93-43b6-a71e-193c7ba1a01a.jpg"
    },
    {
        id: 4,
        title: "Laut Bercerita",
        author: "Leila S. Chudori",
        category: "fiksi",
        price: 115000,
        image: "https://cdn.phototourl.com/member/2026-11-08-c1e17aa8-1447-4411-9ce1-a243f7c4e71e.jpg"
    }
];

let cart = [];

function renderBooks(filter = 'all') {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? books : books.filter(b => b.category === filter);

    filtered.forEach(book => {
        grid.innerHTML += `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}">
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-price">Rp ${book.price.toLocaleString('id-ID')}</div>
                    <button class="btn-add-cart" onclick="addToCart(${book.id})">
                        <i class="fa-solid fa-cart-plus"></i> Tambah
                    </button>
                </div>
            </div>
        `;
    });
}

function filterBooks(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderBooks(category);
}

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    cart.push(book);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartBody = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-cart-msg">Keranjang belanja Anda masih kosong.</p>';
        document.getElementById('cart-total').innerText = 'Rp 0';
        return;
    }

    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartBody.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                <div>
                    <h4 style="font-size: 0.9rem;">${item.title}</h4>
                    <span style="font-size: 0.8rem; color: #e74c3c;">Rp ${item.price.toLocaleString('id-ID')}</span>
                </div>
                <i class="fa-solid fa-trash" style="color: #e74c3c; cursor: pointer;" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    document.getElementById('cart-total').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCartModal() {
    document.getElementById('cart-modal').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda masih kosong!');
        return;
    }
    
    let text = "Halo, saya mau pesan buku berikut:\n";
    cart.forEach((item, i) => {
        text += `${i + 1}. ${item.title} - Rp ${item.price.toLocaleString('id-ID')}\n`;
    });
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Initial render
renderBooks();
