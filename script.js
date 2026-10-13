// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik (mobile)
document.querySelectorAll('.nav-link, .btn-lapor').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



// ===== FILTER CERITA =====
const filterBtns = document.querySelectorAll('.filter-btn');
const ceritaCards = document.querySelectorAll('.cerita-card[data-category]');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            ceritaCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== FORM STORY =====
function handleStorySubmit(e) {
    e.preventDefault();
    alert('✅ Terima kasih! Ceritamu sudah kami terima dan akan ditinjau oleh tim kami.');
    e.target.reset();
}

// ===== FORM LAPOR =====
function handleLaporSubmit(e) {
    e.preventDefault();

    // Generate ticket
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const ticket = `#SB-${year}-${random}`;
    document.getElementById('ticketNumber').textContent = ticket;

    // Show modal
    document.getElementById('successModal').classList.add('active');
    e.target.reset();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Close modal saat klik di luar
const successModal = document.getElementById('successModal');
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeModal();
    });
}