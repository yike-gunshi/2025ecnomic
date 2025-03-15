// 页面加载完成后移除加载动画
window.addEventListener('load', () => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        setTimeout(() => {
            loadingElement.style.opacity = 0;
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// 主题切换函数
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// 设置主题(从本地存储或系统偏好)
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

// 检查本地存储或系统偏好
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}

themeToggle.addEventListener('click', toggleTheme);

// 移动端主题切换
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// 移动菜单切换
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });
}

// 添加滚动动画
function animateOnScroll() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.animationPlayState = 'running';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-scale-up');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    return observer;
}

const scrollObserver = animateOnScroll();

// 返回顶部按钮
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.remove('hidden');
        backToTopButton.classList.add('flex');
        setTimeout(() => {
            backToTopButton.style.opacity = 1;
        }, 10);
    } else {
        backToTopButton.style.opacity = 0;
        setTimeout(() => {
            backToTopButton.classList.remove('flex');
            backToTopButton.classList.add('hidden');
        }, 300);
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 导航菜单高亮当前所在页面部分
function activateNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');
    const mobileNavItems = document.querySelectorAll('#mobileMenu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('text-red-500', 'border-red-500');
            item.classList.add('text-gray-700', 'dark:text-gray-300', 'border-transparent');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.remove('text-gray-700', 'dark:text-gray-300', 'border-transparent');
                item.classList.add('text-red-500', 'border-red-500');
            }
        });
        
        mobileNavItems.forEach(item => {
            item.classList.remove('bg-gray-100', 'dark:bg-gray-700');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('bg-gray-100', 'dark:bg-gray-700');
            }
        });
    });
}

activateNavItem();

// 初始化图表
function initCharts() {
    // GDP增长预测图表
    const gdpCtx = document.getElementById('gdpChart');
    if (gdpCtx) {
        const gdpChart = new Chart(gdpCtx, {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: 'GDP增长率 (%)',
                    data: [5.2, 5.0, 5.0, 5.1, 5.2],
                    borderColor: 'rgb(220, 38, 38)',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: 'rgb(220, 38, 38)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 4.0,
                        max: 6.0,
                        ticks: {
                            stepSize: 0.5,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#111827',
                        bodyColor: '#111827',
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        cornerRadius: 6,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `GDP增长率: ${context.raw}%`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    line: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        });

        // 监听主题变更，更新图表主题
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark');
                    
                    // 更新图表配置
                    gdpChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                    gdpChart.options.plugins.tooltip.titleColor = isDarkMode ? '#F9FAFB' : '#111827';
                    gdpChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#F9FAFB' : '#111827';
                    gdpChart.options.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                    
                    gdpChart.update();
                }
            });
        });
        
        darkModeObserver.observe(document.body, { attributes: true });
    }

    // 通胀率预测图表
    const cpiCtx = document.getElementById('cpiChart');
    if (cpiCtx) {
        const cpiChart = new Chart(cpiCtx, {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: 'CPI增长率 (%)',
                    data: [0.2, 0.7, 2.5, 2.3, 2.2],
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: 'rgb(79, 70, 229)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0,
                        max: 3.5,
                        ticks: {
                            stepSize: 0.5,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#111827',
                        bodyColor: '#111827',
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        cornerRadius: 6,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `CPI增长率: ${context.raw}%`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    line: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        });
        
        // 监听主题变更，更新图表主题
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark');
                    
                    // 更新图表配置
                    cpiChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                    cpiChart.options.plugins.tooltip.titleColor = isDarkMode ? '#F9FAFB' : '#111827';
                    cpiChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#F9FAFB' : '#111827';
                    cpiChart.options.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                    
                    cpiChart.update();
                }
            });
        });
        
        darkModeObserver.observe(document.body, { attributes: true });
    }
}

// 销毁图表以重新绘制
function destroyCharts() {
    // 获取所有图表
    const charts = Chart.instances;
    // 销毁所有图表
    for (let key in charts) {
        charts[key].destroy();
    }
}

// 页面加载完成后初始化图表
window.addEventListener('load', initCharts);

// 数据引用功能
// 创建引用弹窗
if (!document.getElementById('citationPopup')) {
    const popupHTML = `
    <div id="citationPopup" class="citation-popup">
        <div class="citation-content">
            <div class="citation-header">
                <h3 class="text-lg font-semibold">数据来源</h3>
                <button id="closeCitation" class="text-white hover:text-gray-200 transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="citationBody" class="citation-body"></div>
            <div class="citation-footer">
                <a id="citationLink" href="#" target="_blank" class="citation-btn citation-primary-btn">查看原文</a>
                <button id="dismissCitation" class="citation-btn citation-secondary-btn">关闭</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

// 关闭弹窗函数
function closeCitationPopup() {
    const popup = document.getElementById('citationPopup');
    popup.classList.remove('active');
}

// 打开弹窗函数
function openCitationPopup(content, link) {
    const popup = document.getElementById('citationPopup');
    const body = document.getElementById('citationBody');
    const linkElem = document.getElementById('citationLink');
    body.innerHTML = content;
    linkElem.href = link;
    popup.classList.add('active');
}

// 初始化所有数据引用元素的点击事件
document.addEventListener('DOMContentLoaded', function() {
    const citations = document.querySelectorAll('.data-citation');
    citations.forEach(citation => {
        citation.addEventListener('click', function(e) {
            e.preventDefault();
            const content = this.getAttribute('data-content');
            const link = this.getAttribute('data-link');
            openCitationPopup(content, link);
        });
    });

    // 关闭按钮事件
    document.getElementById('closeCitation').addEventListener('click', closeCitationPopup);
    document.getElementById('dismissCitation').addEventListener('click', closeCitationPopup);
});

// 搜索功能实现
function initSearch() {
    // 搜索功能
    const searchButton = document.getElementById('searchButton');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const closeSearch = document.getElementById('closeSearch');
    
    const searchData = [
        {
            title: 'GDP增长目标',
            content: '2025年GDP增长预期5%左右，延续稳健增长态势',
            link: '#goals'
        },
        {
            title: '通货膨胀率',
            content: '2025年居民消费价格指数(CPI)预期上涨3%左右',
            link: '#goals'
        },
        {
            title: '财政政策',
            content: '财政政策更加积极有为，赤字率4%左右，特别国债1.3万亿元',
            link: '#analysis'
        },
        {
            title: '货币政策',
            content: '稳健的货币政策要灵活适度，保持流动性合理充裕',
            link: '#analysis'
        },
        {
            title: '就业政策',
            content: '就业优先政策要提质加力，城镇新增就业1200万人以上',
            link: '#tasks'
        },
        {
            title: '创新驱动',
            content: '深入实施创新驱动发展战略，加快建设科技强国',
            link: '#tasks'
        },
        {
            title: '新质生产力',
            content: '因地制宜发展新质生产力，加快建设现代化产业体系',
            link: '#analysis'
        },
        {
            title: '数字经济',
            content: '深入实施数字中国战略，加快数字产业化和产业数字化',
            link: '#impact'
        },
        {
            title: '绿色低碳发展',
            content: '深入推进环境污染防治和生态文明建设，促进绿色低碳发展',
            link: '#impact'
        },
        {
            title: '乡村振兴',
            content: '全面推进乡村振兴，加快建设农业强国',
            link: '#tasks'
        },
        {
            title: '对外开放',
            content: '推进高水平对外开放，提升国际合作和竞争新优势',
            link: '#outlook'
        },
        {
            title: '民生保障',
            content: '切实保障和改善民生，扎实推进共同富裕',
            link: '#tasks'
        },
        {
            title: '房地产市场',
            content: '促进房地产市场平稳健康发展，着力解决好大城市住房突出问题',
            link: '#analysis'
        },
        {
            title: '科技创新',
            content: '实施创新驱动核心战略，新型举国体制攻克"卡脖子"问题',
            link: '#impact'
        },
        {
            title: '新能源产业',
            content: '大力发展新能源产业，推动能源绿色低碳转型',
            link: '#impact'
        }
    ];
    
    // 打开搜索
    if (searchButton && searchOverlay) {
        searchButton.addEventListener('click', () => {
            searchOverlay.classList.remove('hidden');
            setTimeout(() => {
                searchOverlay.classList.add('opacity-100');
                searchInput.focus();
            }, 10);
        });
    }
    
    // 关闭搜索
    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('opacity-100');
            setTimeout(() => {
                searchOverlay.classList.add('hidden');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }, 300);
        });
    }
    
    // 执行搜索
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (query.length < 2) return;
            
            const matches = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
            );
            
            if (matches.length === 0) {
                searchResults.innerHTML = '<div class="p-4 text-gray-500 dark:text-gray-400">没有找到相关内容</div>';
                return;
            }
            
            matches.forEach(item => {
                const resultItem = document.createElement('a');
                resultItem.href = item.link;
                resultItem.className = 'block p-4 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0';
                
                // 高亮匹配的文本
                let titleHtml = item.title;
                let contentHtml = item.content;
                
                if (item.title.toLowerCase().includes(query)) {
                    const regex = new RegExp(`(${query})`, 'gi');
                    titleHtml = item.title.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-700">$1</span>');
                }
                
                if (item.content.toLowerCase().includes(query)) {
                    const regex = new RegExp(`(${query})`, 'gi');
                    contentHtml = item.content.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-700">$1</span>');
                }
                
                resultItem.innerHTML = `
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">${titleHtml}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${contentHtml}</p>
                `;
                
                resultItem.addEventListener('click', () => {
                    searchOverlay.classList.remove('opacity-100');
                    setTimeout(() => {
                        searchOverlay.classList.add('hidden');
                        searchInput.value = '';
                        searchResults.innerHTML = '';
                    }, 300);
                });
                
                searchResults.appendChild(resultItem);
            });
        }, 300));
    }
}

// 初始化额外的图表
function initAdditionalCharts() {
    // 经济增长结构图
    const economyStructureCtx = document.getElementById('economyStructureChart');
    if (economyStructureCtx) {
        const economyStructureChart = new Chart(economyStructureCtx, {
            type: 'doughnut',
            data: {
                labels: ['第一产业', '第二产业', '第三产业'],
                datasets: [{
                    data: [7.2, 38.3, 54.5],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.7)',  // 绿色
                        'rgba(59, 130, 246, 0.7)',  // 蓝色
                        'rgba(220, 38, 38, 0.7)'    // 红色
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(220, 38, 38, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            boxWidth: 12,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '65%',
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
        
        // 监听主题变更
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark');
                    economyStructureChart.options.plugins.legend.labels.color = isDarkMode ? '#F9FAFB' : '#111827';
                    economyStructureChart.update();
                }
            });
        });
        
        darkModeObserver.observe(document.body, { attributes: true });
    }
    
    // 经济增长质量指标雷达图
    const economyQualityCtx = document.getElementById('economyQualityChart');
    if (economyQualityCtx) {
        const economyQualityChart = new Chart(economyQualityCtx, {
            type: 'radar',
            data: {
                labels: ['创新能力', '产业升级', '绿色发展', '民生改善', '风险防控'],
                datasets: [{
                    label: '2024年',
                    data: [65, 70, 60, 75, 70],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 0.8)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2
                }, {
                    label: '2025年预测',
                    data: [75, 80, 75, 82, 75],
                    backgroundColor: 'rgba(220, 38, 38, 0.2)',
                    borderColor: 'rgba(220, 38, 38, 0.8)',
                    pointBackgroundColor: 'rgba(220, 38, 38, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        },
                        suggestedMin: 40,
                        suggestedMax: 90
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}/100`;
                            }
                        }
                    }
                }
            }
        });
        
        // 监听主题变更
        const darkModeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark');
                    economyQualityChart.options.scales.r.angleLines.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                    economyQualityChart.options.scales.r.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                    economyQualityChart.options.scales.r.pointLabels.color = isDarkMode ? '#F9FAFB' : '#111827';
                    economyQualityChart.options.plugins.legend.labels.color = isDarkMode ? '#F9FAFB' : '#111827';
                    economyQualityChart.update();
                }
            });
        });
        
        darkModeObserver.observe(document.body, { attributes: true });
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initAdditionalCharts();
});
