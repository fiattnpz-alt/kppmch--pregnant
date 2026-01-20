// LINE Widget JavaScript
// This script handles the LINE floating button and modal interactions

document.addEventListener('DOMContentLoaded', function () {
    // Initialize LINE elements
    const lineWidget = document.getElementById('line-widget');
    const lineModal = document.getElementById('line-modal');

    // Add click event to LINE widget button
    if (lineWidget) {
        lineWidget.addEventListener('click', function () {
            toggleLineModal();
        });
    }

    // Close modal when clicking outside
    if (lineModal) {
        lineModal.addEventListener('click', function (e) {
            if (e.target === lineModal) {
                toggleLineModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lineModal && lineModal.classList.contains('show')) {
            toggleLineModal();
        }
    });
});

// Toggle LINE modal visibility
function toggleLineModal() {
    var modal = document.getElementById("line-modal");
    if (!modal) return;

    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        setTimeout(function () {
            modal.style.display = "none";
        }, 300);
    } else {
        modal.style.display = "block";
        setTimeout(function () {
            modal.classList.add("show");
        }, 10);
    }
}

// Optional: Add smooth scroll to LINE widget when user scrolls to bottom
window.addEventListener('scroll', function () {
    const lineWidget = document.getElementById('line-widget');
    if (lineWidget) {
        const scrollY = window.scrollY;
        if (scrollY > 300) {
            lineWidget.style.opacity = '1';
            lineWidget.style.transform = 'scale(1)';
        } else {
            lineWidget.style.opacity = '0.8';
            lineWidget.style.transform = 'scale(0.9)';
        }
    }
});
