/* ============ PRODUCT DATA ============ */
const products = [
    { id: 9, name: "Disposable Couch Sheets - White Roll", tag: "Clinic Supplies", price: 3500, emoji: "🛏️", image: "2 (5).jpeg", desc: "100 m disposable white couch sheet roll, 70+ sheets." },
    { id: 10, name: "Disposable Couch Sheets - Blue Roll", tag: "Clinic Supplies", price: 3500, emoji: "🛏️", image: "2 (5).jpeg", desc: "100 m disposable blue couch sheet roll, 70+ sheets." },
    { id: 11, name: "Facial Sheet Masks", tag: "Face Mask", price: null, emoji: "🎭", image: "2 (9).jpeg", desc: "Assorted facial sheet masks for hydration and skin care." },
    { id: 12, name: "Hydra Facial Serum Set", tag: "Serum Set", price: null, emoji: "🧴", image: "2 (8).jpeg", desc: "Three-step hydrafacial serum set." },
    { id: 13, name: "Carbon Gel", tag: "Treatment Gel", price: 2000, emoji: "🧴", image: "2 (6).jpeg", desc: "Carbon gel for carbon laser treatment." },
    { id: 14, name: "Latex Examination Gloves", tag: "Clinic Supplies", price: null, emoji: "🧤", image: "2 (2).jpeg", desc: "Disposable latex examination gloves, 100-count box." },
    { id: 15, name: "Ultrasound Gel", tag: "Treatment Gel", price: null, emoji: "🧴", image: "2 (4).jpeg", desc: "Water-soluble ultrasound coupling gel." },
    { id: 16, name: "Aesthetic Clinic Equipment & Supplies", tag: "Clinic Supplies", price: null, emoji: "🩺", image: "2 (2).jpeg", desc: "Clinic equipment and disposable treatment supplies." },
    { id: 17, name: "Gold Facial Massage Wand", tag: "Beauty Tool", price: null, emoji: "✨", image: "2 (1).jpeg", desc: "Handheld facial massage and beauty tool." },
    { id: 18, name: "Hydrafacial Serum Trio", tag: "Serum Set", price: null, emoji: "🧴", image: "2 (3).jpeg", desc: "Three 500 ml hydrafacial serums: Beta-HD, Serum 4, and Anti-Oxidant." },
    { id: 19, name: "Numbing Cream", tag: "Cream", price: null, emoji: "🧴", image: "2 (2).jpeg", desc: "Topical numbing cream. Contact us for price and details." },
    { id: 20, name: "GlowWhite Face Wash & Tinted Sunscreen Set", tag: "Skincare Set", price: null, emoji: "☀️", image: "2 (7).jpeg", desc: "Face wash and tinted sunscreen skincare combo." },
];

const WHATSAPP_NUMBER = '923294575441';
const formatPrice = amount => `PKR ${amount.toLocaleString('en-PK')}`;
let selectedProduct = null;

function startOrder(id) {
    selectedProduct = products.find(product => product.id === id);
    if (!selectedProduct) {
        showToast('This product is unavailable');
        return;
    }

    document.getElementById('orderProduct').textContent =
        `${selectedProduct.name} — ${selectedProduct.price === null ? 'Contact for price' : formatPrice(selectedProduct.price)}`;
    document.getElementById('orderQuantity').value = '1';
    document.getElementById('orderOverlay').classList.add('open');
    document.getElementById('customerPhone').focus();
}

function closeOrderForm(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('orderOverlay').classList.remove('open');
}

function placeOrder(event) {
    event.preventDefault();
    if (!selectedProduct) {
        showToast('Select a product before ordering');
        return;
    }

    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    if (!phone || !address) {
        showToast('Enter your phone number and delivery address');
        return;
    }

    const quantity = Number(document.getElementById('orderQuantity').value);
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
        showToast('Enter a valid quantity');
        return;
    }

    const priceLine = selectedProduct.price === null
        ? 'Price: Please confirm'
        : `Total: ${formatPrice(selectedProduct.price * quantity)}`;
    const message = `Hello, I would like to order:\n${selectedProduct.name} x${quantity}\n${priceLine}\n\nPhone: ${phone}\nDelivery address: ${address}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    closeOrderForm();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}