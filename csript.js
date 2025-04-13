/**
 * script.js - Xử lý chức năng đặt món từ web sang app Android
 * @author YourName
 */

// ==================== CẤU HÌNH ====================
const APP_DEEP_LINK = 'foodordering://menu'; // Deep Link của app Android
const WEB_FALLBACK_URL = 'https://nhahangabc.com/menu'; // URL dự phòng khi không mở được app
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.example.foodordering'; // Link cài đặt app

// ==================== HÀM CHÍNH ====================

/**
 * Kiểm tra thiết bị di động
 * @returns {boolean} True nếu là mobile
 */
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Thử mở app bằng Deep Link, nếu thất bại thì chuyển hướng đến fallback
 */
function openAppOrRedirect() {
    // 1. Thử mở app Android
    window.location.href = APP_DEEP_LINK;
    
    // 2. Fallback sau 500ms nếu app không mở được
    setTimeout(() => {
        if (!document.hidden) {
            // Hiển thị dialog hỏi người dùng có muốn cài app không
            const shouldInstall = confirm(
                'Bạn chưa cài đặt ứng dụng. Muốn tải về từ CH Play không?'
            );
            
            if (shouldInstall) {
                window.location.href = PLAY_STORE_URL;
            } else {
                window.location.href = WEB_FALLBACK_URL;
            }
        }
    }, 500);
}

/**
 * Khởi tạo sự kiện cho nút "Đặt món"
 */
function initOrderButton() {
    const orderBtn = document.getElementById('orderBtn');
    
    if (!orderBtn) return;
    
    orderBtn.addEventListener('click', () => {
        if (isMobileDevice()) {
            openAppOrRedirect();
        } else {
            // Nếu là desktop, chuyển thẳng đến web đặt món
            window.location.href = WEB_FALLBACK_URL;
        }
    });
}

// ==================== CHẠY KHI TẢI TRANG ====================
document.addEventListener('DOMContentLoaded', () => {
    // Ẩn/hiện nút "Đặt món" theo thiết bị
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.style.display = isMobileDevice() ? 'block' : 'none';
    }
    
    // Khởi tạo sự kiện
    initOrderButton();
});

// ==================== HỖ TRỢ PWA (NẾU CÓ) ====================
// Kiểm tra xem có phải là PWA đang chạy không
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Ứng dụng đang chạy ở chế độ PWA');
    // Có thể thêm xử lý đặc biệt cho PWA ở đây
}