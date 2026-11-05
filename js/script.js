document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi ikon Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // Load Data dari products.json
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      initApp(data);
    })
    .catch(error => console.error('Error loading products.json:', error));
});

function initApp(data) {
  const colorPickerContainer = document.getElementById('color-picker');
  const shoesImg = document.getElementById('shoes-image');
  const variantBadge = document.getElementById('variant-badge');
  const variantName = document.getElementById('variant-name');
  const detailsList = document.getElementById('product-details-list');
  const featuresGrid = document.getElementById('features-grid');

  // Render Swatch Warna Sepatu
  data.colorVariants.forEach((variant, index) => {
    const btn = document.createElement('button');
    btn.className = `color-swatch-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="color-circle" style="background: ${variant.hexPrimary}"></span>
      <span>${variant.name.split(' ')[0]}</span>
    `;

    btn.addEventListener('click', () => {
      // Toggle active class
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update tampilan produk
      shoesImg.src = variant.imagePlaceholder;
      variantBadge.textContent = variant.badge;
      variantName.textContent = variant.name;
    });

    colorPickerContainer.appendChild(btn);
  });

  // Render Detail Produk
  data.productDetails.forEach(detail => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${detail.title}:</strong> ${detail.desc}`;
    detailsList.appendChild(li);
  });

  // Render Keunggulan Utama
  data.features.forEach(feat => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `
      <div class="feature-icon">
        <i data-lucide="${feat.icon}"></i>
      </div>
      <h4>${feat.title}</h4>
      <p style="font-size:0.85rem; color:#8b949e; margin-top:5px;">${feat.desc}</p>
    `;
    featuresGrid.appendChild(card);
  });

  // Refresh icons setelah rendering dinamis
  if (window.lucide) {
    lucide.createIcons();
  }
}
