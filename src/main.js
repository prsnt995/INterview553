import './style.css';
import { 
  BRAND_DATA, 
  CATEGORIES, 
  STORIES, 
  PRODUCTS, 
  INITIAL_COMMENTS, 
  BOUTIQUE_LOCATIONS, 
  HERITAGE_DATA, 
  FAQS 
} from './data.js';

// LocalStorage Persistence Helpers
function loadCart() {
  try {
    const saved = localStorage.getItem('interview553_cart');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [{ productId: 13408642750, quantity: 1, color: '버건디', size: 'FREE' }];
}

function saveCart(cart) {
  try {
    localStorage.setItem('interview553_cart', JSON.stringify(cart));
  } catch (e) {}
}

function loadWishlist() {
  try {
    const saved = localStorage.getItem('interview553_wishlist');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [13408642750, 13408642752];
}

function saveWishlist(list) {
  try {
    localStorage.setItem('interview553_wishlist', JSON.stringify(list));
  } catch (e) {}
}

// Global Application State
const state = {
  // Navigation & Views
  currentView: 'editorial', // 'editorial' | 'catalog' | 'heritage' | 'stores'
  currentCategory: 'all',   // 'all' | 'new' | 'bag' | 'apparel' | 'acc'
  catalogSort: 'featured',  // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  
  // Editorial Story
  currentStoryId: 5003015429,
  userLikedStory: false,
  storyLikes: 482,
  
  // Cart & Wishlist
  cart: loadCart(),
  wishlist: loadWishlist(),
  
  // Product Detail Modal (PDP)
  selectedProductId: null,
  selectedColor: null,
  selectedSize: null,
  selectedQuantity: 1,
  activePdpTab: 'spec', // 'spec' | 'delivery' | 'care'
  
  // Modals & Drawers
  activeModal: null, // 'cart' | 'wishlist' | 'pdp' | 'checkout' | 'orderConfirmation' | 'search' | 'boutique' | 'cs' | 'account' | 'share' | 'lightbox'
  lightboxImage: null,
  
  // Checkout & Ordering
  couponCode: '',
  couponApplied: false,
  discountRate: 0,
  paymentMethod: 'card',
  lastOrder: null,
  
  // Live Search
  searchQuery: '',
  
  // Boutique Locator
  selectedStoreId: 'flagship',
  
  // Client Service & FAQ
  activeFaqIndex: 0,
  trackingQuery: '',
  trackingResult: null,
  
  // VIP Account Lounge
  userAccount: {
    name: "김민지 고객님",
    tier: "NOIR VIP MEMBER",
    mileage: 128500,
    couponsCount: 2,
    recentOrders: [
      { id: "IV553-2026-8841", date: "2026.09.28", item: "Interview553 아다라 크로스 바디백 M", status: "배송완료", price: "990,000원" }
    ]
  },
  
  // Comments
  comments: [...INITIAL_COMMENTS]
};

// Price & Number Formatting
function formatPrice(num) {
  return new Intl.NumberFormat('ko-KR').format(num) + '원';
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  container.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a880" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;
  container.classList.add('show');
  setTimeout(() => {
    container.classList.remove('show');
  }, 2800);
}

// Main Render Function
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const currentStory = STORIES.find(s => s.id === state.currentStoryId) || STORIES[0];
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = state.cart.reduce((sum, item) => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  app.innerHTML = `
    <!-- Top Brand Header -->
    <header class="aigner-main-header">
      <div class="header-inner">
        <!-- Left Tools -->
        <div class="header-left-tools">
          <button class="header-tool-btn" id="btn-search-trigger" title="실시간 검색">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span>SEARCH</span>
          </button>
          <button class="header-tool-btn" id="btn-wishlist-trigger" title="위시리스트">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${state.wishlist.length > 0 ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>WISHLIST</span>
            ${state.wishlist.length > 0 ? `<span class="bag-count-pill" style="background:var(--aigner-burgundy);">${state.wishlist.length}</span>` : ''}
          </button>
        </div>

        <!-- Center Brand Identity -->
        <div class="brand-identity-center" id="btn-brand-home" title="홈으로 이동">
          <div class="brand-header-logo-frame">
            <img src="${BRAND_DATA.logoBlack}" alt="Interview553" class="brand-header-logo-img" />
          </div>
          <span class="brand-city-est">OFFICIAL ONLINE BOUTIQUE · FW26</span>
        </div>

        <!-- Right Actions -->
        <div class="header-right-actions">
          <button class="boutique-club-badge" id="btn-boutique-club" title="VIP 혜택 보기">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>INTERVIEW553 CLUB (10% OFF)</span>
          </button>
          <button class="header-tool-btn" id="btn-account-trigger" title="VIP 라운지">
            <span>VIP LOUNGE</span>
          </button>
          <button class="bag-trigger-btn" id="btn-open-bag" title="쇼핑백 열기">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span>BAG</span>
            ${totalCartCount > 0 ? `<span class="bag-count-pill">${totalCartCount}</span>` : ''}
          </button>
        </div>
      </div>
    </header>

    <!-- Primary Navigation Menu Bar (Sticky) -->
    <nav class="aigner-nav-bar" aria-label="메인 카테고리 네비게이션">
      <div class="nav-bar-content">
        <button class="nav-category-link ${state.currentView === 'catalog' && state.currentCategory === 'new' ? 'active' : ''}" data-nav-target="catalog" data-nav-cat="new">NEW ARRIVALS</button>
        <button class="nav-category-link ${state.currentView === 'catalog' && state.currentCategory === 'bag' ? 'active' : ''}" data-nav-target="catalog" data-nav-cat="bag">BAGS & LEATHER</button>
        <button class="nav-category-link ${state.currentView === 'catalog' && state.currentCategory === 'apparel' ? 'active' : ''}" data-nav-target="catalog" data-nav-cat="apparel">APPAREL & COATS</button>
        <button class="nav-category-link ${state.currentView === 'catalog' && state.currentCategory === 'acc' ? 'active' : ''}" data-nav-target="catalog" data-nav-cat="acc">ACCESSORIES</button>
        <button class="nav-category-link ${state.currentView === 'catalog' && state.currentCategory === 'all' ? 'active' : ''}" data-nav-target="catalog" data-nav-cat="all">ALL COLLECTIONS</button>
        <button class="nav-category-link ${state.currentView === 'editorial' ? 'active' : ''}" data-nav-target="editorial">EDITORIALS & STORIES</button>
        <button class="nav-category-link ${state.currentView === 'heritage' ? 'active' : ''}" data-nav-target="heritage">THE WORLD OF INTERVIEW553</button>
      </div>
    </nav>

    <!-- Dynamic Main View Container -->
    ${renderCurrentView(currentStory, totalCartCount)}

    <!-- Global Boutique Footer -->
    ${renderFooter()}

    <!-- Mobile Quick Bottom Navigation Bar -->
    ${renderMobileBottomNav(totalCartCount)}
  `;

  renderModals(totalCartPrice);
  attachEvents();
}

// Render Active View (Editorial vs Catalog vs Heritage)
function renderCurrentView(currentStory, totalCartCount) {
  if (state.currentView === 'catalog') {
    return renderCatalogView();
  }
  if (state.currentView === 'heritage') {
    return renderHeritageView();
  }
  return renderEditorialView(currentStory, totalCartCount);
}

// 1. Editorial Campaign View (FW26 Sooyoung PICK)
function renderEditorialView(currentStory, totalCartCount) {
  const storyProducts = PRODUCTS.filter(p => currentStory.featuredProductIds.includes(p.id));

  return `
    <main class="boutique-main-story">
      <!-- Breadcrumb -->
      <nav class="boutique-breadcrumb" aria-label="브레드크럼">
        <a href="#" id="breadcrumb-home">HOME</a>
        <span>/</span>
        <a href="#" id="breadcrumb-editorials">EDITORIALS</a>
        <span>/</span>
        <span style="color:var(--aigner-black); font-weight:800;">${currentStory.title}</span>
      </nav>


      <!-- Two-Column Editorial & Sticky Sidebar Layout -->
      <div class="editorial-grid-layout">
        <!-- Main Editorial Column -->
        <div class="editorial-canvas-col">
          <!-- Hero LCP Image -->
          <div class="canvas-hero-frame">
            <img 
              src="${currentStory.coverImage}" 
              alt="${currentStory.title}" 
              fetchpriority="high"
              width="880"
              class="zoomable-boutique-image"
              title="클릭 시 고화질 확대"
            />
          </div>

          <!-- Editorial Long Scroll with Shoppable Hotspot Pins -->
          <div class="canvas-scroll-frame">
            <img 
              src="${currentStory.detailImage}" 
              alt="${currentStory.title} 컬렉션 화보" 
              loading="lazy"
              width="880"
              class="zoomable-boutique-image"
              title="클릭 시 고화질 확대"
            />

            <!-- Interactive Shoppable Pins -->
            ${currentStory.hotspots ? currentStory.hotspots.map(spot => {
              const prod = PRODUCTS.find(p => p.id === spot.productId);
              return `
                <div class="shoppable-hotspot-pin" style="top:${spot.top}; left:${spot.left};" data-pin-id="${spot.id}">
                  <button class="hotspot-icon-btn" title="${spot.title} 착용 상품 보기">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                  </button>
                  <div class="hotspot-hover-preview">
                    ${prod ? `
                      <div class="hover-preview-thumb">
                        <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
                      </div>
                      <div class="hover-preview-title">${prod.name}</div>
                      <div class="hover-preview-bottom">
                        <span class="hover-preview-price">${formatPrice(prod.price)}</span>
                        <button class="hover-preview-add-btn" data-boutique-open-pdp="${prod.id}">상세보기</button>
                      </div>
                    ` : `
                      <div class="hover-preview-title">${spot.title}</div>
                      <span class="hover-preview-price">${spot.price}</span>
                    `}
                  </div>
                </div>
              `;
            }).join('') : ''}
          </div>

          <!-- Campaign Statement Box -->
          <div class="campaign-narrative-card">
            <div class="narrative-tagline">INTERVIEW553 · FW26 COLLECTION EDITORIAL</div>
            <p class="narrative-body-text">${currentStory.introText}</p>
            <div class="narrative-tags-container">
              ${currentStory.tags.map(tag => `<span class="narrative-tag-chip">${tag}</span>`).join('')}
            </div>
          </div>

          <!-- Social Reactions Bar -->
          <div class="editorial-reaction-bar">
            <div class="reaction-left-group">
              <button class="boutique-like-btn ${state.userLikedStory ? 'liked' : ''}" id="btn-boutique-like">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${state.userLikedStory ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span>LOVE ${state.storyLikes}</span>
              </button>
              <button class="boutique-action-btn" id="btn-scroll-comments">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span>COMMENTS (${state.comments.length})</span>
              </button>
            </div>
            <button class="boutique-action-btn" id="btn-share-trigger-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>SHARE EDITORIAL</span>
            </button>
          </div>
        </div>

        <!-- Sticky Right Sidebar (Curated Pieces) -->
        <aside class="boutique-sticky-sidebar">
          <div class="sidebar-boutique-card">
            <div class="sidebar-card-title">
              <span>FEATURED IN THIS EDITORIAL</span>
              <span style="color:var(--aigner-burgundy); font-size:12px;">${storyProducts.length} ITEMS</span>
            </div>
            <div class="sidebar-item-list">
              ${storyProducts.slice(0, 4).map(prod => `
                <div class="sidebar-product-row">
                  <div class="sidebar-thumb-frame" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">
                    <img src="${prod.image}" alt="${prod.name}" />
                  </div>
                  <div class="sidebar-meta-col">
                    <div class="sidebar-item-name" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">${prod.name}</div>
                    <div class="sidebar-item-price">${formatPrice(prod.price)}</div>
                  </div>
                  <button class="sidebar-bag-add-btn" data-boutique-open-pdp="${prod.id}" title="상세보기">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </button>
                </div>
              `).join('')}
            </div>
            <button class="sidebar-bag-cta" id="btn-sidebar-view-bag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>VIEW SHOPPING BAG (${totalCartCount})</span>
            </button>
          </div>

          <button class="sidebar-top-btn" id="btn-scroll-top">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
            <span>BACK TO TOP</span>
          </button>
        </aside>
      </div>

      <!-- Pieces from the Editorial (4-Column Luxury Grid) -->
      <section class="boutique-pieces-section" id="products-section">
        <div class="boutique-section-heading">
          <div class="section-title-wrap">
            <h2 class="section-primary-title">PIECES FROM THE EDITORIAL</h2>
            <span class="section-pieces-counter">${storyProducts.length} PIECES</span>
          </div>
          <button class="category-pill-btn" id="btn-view-all-catalog">전체 컬렉션 보기 →</button>
        </div>

        <div class="boutique-product-grid">
          ${storyProducts.map(prod => renderProductCard(prod)).join('')}
        </div>
      </section>

      <!-- Client Reviews & Voices Section -->
      <section class="boutique-comments-section" id="comments-section">
        <div class="boutique-section-heading">
          <div class="section-title-wrap">
            <h2 class="section-primary-title">CLIENT REVIEWS & VOICES</h2>
            <span class="section-pieces-counter">${state.comments.length}</span>
          </div>
          <span style="font-size:12px; color:var(--lux-text-muted); font-weight:600;">LATEST REVIEWS</span>
        </div>

        <!-- Add Review Form -->
        <form class="boutique-comment-form" id="boutique-comment-form">
          <div class="comment-input-top-row">
            <span style="font-size:13px; font-weight:800; letter-spacing:0.5px;">NAME / NICKNAME:</span>
            <input 
              type="text" 
              class="comment-nickname-input" 
              id="comment-author-input" 
              placeholder="고객명" 
              value="Interview553 VIP"
              maxlength="15"
            />
          </div>
          <textarea 
            class="comment-main-textarea" 
            id="comment-text-input" 
            placeholder="Interview553 FW26 수영 컬렉션에 대한 고견과 감상을 남겨주세요." 
            required
          ></textarea>
          <div class="comment-form-footer">
            <span style="font-size:12px; color:var(--lux-text-muted);">품격 있는 소통을 지향합니다.</span>
            <button type="submit" class="comment-submit-button">SUBMIT COMMENT</button>
          </div>
        </form>

        <!-- Reviews List -->
        <div class="boutique-reviews-list">
          ${state.comments.map(c => `
            <div class="review-card-item ${c.isOfficial ? 'official-boutique' : ''}">
              <div class="review-avatar-frame">
                ${c.isOfficial ? `<img src="${BRAND_DATA.logoWhite}" style="background:#111; padding:2px;" alt="" />` : c.author.slice(0, 1).toUpperCase()}
              </div>
              <div class="review-content-col">
                <div class="review-header-line">
                  <div class="reviewer-name">
                    <span>${c.author}</span>
                    ${c.isOfficial ? `<span class="official-stamp">INTERVIEW553 OFFICIAL</span>` : ''}
                  </div>
                  <span class="review-date-text">${c.date}</span>
                </div>
                <div class="review-text-paragraph">${c.content}</div>
                <div class="review-footer-actions">
                  <button class="review-like-btn ${c.isLiked ? 'liked' : ''}" data-like-comment="${c.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="${c.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    <span>LIKE ${c.likes}</span>
                  </button>
                  ${c.isCustomUser ? `<button class="review-delete-btn" data-delete-comment="${c.id}">DELETE</button>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- More from Interview553 Stories (4-Column Grid) -->
      <section class="boutique-more-stories">
        <div class="boutique-section-heading">
          <div class="section-title-wrap">
            <h2 class="section-primary-title">MORE FROM INTERVIEW553 STORIES</h2>
          </div>
        </div>

        <div class="stories-card-grid">
          ${STORIES.map(s => `
            <div class="story-browse-card ${s.id === state.currentStoryId ? 'current' : ''}" data-switch-story-id="${s.id}">
              <div class="story-thumbnail-frame">
                <img src="${s.coverImage}" alt="${s.title}" loading="lazy" />
                <span class="story-topic-badge">${s.badge}</span>
              </div>
              <div class="story-browse-body">
                <h3 class="story-browse-title">${s.title}</h3>
                <div class="story-browse-meta">
                  <span>${s.regDate}</span>
                  <span>VIEWS ${s.readCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </main>
  `;
}

// 2. Collection Catalog View
function renderCatalogView() {
  let filtered = [...PRODUCTS];

  // Category Filtering
  if (state.currentCategory === 'new') {
    filtered = filtered.filter(p => p.badge.includes('NEW') || p.badge.includes('SOOYOUNG'));
  } else if (state.currentCategory === 'bag') {
    filtered = filtered.filter(p => p.category === 'BAGS');
  } else if (state.currentCategory === 'apparel') {
    filtered = filtered.filter(p => p.category === 'APPAREL');
  } else if (state.currentCategory === 'acc') {
    filtered = filtered.filter(p => p.category === 'ACCESSORIES');
  }

  // Sorting
  if (state.catalogSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.catalogSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.catalogSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return `
    <main class="catalog-view-section">
      <div class="catalog-header-bar">
        <div class="catalog-title-row">
          <div>
            <h1 class="catalog-main-title">COLLECTIONS & ATELIER</h1>
            <p style="font-size:13px; color:var(--lux-text-muted); margin-top:4px;">INTERVIEW553 FW26 PERFECTION</p>
          </div>
          <span style="font-size:13px; font-weight:700; color:var(--lux-text-secondary);">${filtered.length} PRODUCTS</span>
        </div>

        <div class="catalog-filter-controls">
          <div class="category-filter-pills">
            <button class="category-pill-btn ${state.currentCategory === 'all' ? 'active' : ''}" data-cat-pill="all">ALL PIECES (${PRODUCTS.length})</button>
            <button class="category-pill-btn ${state.currentCategory === 'new' ? 'active' : ''}" data-cat-pill="new">NEW IN</button>
            <button class="category-pill-btn ${state.currentCategory === 'bag' ? 'active' : ''}" data-cat-pill="bag">BAGS & LEATHER</button>
            <button class="category-pill-btn ${state.currentCategory === 'apparel' ? 'active' : ''}" data-cat-pill="apparel">APPAREL & COATS</button>
            <button class="category-pill-btn ${state.currentCategory === 'acc' ? 'active' : ''}" data-cat-pill="acc">ACCESSORIES</button>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <label for="catalog-sort" style="font-size:12px; font-weight:800; color:var(--lux-text-muted);">SORT BY:</label>
            <select id="catalog-sort" class="sort-select-dropdown">
              <option value="featured" ${state.catalogSort === 'featured' ? 'selected' : ''}>추천순 (FEATURED)</option>
              <option value="price-asc" ${state.catalogSort === 'price-asc' ? 'selected' : ''}>가격 낮은순 (PRICE LOW)</option>
              <option value="price-desc" ${state.catalogSort === 'price-desc' ? 'selected' : ''}>가격 높은순 (PRICE HIGH)</option>
              <option value="rating" ${state.catalogSort === 'rating' ? 'selected' : ''}>평점순 (TOP RATED)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="boutique-product-grid">
        ${filtered.map(prod => renderProductCard(prod)).join('')}
      </div>
    </main>
  `;
}

// 3. Heritage & About View
function renderHeritageView() {
  return `
    <main class="heritage-view-section">
      <div class="heritage-hero-banner">
        <h1 class="heritage-hero-title">${HERITAGE_DATA.title}</h1>
        <div class="heritage-hero-sub">${HERITAGE_DATA.subtitle}</div>
        <p class="heritage-hero-mission">${HERITAGE_DATA.mission}</p>
      </div>

      <div class="heritage-chapters-grid">
        ${HERITAGE_DATA.chapters.map(ch => `
          <div class="heritage-chapter-card">
            <span class="chapter-number-pill">CHAPTER ${ch.num}</span>
            <h3 class="chapter-title-heading">${ch.title}</h3>
            <p class="chapter-body-text">${ch.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="heritage-cta-box">
        <h3 style="font-size:22px; font-weight:900; margin-bottom:12px; color:var(--aigner-black);">EXPERIENCE THE ATELIER PIECES</h3>
        <p style="font-size:14px; color:var(--lux-text-secondary); margin-bottom:24px;">지금 공식 부티크에서 배우 수영이 선택한 FW26 컬렉션을 만나보세요.</p>
        <button class="heritage-cta-btn" id="btn-heritage-to-catalog">DISCOVER FW26 COLLECTION</button>
      </div>
    </main>
  `;
}

// Product Card Component with Wishlist & Quick View
function renderProductCard(prod) {
  const isWishlisted = state.wishlist.includes(prod.id);
  return `
    <div class="boutique-product-card" data-product-id="${prod.id}">
      <div class="product-image-container">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
        <span class="product-exclusive-badge">${prod.badge}</span>
        
        <!-- Wishlist Toggle -->
        <button class="product-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-toggle-wishlist="${prod.id}" title="${isWishlisted ? '위시리스트 삭제' : '위시리스트 추가'}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <!-- Quick View Overlay -->
        <div class="product-quick-view-overlay">
          <button class="quick-view-btn" data-boutique-open-pdp="${prod.id}">QUICK VIEW</button>
        </div>

        <button class="product-quick-bag-btn" data-boutique-open-pdp="${prod.id}" title="상세보기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </button>
      </div>

      <div class="product-spec-block" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">
        <span class="product-cat-label">${prod.category} · ${prod.subCategory}</span>
        <h3 class="product-item-name">${prod.name}</h3>
        <div class="product-pricing-row">
          ${prod.discountRate > 0 ? `<span class="product-discount-rate">${prod.discountRate}%</span>` : ''}
          <span class="product-final-price">${formatPrice(prod.price)}</span>
        </div>
        <div class="product-privilege-perks">
          <span class="perk-mileage-tag">${prod.pointRate}</span>
          <span class="perk-packaging-tag">${prod.delivery}</span>
        </div>
      </div>
    </div>
  `;
}

// Global Luxury Footer
function renderFooter() {
  return `
    <footer class="boutique-global-footer" aria-label="사이트 푸터">
      <div class="footer-inner-wrap">
        <div class="footer-columns-row">
          <!-- Column 1 — INTERVIEW553 -->
          <div class="footer-col footer-col-brand">
            <div class="footer-brand-header">
              <img src="${BRAND_DATA.logoWhite}" alt="Interview553 Logo" class="footer-brand-logo" width="60" height="60" loading="lazy" decoding="async" />
              <div class="footer-col-header footer-brand-name">INTERVIEW553</div>
            </div>
            <p class="footer-brand-desc">
              정교한 장인 정신과 모던 럭셔리의 정수. Interview553는 최고급 카프스킨 소재와 시대를 초월하는 우아한 실루엣의 컬렉션을 선보입니다.
            </p>
            <div class="footer-operator-info">
              공식 운영사: 주식회사 유닉유니온
            </div>
          </div>

          <!-- Column 2 — CLIENT SERVICE -->
          <div class="footer-col footer-col-service">
            <div class="footer-col-header">CLIENT SERVICE</div>
            <div class="footer-phone-block">
              <a href="tel:01083605305" class="footer-cs-hotline" aria-label="고객센터 전화 010-8360-5305">010-8360-5305</a>
              <div class="footer-cs-hours">${BRAND_DATA.businessInfo.csTime}</div>
            </div>
            <div class="footer-links-vertical" role="navigation" aria-label="고객 서비스">
              <button class="footer-link-item" id="footer-link-faq" type="button">Shipping & Complimentary Returns</button>
              <button class="footer-link-item" id="footer-link-auth" type="button">Authenticity & Warranty</button>
              <button class="footer-link-item" id="footer-link-care" type="button">Leather Care Guide</button>
              <button class="footer-link-item" id="footer-link-track" type="button">Order Tracking</button>
            </div>
          </div>

          <!-- Column 3 — BOUTIQUE LOCATIONS -->
          <div class="footer-col footer-col-locations">
            <div class="footer-col-header">BOUTIQUE LOCATIONS</div>
            <div class="footer-links-vertical" role="navigation" aria-label="부티크 매장 위치">
              <button class="footer-link-item" data-open-store="flagship" type="button">Interview553 Seoul Flagship</button>
              <button class="footer-link-item" data-open-store="galleria" type="button">Galleria Luxury Hall East</button>
              <button class="footer-link-item" data-open-store="lotte" type="button">Lotte Main Department Store</button>
              <button class="footer-link-item" data-open-store="shinsegae" type="button">Shinsegae Gangnam Boutique</button>
              <button class="footer-link-item" data-open-store="hyundai" type="button">Hyundai Apgujeong Main Store</button>
            </div>
          </div>

          <!-- Column 4 — INTERVIEW553 PRIVILEGE -->
          <div class="footer-col footer-col-privilege">
            <div class="footer-col-header">INTERVIEW553 PRIVILEGE</div>
            <p class="footer-privilege-desc">
              뉴스레터를 구독하시고 10% 웰컴 바우처 및 프라이빗 컬렉션 프리뷰 혜택을 받아보세요.
            </p>
            <form id="newsletter-form" class="footer-newsletter-form" novalidate>
              <div class="footer-input-group">
                <input 
                  type="email" 
                  id="newsletter-email" 
                  class="footer-email-input" 
                  placeholder="YOUR EMAIL ADDRESS" 
                  aria-label="뉴스레터 수신 이메일 주소" 
                  autocomplete="email" 
                  required 
                />
                <button type="submit" id="newsletter-submit-btn" class="footer-join-btn">JOIN</button>
              </div>
              <div id="newsletter-feedback" class="footer-newsletter-feedback" role="status" aria-live="polite"></div>
            </form>
          </div>
        </div>

        <div class="footer-legal-bar">
          <div class="footer-legal-row">
            <span>주식회사 유닉유니온</span>
            <span class="footer-legal-divider">|</span>
            <span>대표자: ${BRAND_DATA.businessInfo.ceo}</span>
            <span class="footer-legal-divider">|</span>
            <span>사업자등록번호: ${BRAND_DATA.businessInfo.bizNumber}</span>
            <span class="footer-legal-divider">|</span>
            <span>통신판매업신고번호: ${BRAND_DATA.businessInfo.mailOrderNumber}</span>
          </div>
          <div class="footer-legal-row">
            <span>사업장 소재지: ${BRAND_DATA.businessInfo.address}</span>
            <span class="footer-legal-divider">|</span>
            <span>공식 고객상담 이메일: <a href="mailto:${BRAND_DATA.businessInfo.email}" class="footer-legal-link">${BRAND_DATA.businessInfo.email}</a></span>
          </div>
          <div class="footer-legal-row footer-copyright-row">
            <span>© 2026 INTERVIEW553 & UNIC UNION CO., LTD. ALL RIGHTS RESERVED.</span>
            <div class="footer-legal-sublinks">
              <button type="button" class="footer-legal-sublink" id="footer-btn-terms">이용약관</button>
              <span class="footer-legal-divider">|</span>
              <button type="button" class="footer-legal-sublink" id="footer-btn-privacy">개인정보처리방침</button>
              <span class="footer-legal-divider">|</span>
              <button type="button" class="footer-legal-sublink" id="footer-btn-escrow">에스크로 구매안전</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Mobile Quick Bottom Navigation Bar
function renderMobileBottomNav(totalCartCount) {
  const wishlistCount = state.wishlist.length;
  return `
    <nav class="mobile-bottom-nav" aria-label="모바일 하단 빠른 메뉴">
      <button class="mobile-nav-item ${state.currentView === 'editorial' && !state.activeModal ? 'active' : ''}" id="m-nav-editorial" type="button" aria-label="에디토리얼 화보">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        <span>화보</span>
      </button>
      <button class="mobile-nav-item ${state.currentView === 'catalog' && !state.activeModal ? 'active' : ''}" id="m-nav-catalog" type="button" aria-label="컬렉션 쇼핑">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        <span>컬렉션</span>
      </button>
      <button class="mobile-nav-item ${state.activeModal === 'search' ? 'active' : ''}" id="m-nav-search" type="button" aria-label="실시간 검색">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <span>검색</span>
      </button>
      <button class="mobile-nav-item ${state.activeModal === 'wishlist' ? 'active' : ''}" id="m-nav-wishlist" type="button" aria-label="위시리스트">
        <div style="position:relative; display:inline-flex;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${wishlistCount > 0 ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          ${wishlistCount > 0 ? `<span class="m-nav-badge">${wishlistCount}</span>` : ''}
        </div>
        <span>위시</span>
      </button>
      <button class="mobile-nav-item ${state.activeModal === 'cart' ? 'active' : ''}" id="m-nav-bag" type="button" aria-label="쇼핑백">
        <div style="position:relative; display:inline-flex;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          ${totalCartCount > 0 ? `<span class="m-nav-badge">${totalCartCount}</span>` : ''}
        </div>
        <span>쇼핑백</span>
      </button>
    </nav>
  `;
}

// Modals & Drawers Renderer
function renderModals(totalCartPrice) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const totalPoints = Math.floor(totalCartPrice * 0.05);
  const selectedProd = PRODUCTS.find(p => p.id === state.selectedProductId);

  modalContainer.innerHTML = `
    <!-- 1. Shopping Bag Slide Drawer -->
    <div class="modal-overlay ${state.activeModal === 'cart' ? 'open' : ''}" id="bag-modal">
      <div class="bag-slide-drawer">
        <div class="bag-drawer-header">
          <span class="bag-drawer-title">SHOPPING BAG (${state.cart.length})</span>
          <button class="bag-close-btn" id="btn-close-bag">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="bag-drawer-body">
          ${state.cart.length === 0 ? `
            <div style="text-align:center; padding: 70px 20px; color:var(--lux-text-muted);">
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" style="margin: 0 auto 16px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <p style="font-size:15px; font-weight:800; color:var(--lux-text-primary);">쇼핑백이 비어 있습니다.</p>
              <button class="category-pill-btn" id="btn-bag-to-shop" style="margin-top:20px;">컬렉션 둘러보기</button>
            </div>
          ` : `
            <div class="bag-items-stack">
              ${state.cart.map(item => {
                const prod = PRODUCTS.find(p => p.id === item.productId);
                if (!prod) return '';
                return `
                  <div class="bag-item-card">
                    <div class="bag-item-thumb">
                      <img src="${prod.image}" alt="${prod.name}" />
                    </div>
                    <div class="bag-item-details">
                      <div class="bag-item-heading">${prod.name}</div>
                      <div style="font-size:11px; color:var(--lux-text-muted); margin-bottom:4px;">
                        COLOR: ${item.color || 'STANDARD'} | SIZE: ${item.size || 'FREE'}
                      </div>
                      <div class="bag-item-price-val">${formatPrice(prod.price * item.quantity)}</div>
                      <div class="bag-qty-stepper">
                        <button class="stepper-btn" data-stepper="dec" data-prod-id="${prod.id}">-</button>
                        <span class="stepper-val">${item.quantity}</span>
                        <button class="stepper-btn" data-stepper="inc" data-prod-id="${prod.id}">+</button>
                      </div>
                    </div>
                    <button class="bag-close-btn" style="width:30px; height:30px;" data-remove-bag-item="${prod.id}">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
        ${state.cart.length > 0 ? `
          <div class="bag-drawer-footer">
            <div class="bag-cost-summary">
              <div class="cost-row">
                <span>SUBTOTAL</span>
                <span>${formatPrice(totalCartPrice)}</span>
              </div>
              <div class="cost-row">
                <span>COMPLIMENTARY SHIPPING</span>
                <span style="color:var(--aigner-burgundy); font-weight:800;">FREE (무료)</span>
              </div>
              <div class="cost-row">
                <span>INTERVIEW553 CLUB MILEAGE</span>
                <span style="color:var(--aigner-gold); font-weight:800;">+ ${formatPrice(totalPoints)}</span>
              </div>
              <div class="cost-row total-bold">
                <span>TOTAL</span>
                <span>${formatPrice(totalCartPrice)}</span>
              </div>
            </div>
            <button class="bag-checkout-btn" id="btn-proceed-checkout">
              <span>PROCEED TO SECURE CHECKOUT</span>
            </button>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- 2. Wishlist Slide Drawer -->
    <div class="modal-overlay ${state.activeModal === 'wishlist' ? 'open' : ''}" id="wishlist-modal">
      <div class="bag-slide-drawer">
        <div class="bag-drawer-header">
          <span class="bag-drawer-title">MY WISHLIST (${state.wishlist.length})</span>
          <button class="bag-close-btn" id="btn-close-wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="bag-drawer-body">
          ${state.wishlist.length === 0 ? `
            <div style="text-align:center; padding: 70px 20px; color:var(--lux-text-muted);">
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" style="margin: 0 auto 16px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <p style="font-size:15px; font-weight:800; color:var(--lux-text-primary);">위시리스트가 비어 있습니다.</p>
            </div>
          ` : `
            <div class="bag-items-stack">
              ${state.wishlist.map(pId => {
                const prod = PRODUCTS.find(p => p.id === pId);
                if (!prod) return '';
                return `
                  <div class="bag-item-card">
                    <div class="bag-item-thumb" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">
                      <img src="${prod.image}" alt="${prod.name}" />
                    </div>
                    <div class="bag-item-details">
                      <div class="bag-item-heading" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">${prod.name}</div>
                      <div class="bag-item-price-val">${formatPrice(prod.price)}</div>
                      <button class="hover-preview-add-btn" data-wishlist-to-bag="${prod.id}" style="margin-top:8px;">쇼핑백으로 이동</button>
                    </div>
                    <button class="bag-close-btn" style="width:30px; height:30px;" data-remove-wishlist="${prod.id}">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    </div>

    <!-- 3. Product Detail Modal (PDP) -->
    <div class="modal-overlay ${state.activeModal === 'pdp' && selectedProd ? 'open' : ''}" id="pdp-modal">
      ${selectedProd ? `
        <div class="pdp-dialog-box">
          <button class="bag-close-btn" id="btn-close-pdp" style="position:absolute; top:20px; right:20px; z-index:10;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div class="pdp-gallery-frame">
            <img src="${selectedProd.image}" alt="${selectedProd.name}" />
            <span class="product-exclusive-badge">${selectedProd.badge}</span>
          </div>

          <div class="pdp-info-column">
            <div>
              <span class="pdp-category-tag">${selectedProd.category} · ${selectedProd.subCategory}</span>
              <h2 class="pdp-title-heading">${selectedProd.name}</h2>
            </div>

            <div class="pdp-price-wrap">
              ${selectedProd.discountRate > 0 ? `<span class="pdp-discount-badge">${selectedProd.discountRate}% OFF</span>` : ''}
              <span class="pdp-current-price">${formatPrice(selectedProd.price)}</span>
              ${selectedProd.discountRate > 0 ? `<span class="pdp-original-price">${formatPrice(selectedProd.originalPrice)}</span>` : ''}
            </div>

            <!-- Color Options -->
            <div class="pdp-option-section">
              <div class="pdp-option-label">
                <span>SELECT COLOR:</span>
                <span style="color:var(--aigner-burgundy); font-weight:900;">${state.selectedColor || selectedProd.colorList[0]}</span>
              </div>
              <div class="pdp-swatches-row">
                ${selectedProd.colorList.map(c => `
                  <button class="pdp-swatch-chip ${(state.selectedColor || selectedProd.colorList[0]) === c ? 'active' : ''}" data-select-color="${c}">${c}</button>
                `).join('')}
              </div>
            </div>

            <!-- Size Options -->
            <div class="pdp-option-section">
              <div class="pdp-option-label">
                <span>SELECT SIZE:</span>
                <span style="color:var(--aigner-burgundy); font-weight:900;">${state.selectedSize || selectedProd.sizeList[0]}</span>
              </div>
              <div class="pdp-sizes-row">
                ${selectedProd.sizeList.map(s => `
                  <button class="pdp-size-btn ${(state.selectedSize || selectedProd.sizeList[0]) === s ? 'active' : ''}" data-select-size="${s}">${s}</button>
                `).join('')}
              </div>
            </div>

            <div style="font-size:12px; color:#16a34a; font-weight:700;">
              ✓ 부티크 잔여 수량 ${selectedProd.inStock}개 | 오후 2시 이전 주문 시 당일 무료 출고
            </div>

            <!-- CTAs -->
            <div class="pdp-cta-row">
              <button class="pdp-add-bag-cta" id="pdp-add-bag-btn">쇼핑백 담기 (BAG)</button>
              <button class="pdp-buy-now-cta" id="pdp-buy-now-btn">바로 구매하기 (BUY NOW)</button>
            </div>

            <!-- Tabs -->
            <div class="pdp-tabs-nav">
              <button class="pdp-tab-btn ${state.activePdpTab === 'spec' ? 'active' : ''}" data-pdp-tab="spec">제품 사양</button>
              <button class="pdp-tab-btn ${state.activePdpTab === 'delivery' ? 'active' : ''}" data-pdp-tab="delivery">배송 및 선물포장</button>
              <button class="pdp-tab-btn ${state.activePdpTab === 'care' ? 'active' : ''}" data-pdp-tab="care">케어 가이드</button>
            </div>

            <div class="pdp-tab-content-box">
              ${state.activePdpTab === 'spec' ? `
                <p>${selectedProd.description}</p>
                <div style="margin-top:8px;">소재: ${selectedProd.material}</div>
                <div>규격: ${selectedProd.size}</div>
              ` : state.activePdpTab === 'delivery' ? `
                <p>전 상품 무료 특송 및 Interview553 시그니처 럭셔리 하드박스 & 리본 포장이 무상 제공됩니다.</p>
                <div style="margin-top:6px;">배송사: CJ대한통운 프리미엄 안심택배 (1-2영업일 소요)</div>
              ` : `
                <p>천연 카프스킨 가죽 제품은 물이나 습기, 직사광선 노출을 피해주시고 보관 시 동봉된 더스트백을 사용해 주십시오.</p>
              `}
            </div>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- 4. Luxury Checkout Modal -->
    <div class="modal-overlay ${state.activeModal === 'checkout' ? 'open' : ''}" id="checkout-modal">
      <div class="checkout-dialog-box">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--lux-border); padding-bottom:16px;">
          <div>
            <h2 style="font-size:20px; font-weight:900; letter-spacing:1px;">SECURE BOUTIQUE CHECKOUT</h2>
            <p style="font-size:12px; color:var(--lux-text-muted);">안전한 SSL 암호화 부티크 결제</p>
          </div>
          <button class="bag-close-btn" id="btn-close-checkout">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form id="checkout-form" class="checkout-grid">
          <!-- Left: Address & Payment -->
          <div>
            <div class="checkout-section-box">
              <span class="checkout-sec-title">1. 배송지 정보 (SHIPPING ADDRESS)</span>
              <div class="checkout-field-row">
                <input type="text" class="checkout-input-field" id="order-name" placeholder="받는 분 성함" value="김민지" required />
                <input type="tel" class="checkout-input-field" id="order-phone" placeholder="연락처 (010-0000-0000)" value="010-5530-1965" required />
              </div>
              <input type="text" class="checkout-input-field" id="order-address" placeholder="기본 주소 (예: 서울특별시 강남구 압구정로 412)" value="서울특별시 강남구 압구정로 412" required />
              <input type="text" class="checkout-input-field" id="order-memo" placeholder="배송 요청사항 (예: 부재 시 문 앞 보관)" value="문 앞에 정갈하게 놓아주세요." />
            </div>

            <div class="checkout-section-box">
              <span class="checkout-sec-title">2. 바우처 쿠폰 (PROMO VOUCHER)</span>
              <div class="coupon-apply-wrap">
                <input type="text" class="checkout-input-field" id="coupon-input" placeholder="쿠폰 코드 입력 (예: WELCOME10)" value="${state.couponCode}" />
                <button type="button" class="coupon-apply-btn" id="btn-apply-coupon">적용하기</button>
              </div>
              <div style="font-size:11px; color:var(--aigner-gold); font-weight:700;">
                💡 팁: 신규 고객 전용 10% 웰컴 코드 [ WELCOME10 ] 입력 시 즉시 할인
              </div>
            </div>

            <div class="checkout-section-box">
              <span class="checkout-sec-title">3. 결제 수단 (PAYMENT METHOD)</span>
              <div class="payment-options-grid">
                <label class="payment-opt-label ${state.paymentMethod === 'card' ? 'active' : ''}">
                  <input type="radio" name="pay-method" value="card" ${state.paymentMethod === 'card' ? 'checked' : ''} />
                  <span>신용 / 체크카드</span>
                </label>
                <label class="payment-opt-label ${state.paymentMethod === 'kakao' ? 'active' : ''}">
                  <input type="radio" name="pay-method" value="kakao" ${state.paymentMethod === 'kakao' ? 'checked' : ''} />
                  <span>카카오페이 (Kakao)</span>
                </label>
                <label class="payment-opt-label ${state.paymentMethod === 'toss' ? 'active' : ''}">
                  <input type="radio" name="pay-method" value="toss" ${state.paymentMethod === 'toss' ? 'checked' : ''} />
                  <span>토스페이 (Toss)</span>
                </label>
                <label class="payment-opt-label ${state.paymentMethod === 'vaccount' ? 'active' : ''}">
                  <input type="radio" name="pay-method" value="vaccount" ${state.paymentMethod === 'vaccount' ? 'checked' : ''} />
                  <span>VIP 전용 가상계좌</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Right: Order Summary -->
          <div>
            <div class="order-summary-card">
              <h3 style="font-size:15px; font-weight:900; margin-bottom:16px;">ORDER SUMMARY</h3>
              <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                <div style="display:flex; justify-content:space-between;">
                  <span>상품 합계</span>
                  <span>${formatPrice(totalCartPrice)}</span>
                </div>
                ${state.couponApplied ? `
                  <div style="display:flex; justify-content:space-between; color:var(--aigner-burgundy); font-weight:700;">
                    <span>웰컴 바우처 (10% 할인)</span>
                    <span>- ${formatPrice(Math.floor(totalCartPrice * 0.1))}</span>
                  </div>
                ` : ''}
                <div style="display:flex; justify-content:space-between;">
                  <span>프리미엄 특송 배송비</span>
                  <span style="color:#16a34a; font-weight:700;">무료 (FREE)</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span>부티크 선물 포장</span>
                  <span style="color:#16a34a; font-weight:700;">무료 제공</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-top:12px; border-top:1px solid var(--lux-border); font-size:16px; font-weight:900;">
                  <span>최종 결제 금액</span>
                  <span style="color:var(--aigner-burgundy);">${formatPrice(state.couponApplied ? Math.floor(totalCartPrice * 0.9) : totalCartPrice)}</span>
                </div>
                <div style="font-size:11px; color:var(--aigner-gold); text-align:right;">
                  + ${formatPrice(Math.floor((state.couponApplied ? totalCartPrice * 0.9 : totalCartPrice) * 0.05))} 마일리지 적립 예정
                </div>
              </div>

              <button type="submit" class="pdp-buy-now-cta" style="width:100%; margin-top:20px; font-size:14px; padding:16px;">
                결제 완료하기 (PLACE ORDER)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 5. Order Confirmation Receipt Modal -->
    <div class="modal-overlay ${state.activeModal === 'orderConfirmation' && state.lastOrder ? 'open' : ''}" id="receipt-modal">
      ${state.lastOrder ? `
        <div class="order-confirmation-box">
          <div class="receipt-icon-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 style="font-size:24px; font-weight:900; margin-bottom:6px;">THANK YOU FOR YOUR ORDER</h2>
          <p style="font-size:13px; color:var(--lux-text-muted);">주문이 성공적으로 접수되어 아틀리에에서 배송 준비 중입니다.</p>

          <table class="receipt-info-table">
            <tr>
              <td style="color:var(--lux-text-muted);">주문 번호</td>
              <td style="text-align:right; font-weight:800;">${state.lastOrder.orderId}</td>
            </tr>
            <tr>
              <td style="color:var(--lux-text-muted);">주문 일시</td>
              <td style="text-align:right;">${state.lastOrder.date}</td>
            </tr>
            <tr>
              <td style="color:var(--lux-text-muted);">수령인</td>
              <td style="text-align:right;">${state.lastOrder.name} (${state.lastOrder.phone})</td>
            </tr>
            <tr>
              <td style="color:var(--lux-text-muted);">배송 주소</td>
              <td style="text-align:right;">${state.lastOrder.address}</td>
            </tr>
            <tr>
              <td style="color:var(--lux-text-muted);">총 결제금액</td>
              <td style="text-align:right; font-weight:900; color:var(--aigner-burgundy);">${formatPrice(state.lastOrder.totalPrice)}</td>
            </tr>
            <tr>
              <td style="color:var(--lux-text-muted);">적립 마일리지</td>
              <td style="text-align:right; font-weight:800; color:var(--aigner-gold);">+ ${formatPrice(state.lastOrder.points)} P</td>
            </tr>
          </table>

          <button class="heritage-cta-btn" id="btn-receipt-continue" style="width:100%;">쇼핑 계속하기</button>
        </div>
      ` : ''}
    </div>

    <!-- 6. Live Search Modal Overlay -->
    <div class="modal-overlay ${state.activeModal === 'search' ? 'open' : ''}" id="search-modal">
      <div class="search-overlay-dialog">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span style="font-size:12px; font-weight:800; letter-spacing:1.5px; color:var(--aigner-gold);">INTERVIEW553 SEARCH</span>
          <button class="bag-close-btn" id="btn-close-search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="search-input-header">
          <svg class="search-icon-inside" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="search-big-input" id="search-modal-input" placeholder="상품명, 카테고리 또는 스타일 검색 (예: 아다라, 숄, 버킷햇)" value="${state.searchQuery}" autofocus />
        </div>

        <div class="search-tags-list">
          <span style="font-size:12px; font-weight:700; color:var(--lux-text-muted);">인기 검색어:</span>
          <span class="search-tag-pill" data-quick-tag="아다라">#아다라 크로스백</span>
          <span class="search-tag-pill" data-quick-tag="캐시미어">#캐시미어 숄</span>
          <span class="search-tag-pill" data-quick-tag="FUR">#퍼 베스트</span>
          <span class="search-tag-pill" data-quick-tag="버킷햇">#헤리티지 버킷햇</span>
          <span class="search-tag-pill" data-quick-tag="데님">#기모 데님</span>
        </div>

        <!-- Search Results List -->
        <div>
          ${(() => {
            const q = state.searchQuery.toLowerCase().trim();
            const matched = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : PRODUCTS.slice(0, 4);
            return `
              <div style="font-size:13px; font-weight:800; margin-bottom:12px; color:var(--lux-text-secondary);">
                ${q ? `'${state.searchQuery}' 검색 결과 (${matched.length})` : '추천 컬렉션 (RECOMMENDED)'}
              </div>
              <div class="bag-items-stack">
                ${matched.map(prod => `
                  <div class="bag-item-card" data-boutique-open-pdp="${prod.id}" style="cursor:pointer;">
                    <div class="bag-item-thumb">
                      <img src="${prod.image}" alt="${prod.name}" />
                    </div>
                    <div class="bag-item-details">
                      <div class="bag-item-heading">${prod.name}</div>
                      <div class="bag-item-price-val">${formatPrice(prod.price)}</div>
                    </div>
                    <button class="category-pill-btn" data-boutique-open-pdp="${prod.id}">상세보기</button>
                  </div>
                `).join('')}
              </div>
            `;
          })()}
        </div>
      </div>
    </div>

    <!-- 7. Boutique Locator Modal -->
    <div class="modal-overlay ${state.activeModal === 'boutique' ? 'open' : ''}" id="boutique-modal">
      <div class="boutique-locator-dialog">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--lux-border); padding-bottom:16px;">
          <div>
            <h2 style="font-size:20px; font-weight:900; letter-spacing:1px;">BOUTIQUE LOCATIONS</h2>
            <p style="font-size:12px; color:var(--lux-text-muted);">전국 Interview553 공식 직영 플래그십 및 백화점 부티크</p>
          </div>
          <button class="bag-close-btn" id="btn-close-boutique">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="stores-grid-layout">
          <!-- Stores Tab List -->
          <div class="store-tabs-col">
            ${BOUTIQUE_LOCATIONS.map(st => `
              <div class="store-tab-card ${state.selectedStoreId === st.id ? 'active' : ''}" data-select-store="${st.id}">
                <div style="font-size:11px; color:var(--aigner-gold); font-weight:800;">${st.type}</div>
                <div style="font-size:13px; font-weight:800; margin-top:2px;">${st.name}</div>
                <div style="font-size:11px; color:var(--lux-text-muted); margin-top:4px;">${st.tel}</div>
              </div>
            `).join('')}
          </div>

          <!-- Store Details View -->
          <div>
            ${(() => {
              const currentStore = BOUTIQUE_LOCATIONS.find(st => st.id === state.selectedStoreId) || BOUTIQUE_LOCATIONS[0];
              return `
                <div class="store-detail-box">
                  <div style="font-size:11px; font-weight:800; color:var(--aigner-burgundy); letter-spacing:1px;">${currentStore.type}</div>
                  <h3 style="font-size:20px; font-weight:900; margin:6px 0 16px;">${currentStore.name}</h3>
                  <div style="font-size:13px; line-height:1.8; color:var(--lux-text-primary);">
                    <div><strong>주소:</strong> ${currentStore.address}</div>
                    <div><strong>대표 전화:</strong> ${currentStore.tel}</div>
                    <div><strong>영업 시간:</strong> ${currentStore.hours}</div>
                  </div>
                  <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--lux-border);">
                    <div style="font-size:12px; font-weight:800; margin-bottom:8px;">부티크 서비스 & 편의:</div>
                    <ul style="font-size:12px; color:var(--lux-text-secondary); padding-left:18px;">
                      ${currentStore.services.map(srv => `<li>${srv}</li>`).join('')}
                    </ul>
                  </div>
                  <button class="pdp-buy-now-cta" id="btn-book-concierge" style="margin-top:20px; width:100%;">
                    VIP 퍼스널 쇼퍼 & 살롱 예약
                  </button>
                </div>
              `;
            })()}
          </div>
        </div>
      </div>
    </div>

    <!-- 8. Client Service & FAQ Modal -->
    <div class="modal-overlay ${state.activeModal === 'cs' ? 'open' : ''}" id="cs-modal">
      <div class="cs-dialog-box">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--lux-border); padding-bottom:16px;">
          <div>
            <h2 style="font-size:20px; font-weight:900; letter-spacing:1px;">CLIENT SERVICE & CONCIERGE</h2>
            <p style="font-size:12px; color:var(--lux-text-muted);">부티크 고객센터 및 프리미엄 상담</p>
          </div>
          <button class="bag-close-btn" id="btn-close-cs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div style="margin:24px 0;">
          <h3 style="font-size:14px; font-weight:800; margin-bottom:12px; color:var(--aigner-black);">FREQUENTLY ASKED QUESTIONS (자주 묻는 질문)</h3>
          ${FAQS.map((faq, idx) => `
            <div class="faq-accordion-item">
              <button class="faq-question-btn" data-toggle-faq="${idx}">
                <span>Q. ${faq.q}</span>
                <span>${state.activeFaqIndex === idx ? '−' : '+'}</span>
              </button>
              ${state.activeFaqIndex === idx ? `
                <div class="faq-answer-panel">
                  A. ${faq.a}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Order Tracking Demo -->
        <div style="background:var(--lux-bg-subtle); padding:20px; border-radius:var(--radius-md); border:1px solid var(--lux-border);">
          <span style="font-size:13px; font-weight:800;">ORDER TRACKING (실시간 배송 조회)</span>
          <div style="display:flex; gap:8px; margin-top:10px;">
            <input type="text" class="checkout-input-field" id="tracking-input" placeholder="주문 번호 입력 (예: IV553-2026-8841)" value="${state.trackingQuery}" />
            <button class="category-pill-btn" id="btn-track-order">조회하기</button>
          </div>
          ${state.trackingResult ? `
            <div style="margin-top:12px; font-size:12px; padding:10px; background:#ffffff; border-radius:4px; border:1px solid #16a34a; color:#16a34a; font-weight:700;">
              ✓ [CJ대한통운 6890-5530-1965] ${state.trackingResult}
            </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- 9. VIP Account Lounge Modal -->
    <div class="modal-overlay ${state.activeModal === 'account' ? 'open' : ''}" id="account-modal">
      <div class="account-dialog-box">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--lux-border); padding-bottom:16px;">
          <div>
            <h2 style="font-size:20px; font-weight:900; letter-spacing:1px;">INTERVIEW553 VIP LOUNGE</h2>
            <p style="font-size:12px; color:var(--lux-text-muted);">부티크 프라이빗 멤버십</p>
          </div>
          <button class="bag-close-btn" id="btn-close-account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div style="margin-top:24px;">
          <div class="vip-member-card">
            <span class="vip-tier-badge">${state.userAccount.tier}</span>
            <div style="font-size:22px; font-weight:900;">${state.userAccount.name}</div>
            <div style="display:flex; justify-content:space-between; margin-top:20px; font-size:13px;">
              <div>
                <span style="color:#9ca3af;">보유 마일리지</span>
                <div style="font-size:18px; font-weight:900; color:var(--aigner-gold);">${state.userAccount.mileage.toLocaleString()} P</div>
              </div>
              <div>
                <span style="color:#9ca3af;">보유 쿠폰 바우처</span>
                <div style="font-size:18px; font-weight:900; color:#ffffff;">${state.userAccount.couponsCount}장 (10% 웰컴 포함)</div>
              </div>
            </div>
          </div>

          <h3 style="font-size:14px; font-weight:800; margin-bottom:12px;">RECENT BOUTIQUE ORDERS (최근 주문 내역)</h3>
          <div style="border:1px solid var(--lux-border); border-radius:var(--radius-sm); overflow:hidden;">
            ${state.userAccount.recentOrders.map(ord => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid var(--lux-border-light); font-size:13px;">
                <div>
                  <div style="font-weight:800;">${ord.item}</div>
                  <div style="font-size:11px; color:var(--lux-text-muted);">${ord.id} · ${ord.date}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:800; color:var(--aigner-burgundy);">${ord.price}</div>
                  <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#dcfce7; color:#15803d; font-weight:700;">${ord.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 10. Share Modal -->
    <div class="modal-overlay ${state.activeModal === 'share' ? 'open' : ''}" id="share-modal">
      <div style="background:#fff; border-radius:16px; width:440px; padding:32px; box-shadow:var(--shadow-xl);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:800; letter-spacing:1px;">SHARE EDITORIAL</h3>
          <button class="bag-close-btn" id="btn-close-share">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; text-align:center;">
          <button class="share-opt-btn" id="share-kakao">
            <div style="width:52px; height:52px; border-radius:50%; background:#fee500; color:#191919; display:flex; align-items:center; justify-content:center; font-weight:900; margin:0 auto 8px;">talk</div>
            <span style="font-size:12px; font-weight:700;">카카오톡</span>
          </button>
          <button class="share-opt-btn" id="share-copy-link">
            <div style="width:52px; height:52px; border-radius:50%; background:#111; color:#fff; display:flex; align-items:center; justify-content:center; margin:0 auto 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <span style="font-size:12px; font-weight:700;">링크 복사</span>
          </button>
          <button class="share-opt-btn" id="share-messages">
            <div style="width:52px; height:52px; border-radius:50%; background:#25d366; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:900; margin:0 auto 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <span style="font-size:12px; font-weight:700;">메시지</span>
          </button>
          <button class="share-opt-btn" id="share-facebook">
            <div style="width:52px; height:52px; border-radius:50%; background:#1877f2; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:900; margin:0 auto 8px;">f</div>
            <span style="font-size:12px; font-weight:700;">페이스북</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 11. Lightbox Image Modal -->
    <div class="lightbox-modal ${state.activeModal === 'lightbox' ? 'open' : ''}" id="lightbox-modal">
      <button class="lightbox-close-btn" id="btn-close-lightbox">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <div class="lightbox-wrap">
        <img src="${state.lightboxImage || ''}" alt="Interview553 화보 확대보기" />
      </div>
    </div>
  `;
}

// Event Listeners Attachment
function attachEvents() {
  // Brand Home Click
  document.getElementById('btn-brand-home')?.addEventListener('click', () => {
    state.currentView = 'editorial';
    state.currentStoryId = 5003015429;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('breadcrumb-home')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.currentView = 'editorial';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('breadcrumb-editorials')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.currentView = 'editorial';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });

  // Top Bar Links
  document.querySelector('a[href="#boutique"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.activeModal = 'boutique';
    renderApp();
  });
  document.querySelector('a[href="#cs"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.activeModal = 'cs';
    renderApp();
  });

  // Navigation Links
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav-target');
      const cat = btn.getAttribute('data-nav-cat');
      state.currentView = target;
      if (cat) state.currentCategory = cat;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderApp();
    });
  });

  // Category Filter Pills in Catalog
  document.querySelectorAll('[data-cat-pill]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentCategory = btn.getAttribute('data-cat-pill');
      renderApp();
    });
  });

  // Catalog Sort Dropdown
  document.getElementById('catalog-sort')?.addEventListener('change', (e) => {
    state.catalogSort = e.target.value;
    renderApp();
  });

  // View All Catalog button
  document.getElementById('btn-view-all-catalog')?.addEventListener('click', () => {
    state.currentView = 'catalog';
    state.currentCategory = 'all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('btn-heritage-to-catalog')?.addEventListener('click', () => {
    state.currentView = 'catalog';
    state.currentCategory = 'all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('btn-bag-to-shop')?.addEventListener('click', () => {
    state.activeModal = null;
    state.currentView = 'catalog';
    state.currentCategory = 'all';
    renderApp();
  });

  // Product Detail Modal (PDP) Triggers
  document.querySelectorAll('[data-boutique-open-pdp]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = Number(el.getAttribute('data-boutique-open-pdp'));
      const p = PRODUCTS.find(item => item.id === pId);
      if (p) {
        state.selectedProductId = pId;
        state.selectedColor = p.colorList[0];
        state.selectedSize = p.sizeList[0];
        state.selectedQuantity = 1;
        state.activePdpTab = 'spec';
        state.activeModal = 'pdp';
        renderApp();
      }
    });
  });

  document.getElementById('btn-close-pdp')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });

  // PDP Color Selection
  document.querySelectorAll('[data-select-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedColor = btn.getAttribute('data-select-color');
      renderApp();
    });
  });

  // PDP Size Selection
  document.querySelectorAll('[data-select-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedSize = btn.getAttribute('data-select-size');
      renderApp();
    });
  });

  // PDP Tabs
  document.querySelectorAll('[data-pdp-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activePdpTab = btn.getAttribute('data-pdp-tab');
      renderApp();
    });
  });

  // PDP Add to Bag & Buy Now
  document.getElementById('pdp-add-bag-btn')?.addEventListener('click', () => {
    const p = PRODUCTS.find(prod => prod.id === state.selectedProductId);
    if (!p) return;
    const existing = state.cart.find(i => i.productId === p.id && i.color === state.selectedColor && i.size === state.selectedSize);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        productId: p.id,
        quantity: 1,
        color: state.selectedColor,
        size: state.selectedSize
      });
    }
    saveCart(state.cart);
    showToast(`'${p.name}' (${state.selectedColor})을(를) 쇼핑백에 담았습니다.`);
    state.activeModal = 'cart';
    renderApp();
  });

  document.getElementById('pdp-buy-now-btn')?.addEventListener('click', () => {
    const p = PRODUCTS.find(prod => prod.id === state.selectedProductId);
    if (!p) return;
    const existing = state.cart.find(i => i.productId === p.id && i.color === state.selectedColor && i.size === state.selectedSize);
    if (!existing) {
      state.cart.push({
        productId: p.id,
        quantity: 1,
        color: state.selectedColor,
        size: state.selectedSize
      });
      saveCart(state.cart);
    }
    state.activeModal = 'checkout';
    renderApp();
  });

  // Wishlist Toggles
  document.querySelectorAll('[data-toggle-wishlist]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = Number(btn.getAttribute('data-toggle-wishlist'));
      if (state.wishlist.includes(pId)) {
        state.wishlist = state.wishlist.filter(id => id !== pId);
        showToast('위시리스트에서 제외했습니다.');
      } else {
        state.wishlist.push(pId);
        showToast('위시리스트에 담았습니다 ❤️');
      }
      saveWishlist(state.wishlist);
      renderApp();
    });
  });

  document.getElementById('btn-wishlist-trigger')?.addEventListener('click', () => {
    state.activeModal = 'wishlist';
    renderApp();
  });
  document.getElementById('btn-close-wishlist')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });
  document.querySelectorAll('[data-remove-wishlist]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = Number(btn.getAttribute('data-remove-wishlist'));
      state.wishlist = state.wishlist.filter(id => id !== pId);
      saveWishlist(state.wishlist);
      renderApp();
    });
  });
  document.querySelectorAll('[data-wishlist-to-bag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = Number(btn.getAttribute('data-wishlist-to-bag'));
      const existing = state.cart.find(i => i.productId === pId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ productId: pId, quantity: 1, color: '기본', size: 'FREE' });
      }
      saveCart(state.cart);
      showToast('쇼핑백으로 이동했습니다.');
      state.activeModal = 'cart';
      renderApp();
    });
  });

  // Open / Close Shopping Bag
  const openBag = () => {
    state.activeModal = 'cart';
    renderApp();
  };
  document.getElementById('btn-open-bag')?.addEventListener('click', openBag);
  document.getElementById('btn-sidebar-view-bag')?.addEventListener('click', openBag);
  document.getElementById('btn-close-bag')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });

  // Bag Stepper
  document.querySelectorAll('[data-stepper]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = Number(btn.getAttribute('data-prod-id'));
      const action = btn.getAttribute('data-stepper');
      const item = state.cart.find(i => i.productId === pId);
      if (!item) return;

      if (action === 'inc') {
        item.quantity += 1;
      } else if (action === 'dec') {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(i => i.productId !== pId);
        }
      }
      saveCart(state.cart);
      renderApp();
    });
  });

  document.querySelectorAll('[data-remove-bag-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = Number(btn.getAttribute('data-remove-bag-item'));
      state.cart = state.cart.filter(i => i.productId !== pId);
      saveCart(state.cart);
      showToast('쇼핑백에서 상품을 삭제했습니다.');
      renderApp();
    });
  });

  // Checkout Flow
  document.getElementById('btn-proceed-checkout')?.addEventListener('click', () => {
    state.activeModal = 'checkout';
    renderApp();
  });
  document.getElementById('btn-close-checkout')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });

  // Apply Coupon
  document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
    const input = document.getElementById('coupon-input')?.value.trim().toUpperCase();
    if (input === 'WELCOME10') {
      state.couponCode = input;
      state.couponApplied = true;
      state.discountRate = 0.1;
      showToast('10% 웰컴 바우처가 성공적으로 적용되었습니다! 🎉');
      renderApp();
    } else if (input) {
      showToast('유효하지 않은 쿠폰 코드입니다. WELCOME10을 사용해보세요.');
    }
  });

  // Payment Radio select
  document.querySelectorAll('input[name="pay-method"]').forEach(radio => {
    radio.addEventListener('change', () => {
      state.paymentMethod = radio.value;
      renderApp();
    });
  });

  // Checkout Form Submission
  document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('order-name')?.value.trim() || '고객님';
    const phone = document.getElementById('order-phone')?.value.trim() || '010-0000-0000';
    const address = document.getElementById('order-address')?.value.trim() || '서울 강남구';

    const subtotal = state.cart.reduce((sum, item) => {
      const p = PRODUCTS.find(prod => prod.id === item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
    const finalTotal = state.couponApplied ? Math.floor(subtotal * 0.9) : subtotal;
    const orderNum = `IV553-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    state.lastOrder = {
      orderId: orderNum,
      name,
      phone,
      address,
      date: new Date().toLocaleDateString('ko-KR'),
      totalPrice: finalTotal,
      points: Math.floor(finalTotal * 0.05),
      items: [...state.cart]
    };

    // Add to user account orders
    state.userAccount.recentOrders.unshift({
      id: orderNum,
      date: new Date().toLocaleDateString('ko-KR'),
      item: state.cart[0] ? (PRODUCTS.find(p => p.id === state.cart[0].productId)?.name || 'Interview553 아이템') : '컬렉션 아이템',
      status: '배송 준비중',
      price: formatPrice(finalTotal)
    });
    state.userAccount.mileage += Math.floor(finalTotal * 0.05);

    // Clear cart
    state.cart = [];
    saveCart(state.cart);

    showToast('결제가 성공적으로 처리되었습니다.');
    state.activeModal = 'orderConfirmation';
    renderApp();
  });

  document.getElementById('btn-receipt-continue')?.addEventListener('click', () => {
    state.activeModal = null;
    state.currentView = 'catalog';
    state.currentCategory = 'all';
    renderApp();
  });

  // Live Search Overlay
  document.getElementById('btn-search-trigger')?.addEventListener('click', () => {
    state.activeModal = 'search';
    renderApp();
  });
  document.getElementById('btn-close-search')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });
  document.getElementById('search-modal-input')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderApp();
  });
  document.querySelectorAll('[data-quick-tag]').forEach(chip => {
    chip.addEventListener('click', () => {
      state.searchQuery = chip.getAttribute('data-quick-tag');
      renderApp();
    });
  });

  // Boutique Locator
  document.querySelectorAll('[data-open-store]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedStoreId = btn.getAttribute('data-open-store');
      state.activeModal = 'boutique';
      renderApp();
    });
  });
  document.getElementById('btn-close-boutique')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });
  document.querySelectorAll('[data-select-store]').forEach(card => {
    card.addEventListener('click', () => {
      state.selectedStoreId = card.getAttribute('data-select-store');
      renderApp();
    });
  });
  document.getElementById('btn-book-concierge')?.addEventListener('click', () => {
    showToast('VIP 퍼스널 쇼퍼 예약이 접수되었습니다. 부티크 매니저가 곧 연락드립니다.');
  });

  // Client Service & FAQ
  const openCs = () => {
    state.activeModal = 'cs';
    renderApp();
  };
  document.getElementById('footer-link-faq')?.addEventListener('click', openCs);
  document.getElementById('footer-link-auth')?.addEventListener('click', openCs);
  document.getElementById('footer-link-care')?.addEventListener('click', openCs);
  document.getElementById('footer-link-track')?.addEventListener('click', openCs);
  document.getElementById('btn-close-cs')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });
  document.querySelectorAll('[data-toggle-faq]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-toggle-faq'));
      state.activeFaqIndex = state.activeFaqIndex === idx ? -1 : idx;
      renderApp();
    });
  });
  document.getElementById('btn-track-order')?.addEventListener('click', () => {
    const q = document.getElementById('tracking-input')?.value.trim();
    if (q) {
      state.trackingQuery = q;
      state.trackingResult = '현재 강남물류센터에서 고객님 주소지로 배송 출발하였습니다. (금일 오후 3시~5시 도착 예정)';
    } else {
      state.trackingResult = '주문 번호를 입력해 주세요.';
    }
    renderApp();
  });

  // VIP Lounge / Account
  document.getElementById('btn-boutique-club')?.addEventListener('click', () => {
    state.activeModal = 'account';
    renderApp();
  });
  document.getElementById('btn-account-trigger')?.addEventListener('click', () => {
    state.activeModal = 'account';
    renderApp();
  });
  document.getElementById('btn-close-account')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });

  // Newsletter with robust email validation
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterEmail && newsletterFeedback) {
    newsletterEmail.addEventListener('input', () => {
      newsletterEmail.classList.remove('is-invalid');
      newsletterEmail.removeAttribute('aria-invalid');
      newsletterFeedback.textContent = '';
      newsletterFeedback.className = 'footer-newsletter-feedback';
    });
  }

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterFeedback) return;

    const email = newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newsletterEmail.classList.add('is-invalid');
      newsletterEmail.setAttribute('aria-invalid', 'true');
      newsletterFeedback.textContent = '이메일 주소를 입력해 주세요.';
      newsletterFeedback.className = 'footer-newsletter-feedback error';
      newsletterEmail.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      newsletterEmail.classList.add('is-invalid');
      newsletterEmail.setAttribute('aria-invalid', 'true');
      newsletterFeedback.textContent = '올바른 이메일 형식을 입력해 주세요 (예: privilege@interview553.com).';
      newsletterFeedback.className = 'footer-newsletter-feedback error';
      newsletterEmail.focus();
      return;
    }

    // Valid email
    newsletterEmail.classList.remove('is-invalid');
    newsletterEmail.removeAttribute('aria-invalid');
    newsletterFeedback.textContent = 'Interview553 Privilege 회원으로 등록되었습니다. 10% 웰컴 바우처가 발송되었습니다.';
    newsletterFeedback.className = 'footer-newsletter-feedback success';
    showToast('Interview553 Privilege 뉴스레터 구독이 완료되었습니다. 10% 웰컴 바우처가 발송되었습니다.');
    newsletterEmail.value = '';
  });

  // Footer legal sublinks
  document.getElementById('footer-btn-terms')?.addEventListener('click', () => {
    state.activeModal = 'cs';
    renderApp();
  });
  document.getElementById('footer-btn-privacy')?.addEventListener('click', () => {
    state.activeModal = 'cs';
    renderApp();
  });
  document.getElementById('footer-btn-escrow')?.addEventListener('click', () => {
    showToast('KB국민은행 에스크로 구매안전서비스에 가입되어 안전한 결제를 보장합니다.');
  });

  // Like Story
  document.getElementById('btn-boutique-like')?.addEventListener('click', (e) => {
    state.userLikedStory = !state.userLikedStory;
    state.storyLikes += state.userLikedStory ? 1 : -1;
    if (state.userLikedStory) {
      showToast('화보 에디토리얼을 좋아합니다 ❤️');
      const rect = e.currentTarget.getBoundingClientRect();
      const p = document.createElement('div');
      p.className = 'heart-particle';
      p.textContent = '❤️';
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top}px`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
    renderApp();
  });

  // Copy Link & Share Modal
  const copyStoryLink = () => {
    const fullUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    showToast('에디토리얼 링크가 클립보드에 복사되었습니다.');
    state.activeModal = null;
    renderApp();
  };
  document.getElementById('btn-copy-story-link')?.addEventListener('click', copyStoryLink);
  document.getElementById('share-copy-link')?.addEventListener('click', copyStoryLink);

  const openShare = () => {
    state.activeModal = 'share';
    renderApp();
  };
  document.getElementById('btn-open-share')?.addEventListener('click', openShare);
  document.getElementById('btn-share-trigger-bar')?.addEventListener('click', openShare);
  document.getElementById('btn-close-share')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });
  document.getElementById('share-kakao')?.addEventListener('click', () => {
    showToast('카카오톡으로 공유되었습니다.');
    state.activeModal = null;
    renderApp();
  });
  document.getElementById('share-messages')?.addEventListener('click', () => {
    showToast('메시지 공유창이 열렸습니다.');
    state.activeModal = null;
    renderApp();
  });
  document.getElementById('share-facebook')?.addEventListener('click', () => {
    showToast('페이스북 공유창이 열렸습니다.');
    state.activeModal = null;
    renderApp();
  });

  // Comments
  document.getElementById('btn-scroll-comments')?.addEventListener('click', () => {
    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('boutique-comment-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const authorInput = document.getElementById('comment-author-input');
    const textInput = document.getElementById('comment-text-input');
    const author = authorInput?.value.trim() || 'Interview553 VIP';
    const content = textInput?.value.trim();
    if (!content) return;

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}. ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    state.comments.unshift({
      id: `custom_${Date.now()}`,
      author,
      date: dateStr,
      content,
      likes: 0,
      isLiked: false,
      isOfficial: false,
      isCustomUser: true
    });

    showToast('소중한 의견이 등록되었습니다.');
    renderApp();
  });

  document.querySelectorAll('[data-like-comment]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cId = btn.getAttribute('data-like-comment');
      const c = state.comments.find(item => item.id === cId);
      if (c) {
        c.isLiked = !c.isLiked;
        c.likes += c.isLiked ? 1 : -1;
        renderApp();
      }
    });
  });

  document.querySelectorAll('[data-delete-comment]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cId = btn.getAttribute('data-delete-comment');
      state.comments = state.comments.filter(c => c.id !== cId);
      showToast('댓글을 삭제했습니다.');
      renderApp();
    });
  });

  // Switch Story
  document.querySelectorAll('[data-switch-story-id]').forEach(card => {
    card.addEventListener('click', () => {
      const sId = Number(card.getAttribute('data-switch-story-id'));
      if (sId !== state.currentStoryId) {
        state.currentStoryId = sId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderApp();
      }
    });
  });

  // Lightbox Zoom
  document.querySelectorAll('.zoomable-boutique-image').forEach(img => {
    img.addEventListener('click', () => {
      state.lightboxImage = img.src;
      state.activeModal = 'lightbox';
      renderApp();
    });
  });
  document.getElementById('btn-close-lightbox')?.addEventListener('click', () => {
    state.activeModal = null;
    renderApp();
  });

  // Mobile Bottom Navigation Bar Events
  document.getElementById('m-nav-editorial')?.addEventListener('click', () => {
    state.currentView = 'editorial';
    state.activeModal = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('m-nav-catalog')?.addEventListener('click', () => {
    state.currentView = 'catalog';
    state.currentCategory = 'all';
    state.activeModal = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  });
  document.getElementById('m-nav-search')?.addEventListener('click', () => {
    state.activeModal = 'search';
    renderApp();
  });
  document.getElementById('m-nav-wishlist')?.addEventListener('click', () => {
    state.activeModal = 'wishlist';
    renderApp();
  });
  document.getElementById('m-nav-bag')?.addEventListener('click', () => {
    state.activeModal = 'cart';
    renderApp();
  });

  // Scroll to Top
  document.getElementById('btn-scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Light-dismiss on Backdrop Click for All Modals (Fallback for closedby="any")
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        state.activeModal = null;
        renderApp();
      }
    });
  });
}

// Initial Boot
renderApp();
