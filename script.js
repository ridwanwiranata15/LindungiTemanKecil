/* ============================================================
   1. NAVBAR — TOGGLE & SCROLL
   ============================================================ */
const header   = document.getElementById('header');
const navMenu  = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  toTop.classList.toggle('show', window.scrollY > 600);
});

/* ============================================================
   2. REVEAL ON SCROLL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   3. ANIMASI ANGKA STATISTIK
   ============================================================ */
function animateCount(el) {
  const target   = parseFloat(el.dataset.count);
  const duration = 1600;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ============================================================
   4. ANIMASI BAR DAMPAK
   ============================================================ */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 150);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.impact-bar__fill').forEach(el => barObserver.observe(el));

/* ============================================================
   5. FILTER CERITA KORBAN
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const storyCards = document.querySelectorAll('.story-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    storyCards.forEach(card => {
      const match = (filter === 'all') || (card.dataset.cat === filter);
      card.classList.toggle('hide', !match);
    });
  });
});

/* ============================================================
   6. AKORDEON EDUKASI
   ============================================================ */
document.querySelectorAll('.acc-item').forEach(item => {
  const head = item.querySelector('.acc-head');
  const body = item.querySelector('.acc-body');

  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Tutup semua
    document.querySelectorAll('.acc-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.acc-body').style.maxHeight = null;
    });

    // Buka yang diklik (jika sebelumnya tertutup)
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ============================================================
   7. KUIS INTERAKTIF
   ============================================================ */
const quizData = [
  {
    q: 'Apa yang membedakan perundungan (bullying) dari pertengkaran biasa?',
    options: [
      'Selalu melibatkan kekerasan fisik',
      'Dilakukan sengaja, berulang, dan ada ketidakseimbangan kekuatan',
      'Terjadi hanya di sekolah',
      'Selalu melibatkan lebih dari lima orang'
    ],
    correct: 1,
    explain: 'Tiga ciri utama perundungan adalah niat menyakiti, pengulangan, dan ketimpangan kuasa antara pelaku dan korban.'
  },
  {
    q: 'Manakah yang BUKAN termasuk bentuk perundungan?',
    options: [
      'Menyebarkan gosip tentang seseorang',
      'Mengucilkan teman dari kelompok',
      'Berdebat pendapat dalam diskusi kelas',
      'Mengirim pesan ancaman lewat media sosial'
    ],
    correct: 2,
    explain: 'Berdebat pendapat adalah hal wajar dalam diskusi. Perundungan melibatkan niat menyakiti dan ketimpangan kuasa.'
  },
  {
    q: 'Apa langkah paling tepat jika kamu melihat temanmu dirundung?',
    options: [
      'Ikut tertawa agar tidak jadi sasaran berikutnya',
      'Diam saja karena bukan urusanmu',
      'Merekam video untuk bukti viral',
      'Menolongnya dan melaporkan ke orang dewasa yang dipercaya'
    ],
    correct: 3,
    explain: 'Saksi yang berani bertindak (upstander) adalah faktor paling kuat dalam menghentikan perundungan.'
  },
  {
    q: 'Jika kamu mengalami perundungan di dunia maya, apa yang sebaiknya dilakukan?',
    options: [
      'Balas dengan kata-kata kasar agar pelaku kapok',
      'Screenshot bukti, blokir pelaku, lalu laporkan',
      'Hapus semua akun media sosial dan diam saja',
      'Sebar ulang konten tersebut agar orang lain tahu'
    ],
    correct: 1,
    explain: 'Simpan bukti terlebih dahulu, blokir pelaku, dan laporkan. Membalas dengan kekerasan hanya memperpanjang konflik.'
  },
  {
    q: 'Mengapa perundungan tidak boleh dianggap "sekadar bercanda"?',
    options: [
      'Karena bercanda itu dilarang di sekolah',
      'Karena dampaknya nyata dan bisa berlanjut hingga dewasa',
      'Karena hanya orang dewasa yang boleh bercanda',
      'Karena bercanda selalu berujung kekerasan'
    ],
    correct: 1,
    explain: 'Bercanda berhenti menjadi bercanda ketika salah satu pihak merasa terluka, takut, atau direndahkan — dan itu terjadi berulang.'
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

const quizQuestion  = document.getElementById('quizQuestion');
const quizOptions   = document.getElementById('quizOptions');
const quizFeedback  = document.getElementById('quizFeedback');
const quizNext      = document.getElementById('quizNext');
const quizContent   = document.getElementById('quizContent');
const quizResult    = document.getElementById('quizResult');
const quizProgress  = document.getElementById('quizProgress');
const quizCounter   = document.getElementById('quizCounter');
const quizScoreLive = document.getElementById('quizScoreLive');

const LETTERS = ['A', 'B', 'C', 'D'];

function renderQuestion() {
  answered = false;
  const data = quizData[currentQ];

  quizQuestion.textContent = data.q;
  quizOptions.innerHTML = '';
  quizFeedback.className = 'quiz__feedback';
  quizFeedback.textContent = '';
  quizNext.classList.remove('show');

  quizCounter.textContent = `Pertanyaan ${currentQ + 1} / ${quizData.length}`;
  quizScoreLive.textContent = `Skor: ${score}`;
  quizProgress.style.width = ((currentQ) / quizData.length) * 100 + '%';

  data.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="quiz-opt__key">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    quizOptions.appendChild(btn);
  });
}

function selectAnswer(index, btnEl) {
  if (answered) return;
  answered = true;

  const data = quizData[currentQ];
  const allBtns = quizOptions.querySelectorAll('.quiz-opt');
  allBtns.forEach(b => b.disabled = true);

  if (index === data.correct) {
    btnEl.classList.add('correct');
    score++;
    quizFeedback.className = 'quiz__feedback ok show';
    quizFeedback.innerHTML = `<strong>Benar! 🎉</strong> ${data.explain}`;
  } else {
    btnEl.classList.add('wrong');
    allBtns[data.correct].classList.add('correct');
    quizFeedback.className = 'quiz__feedback no show';
    quizFeedback.innerHTML = `<strong>Belum tepat.</strong> ${data.explain}`;
  }

  quizScoreLive.textContent = `Skor: ${score}`;
  quizNext.classList.add('show');
  quizNext.textContent = (currentQ === quizData.length - 1)
    ? 'Lihat Hasil →'
    : 'Pertanyaan Berikutnya →';
}

quizNext.addEventListener('click', () => {
  if (currentQ < quizData.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContent.style.display = 'none';
  quizResult.classList.add('show');
  quizProgress.style.width = '100%';

  const total = quizData.length;
  document.getElementById('resultScore').textContent = `${score}/${total}`;

  const title = document.getElementById('resultTitle');
  const text  = document.getElementById('resultText');

  if (score === total) {
    title.textContent = 'Luar biasa! Kamu benar-benar peduli 🌟';
    text.textContent  = 'Pemahamanmu tentang perundungan sangat baik. Sekarang saatnya menjadi pembela bagi teman-temanmu di dunia nyata.';
  } else if (score >= total * 0.6) {
    title.textContent = 'Bagus! Pemahamanmu sudah kuat 👍';
    text.textContent  = 'Kamu sudah tahu dasar-dasarnya. Baca kembali bagian edukasi untuk memperkuat pemahamanmu dan jadi pembela yang lebih baik.';
  } else {
    title.textContent = 'Terus belajar, ya 💜';
    text.textContent  = 'Tidak apa-apa. Pelajari kembali bagian "Apa Itu Perundungan" dan "Edukasi" di halaman ini — lalu coba kuisnya sekali lagi.';
  }
}

document.getElementById('quizRestart').addEventListener('click', () => {
  currentQ = 0;
  score = 0;
  quizResult.classList.remove('show');
  quizContent.style.display = 'block';
  renderQuestion();
});

renderQuestion();

/* ============================================================
   8. DINDING HARAPAN (localStorage)
   ============================================================ */
const STORAGE_KEY = 'ltk_hope_messages';

const defaultMessages = [
  { name: 'Anonim', text: 'Untuk kamu yang sedang bertahan: kamu lebih kuat dari yang kamu kira. Tolong tetap di sini.', time: 'Baru saja' },
  { name: 'Dinda', text: 'Aku pernah jadi korban. Sekarang aku jadi guru BK supaya tidak ada lagi anak yang merasa sendirian.', time: '2 jam lalu' },
  { name: 'Rafi', text: 'Aku berjanji tidak akan diam lagi kalau melihat temanku dirundung. Mulai hari ini.', time: '5 jam lalu' },
  { name: 'Bu Sari', text: 'Sebagai guru, saya minta maaf untuk setiap laporan yang dulu saya anggap remeh. Saya berubah.', time: '1 hari lalu' },
  { name: 'Anonim', text: 'Kamu tidak lemah. Kamu hanya sedang berjuang dengan hal yang tidak terlihat orang lain.', time: '2 hari lalu' }
];

const hopeList = document.getElementById('hopeList');
const hopeForm = document.getElementById('hopeForm');
const formMsg  = document.getElementById('formMsg');

function getMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveMessages(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    /* localStorage mungkin diblokir — abaikan */
  }
}

function createMessageEl(msg) {
  const el = document.createElement('div');
  el.className = 'msg';

  const initial = (msg.name || 'A').trim().charAt(0).toUpperCase();
  const safeName = escapeHtml(msg.name);
  const safeText = escapeHtml(msg.text);

  el.innerHTML = `
    <div class="msg__head">
      <div class="msg__avatar">${initial}</div>
      <span class="msg__name">${safeName}</span>
      <span class="msg__time">${escapeHtml(msg.time)}</span>
    </div>
    <p>${safeText}</p>
  `;
  return el;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMessages() {
  hopeList.innerHTML = '';
  const userMessages = getMessages();

  // Pesan pengguna terbaru di atas
  userMessages.slice().reverse().forEach(msg => {
    hopeList.appendChild(createMessageEl(msg));
  });

  // Pesan bawaan
  defaultMessages.forEach(msg => {
    hopeList.appendChild(createMessageEl(msg));
  });
}

hopeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('hopeName');
  const textInput = document.getElementById('hopeMessage');

  const name = nameInput.value.trim() || 'Anonim';
  const text = textInput.value.trim();

  if (!text) return;

  const messages = getMessages();
  messages.push({
    name: name.slice(0, 30),
    text: text.slice(0, 280),
    time: 'Baru saja'
  });
  saveMessages(messages);

  nameInput.value = '';
  textInput.value = '';

  formMsg.classList.add('show');
  setTimeout(() => formMsg.classList.remove('show'), 3500);

  renderMessages();
  hopeList.scrollTop = 0;
});

renderMessages();

/* ============================================================
   9. BACK TO TOP & TAHUN FOOTER
   ============================================================ */
const toTop = document.getElementById('toTop');

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();