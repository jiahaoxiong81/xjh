document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = document.querySelector('.nav-links').outerHTML;
    
    document.body.appendChild(mobileNav);
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // 点击导航链接时关闭菜单
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    
    // 滚动时添加导航栏阴影
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
    
    // 滚动进度条
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        scrollProgress.style.width = `${progress}%`;
        
        // 显示/隐藏返回顶部按钮
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // 返回顶部功能
    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        // 更新背景透明度
        if (currentScroll > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 