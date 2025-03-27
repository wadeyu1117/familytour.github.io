document.addEventListener('DOMContentLoaded', function() {

    // --- 響應式導航欄控制 ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active'); // 切換 .active class 來顯示/隱藏選單

            // ARIA 屬性，輔助工具使用
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.textContent = isOpen ? '✕' : '☰'; // 簡單文字切換
        });
    }

    // (可選) 點擊選單項目後自動關閉選單 (適用於手機版)
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // 檢查螢幕寬度是否為手機模式
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', false);
                    navToggle.textContent = '☰'; // 恢復漢堡圖標
                }
            });
        });
    }

    // --- FAQ 頁面：一次只打開一個 details (可選) ---
    const detailsElements = document.querySelectorAll('details'); // 選擇頁面上的所有 details
    // 檢查當前頁面是否是 FAQ 頁 (一個簡單的方法是檢查主標題)
    const pageTitle = document.querySelector('.page-padding > h1');
    if (pageTitle && pageTitle.textContent.includes('常見問題')) {
        detailsElements.forEach((detail) => {
            detail.addEventListener('toggle', (event) => {
                if (detail.open) {
                    // 當一個 details 被打開時，關閉其他已打開的 details
                    detailsElements.forEach((otherDetail) => {
                        if (otherDetail !== detail && otherDetail.open) {
                            otherDetail.open = false;
                        }
                    });
                }
            });
        });
    }

    // --- (可選) 平滑滾動到錨點 (如果您的頁面內有 #連結) ---
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if(targetElement) {
    //             // 可選：計算 Header 的高度，避免滾動後被 Header 遮住
    //             const headerOffset = document.querySelector('header')?.offsetHeight || 0;
    //             const elementPosition = targetElement.getBoundingClientRect().top;
    //             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    //
    //             window.scrollTo({
    //                  top: offsetPosition,
    //                  behavior: "smooth"
    //             });
    //         }
    //     });
    // });

});
