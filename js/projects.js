document.addEventListener('DOMContentLoaded', () => {
    // 项目筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新活动按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选项目
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 0);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 加载更多功能
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentPage = 1;

    loadMoreBtn.addEventListener('click', async () => {
        try {
            loadMoreBtn.textContent = '加载中...';
            // 这里可以添加实际的API调用来加载更多项目
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟加载
            
            // 模拟添加新项目
            const projectsGrid = document.querySelector('.projects-grid');
            // 添加新的项目卡片到网格中
            
            currentPage++;
            loadMoreBtn.textContent = '加载更多';
        } catch (error) {
            console.error('加载失败:', error);
            loadMoreBtn.textContent = '重试';
        }
    });
}); 