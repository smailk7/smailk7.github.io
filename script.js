// GANTI DENGAN NOMOR WHATSAPP ANDA (Gunakan format 62...)
const NOMOR_WA = "6281331332840";

// Data Buku Contoh
const DATA_BUKU = [
  {
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    harga: 85000,
    kategori: "Novel",
    gambar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    deskripsi: "Kisah tentang 10 anak di Belitung yang berjuang menggapai cita-cita mereka di tengah keterbatasan.",
    sampel: "Di sebuah sekolah tua di Belitung, Bu Muslimah dan Pak Harfan menunggu sepuluh murid pertama mereka..."
  },
  {
    id: 2,
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    harga: 120000,
    kategori: "Novel",
    gambar: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    deskripsi: "Perjalanan Minke di awal abad ke-20 yang menggambarkan perjuangan melawan penjajahan dan ketidakadilan.",
    sampel: "Minke adalah seorang pemuda pribumi yang berkesempatan mengenyam pendidikan di HBS..."
  },
  {
    id: 3,
    judul: "Filosofi Teras",
    penulis: "Henry Manampiring",
    harga: 98000,
    kategori: "Pengembangan Diri",
    gambar: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    deskripsi: "Panduan filsafat Stoisisme untuk mengatasi emosi negatif dan menghasilkan mental yang tangguh.",
    sampel: "Stoisisme atau Filosofi Teras membantu kita membedakan hal yang bisa kita kendalikan dan tidak..."
  },
  {
    id: 4,
    judul: "Atomic Habits",
    penulis: "James Clear",
    harga: 108000,
    kategori: "Pengembangan Diri",
    gambar: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
    deskripsi: "Perubahan kecil yang memberikan hasil luar biasa dalam membangun kebiasaan baik.",
    sampel: "Perubahan 1% setiap hari dapat membawa dampak besar dalam jangka panjang..."
  }
];

// Manajemen Keranjang
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id) {
  const cart = getCart();
  const book = DATA_BUKU.find(b => b.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }

  saveCart(cart);
  alert(`"${book.judul}" berhasil ditambahkan ke keranjang!`);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = totalItems;
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
