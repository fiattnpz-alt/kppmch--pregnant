document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger icon if needed
        });
    }

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scroll for Anchor Links (polyfill/fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-text, .hero-text, .hero-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styles dynamically or rely on CSS classes being toggled
    // Here we'll just set inline styles for simplicity in JS for the "visible" state if we don't have CSS classes
    // But better to add a class. Let's add a style block for .visible
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Toggle active class
            item.classList.toggle('active');

            // Toggle max-height for smooth animation
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
});

/*popup*/
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("addressModal");
    const btn = document.getElementById("view-address-btn");
    const closeBtn = document.querySelector(".close-modal");

    // เมื่อกดปุ่ม ดูที่อยู่
    btn.onclick = function (e) {
        e.preventDefault(); // ป้องกันการ reload หน้า
        modal.style.display = "block";
    }

    // เมื่อกดปุ่ม (x)
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    // เมื่อกดพื้นที่ว่างข้างนอก Popup ให้ปิดด้วย
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
/*popup*/

/*line*/
function toggleLineModal() {
    var modal = document.getElementById("line-modal");
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        setTimeout(() => { modal.style.display = "none"; }, 300);
    } else {
        modal.style.display = "block";
        setTimeout(() => { modal.classList.add("show"); }, 10);
    }
}
/*line*/

/* Google Sheets Form Submission */
/* Google Sheets Form Submission with Modal */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    // Check if form exists
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const statusModal = document.getElementById('statusModal');
            const statusBody = document.getElementById('statusBody');
            const closeBtn = document.getElementById('closeStatusModal');
            const submitBtn = document.getElementById('submitBtn');

            // Open Modal
            statusModal.style.display = 'block';

            // 1. Loading State
            statusBody.innerHTML = `
                <div class="spinner" style="margin-bottom: 20px;"></div>
                <p style="color: #666; font-size: 1.1rem;">กำลังบันทึกข้อมูล...</p>
                <p style="color: #999; font-size: 0.9rem;">กรุณารอสักครู่</p>
            `;

            // Hide close button during loading to prevent interrupt? 
            // Better UX to allow close, but we'll leave it simple.

            // Collect form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            data.timestamp = new Date().toISOString();

            // GOOGLE APPS SCRIPT WEB APP URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvKrn2fjC0uDd7_QmenZX-TlnA9buDV7Vk_UWrfbAkqgl5GaCcPTBKtqDvPAO3rL1I/exec'; // REMEMBER TO UPDATE THIS

            const queryString = new URLSearchParams(data).toString();

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: queryString
            })
                .then(() => {
                    // 2. Success State
                    setTimeout(() => { // Artificial delay for smooth UX if it's too fast
                        statusBody.innerHTML = `
                        <div class="checkmark-circle" style="margin-bottom: 20px;">
                            <div class="background"></div>
                            <div class="checkmark draw"></div>
                        </div>
                        <h4 style="color: #28a745; margin-bottom: 10px;">ลงทะเบียนสำเร็จ!</h4>
                        <p style="color: #666; margin-bottom: 20px;">ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว</p>
                        <button id="modalCloseBtn" style="
                            background-color: #f5f5f5; 
                            color: #666; 
                            padding: 10px 25px; 
                            border-radius: 8px; 
                            border: none; 
                            cursor: pointer; 
                            font-weight: 500;
                            transition: 0.3s;
                        ">ปิดหน้าต่าง</button>
                    `;

                        // Add listener to new button
                        document.getElementById('modalCloseBtn').onclick = function () {
                            statusModal.style.display = 'none';
                        };

                        form.reset();
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    // 3. Error State
                    statusBody.innerHTML = `
                    <div style="color: #dc3545; font-size: 3rem; margin-bottom: 10px;"><i class="fas fa-times-circle"></i></div>
                    <h4 style="color: #dc3545; margin-bottom: 10px;">เกิดข้อผิดพลาด</h4>
                    <p style="color: #666; margin-bottom: 20px;">ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่</p>
                    <button id="modalCloseBtn" style="background: #f5f5f5; padding: 10px 20px; border:none; border-radius:8px; cursor:pointer;">ปิด</button>
                `;
                    document.getElementById('modalCloseBtn').onclick = function () {
                        statusModal.style.display = 'none';
                    };
                });

            // Close logic for X button
            closeBtn.onclick = function () {
                statusModal.style.display = 'none';
            }
        });
    }
});