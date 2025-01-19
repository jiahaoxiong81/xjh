// GitHub API 配置
const GITHUB_API = 'https://api.github.com';
const USERNAME = '您的GitHub用户名';
// 如果需要访问私有仓库，请添加您的GitHub token
const GITHUB_TOKEN = '您的GitHub Token';

// 语言颜色映射
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
};

// 初始化页面
document.addEventListener('DOMContentLoaded', async () => {
    // 显示加载状态
    showSkeletonLoading();
    
    try {
        // 并行获取数据
        const [user, repos] = await Promise.all([
            fetchUserData(),
            fetchRepositories()
        ]);
        
        // 更新统计数据
        updateStats(user, repos);
        
        // 渲染仓库列表
        renderRepositories(repos);
        
        // 初始化搜索和筛选功能
        initializeSearch();
        initializeFilters();
    } catch (error) {
        console.error('加载数据失败:', error);
        showError('获取GitHub数据失败，请稍后重试');
    }
});

// 获取用户数据
async function fetchUserData() {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
    });
    if (!response.ok) throw new Error('获取用户数据失败');
    return response.json();
}

// 获取仓库列表
async function fetchRepositories() {
    const response = await fetch(
        `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=100`,
        {
            headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
        }
    );
    if (!response.ok) throw new Error('获取仓库列表失败');
    return response.json();
}

// 更新统计数据
function updateStats(user, repos) {
    document.getElementById('public-repos').textContent = user.public_repos;
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    document.getElementById('total-stars').textContent = totalStars;
    
    // 这里可以添加获取贡献次数的逻辑
    document.getElementById('total-commits').textContent = '计算中...';
}

// 渲染仓库卡片
function renderRepositories(repos) {
    const grid = document.querySelector('.repositories-grid');
    const template = document.getElementById('repo-template');
    
    // 清除加载状态
    grid.innerHTML = '';
    
    repos.forEach(repo => {
        const card = template.content.cloneNode(true);
        
        // 填充仓库数据
        card.querySelector('.repo-name').textContent = repo.name;
        card.querySelector('.repo-visibility').textContent = repo.private ? '私有' : '公开';
        card.querySelector('.repo-description').textContent = repo.description || '暂无描述';
        
        // 设置语言信息
        if (repo.language) {
            const langColor = languageColors[repo.language] || '#858585';
            card.querySelector('.language-color').style.backgroundColor = langColor;
            card.querySelector('.language-name').textContent = repo.language;
        }
        
        // 设置统计信息
        card.querySelector('.stars-count').textContent = repo.stargazers_count;
        card.querySelector('.forks-count').textContent = repo.forks_count;
        
        // 设置链接
        card.querySelector('.repo-link').href = repo.html_url;
        
        // 添加到网格
        grid.appendChild(card);
    });
}

// 初始化搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('repo-search');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            filterRepositories(searchTerm);
        }, 300);
    });
}

// 初始化筛选功能
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-tags .tag');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选仓库
            const language = btn.dataset.lang;
            filterRepositories('', language);
        });
    });
}

// 筛选仓库
function filterRepositories(searchTerm = '', language = 'all') {
    const cards = document.querySelectorAll('.repo-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.repo-name').textContent.toLowerCase();
        const description = card.querySelector('.repo-description').textContent.toLowerCase();
        const repoLanguage = card.querySelector('.language-name')?.textContent || '';
        
        const matchesSearch = !searchTerm || 
            name.includes(searchTerm) || 
            description.includes(searchTerm);
            
        const matchesLanguage = language === 'all' || 
            repoLanguage.toLowerCase() === language.toLowerCase();
            
        card.style.display = matchesSearch && matchesLanguage ? 'block' : 'none';
    });
}

// 显示加载状态
function showSkeletonLoading() {
    const grid = document.querySelector('.repositories-grid');
    const skeleton = document.querySelector('.repo-skeleton').cloneNode(true);
    grid.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        grid.appendChild(skeleton.cloneNode(true));
    }
}

// 显示错误信息
function showError(message) {
    const grid = document.querySelector('.repositories-grid');
    grid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
} 