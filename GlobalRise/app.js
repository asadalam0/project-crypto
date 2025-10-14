// Application data
const appData = {
    user: {
        name: "Ethan",
        id: "HR2UAZ0",
        email: "user@demo.com",
        mainWallet: 43873.94,
        totalEarning: 4482.94
    },
    walletData: {
        deposit: 63000.00,
        withdraw: 0.00,
        pendingDeposit: 0.00,
        pendingWithdraw: 0.00
    },
    investmentPlans: [
        {
            name: "Plan 1",
            interest: "0% Daily",
            totalReturn: 0.00,
            status: "Capital"
        },
        {
            name: "Plan 2",
            interest: "? Daily",
            totalReturn: 40.00,
            status: "Capital"
        },
        {
            name: "Plan 3",
            interest: "? Daily",
            totalReturn: 8.00,
            status: "Capital"
        },
        {
            name: "Plan 4",
            interest: "10% Daily",
            totalReturn: 1200.00,
            status: "Capital"
        }
    ],
    recentActivity: [
        {
            type: "Profit Return (Auto)",
            amount: 0.00,
            status: "Completed",
            date: "Oct 4, 2025, 11:55 PM"
        },
        {
            type: "Profit Return (Auto)",
            amount: 2.00,
            status: "Completed",
            date: "Oct 4, 2025, 11:55 PM"
        },
        {
            type: "Profit Return (Auto)",
            amount: 500.00,
            status: "Completed",
            date: "Oct 4, 2025, 11:55 PM"
        },
        {
            type: "Profit Return (Auto)",
            amount: 100.00,
            status: "Completed",
            date: "Oct 4, 2025, 11:55 PM"
        },
        {
            type: "Profit Return (Auto)",
            amount: 0.00,
            status: "Completed",
            date: "Oct 4, 2025, 11:55 PM"
        }
    ],
    referralData: {
        totalCommission: 0.00,
        totalReferrals: 2,
        linkClicks: 0,
        totalBonus: 1230.00
    },
    featuredPlans: [
        {
            name: "Dioman",
            interest: "0%",
            period: "Daily",
            for: "11 Times",
            min: 100.00,
            max: 1000.00,
            capitalBack: "YES"
        },
        {
            name: "Starter Plan",
            interest: "2%",
            period: "Hourly",
            for: "200 Times",
            min: 10.00,
            max: 1000.00,
            capitalBack: "YES"
        },
        {
            name: "Gold Plan",
            interest: "8%",
            period: "Hourly",
            for: "1 Times",
            min: 100.00,
            max: 1000000.00,
            capitalBack: "YES"
        },
        {
            name: "Premium Plan",
            interest: "10%",
            period: "Daily",
            for: "12 Times",
            min: 1000.00,
            max: 100000.00,
            capitalBack: "YES"
        }
    ],
    chartData: {
        last15Days: {
            dates: ["Sep 22", "Sep 23", "Sep 24", "Sep 25", "Sep 26", "Sep 27", "Sep 28", "Sep 29", "Sep 30", "Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6"],
            referral: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            deposits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            investments: [0, 100, 150, 200, 300, 200, 250, 400, 100, 200, 4000, 300, 250, 200, 150],
            returns: [0, 50, 75, 100, 150, 100, 125, 200, 50, 100, 2000, 150, 125, 100, 75]
        }
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    initializeCharts();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    setupSidebar();
    updateUserInfo();
    loadDashboardData();
}

// Setup sidebar functionality
function setupSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    hasSubmenus.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Only for submenu
            item.classList.toggle('expanded');
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

// Update user information in the header
function updateUserInfo() {
    const userName = document.querySelector('.user-name');
    const userId = document.querySelector('.user-id');
    const balanceAmount = document.querySelector('.balance-amount');

    if (userName) userName.textContent = appData.user.name;
    if (userId) userId.textContent = `Userid: ${appData.user.id}`;
    if (balanceAmount) balanceAmount.textContent = `USD${appData.user.mainWallet.toLocaleString()}`;
}

// Load dashboard data
function loadDashboardData() {
    updateAccountBalance();
    updateWalletManagement();
    updateRecentActivity();
    updateReferralData();
}

// Update account balance display
function updateAccountBalance() {
    const mainWalletElement = document.querySelector('.balance-value');
    const totalEarningElement = document.querySelectorAll('.balance-value')[1];

    if (mainWalletElement) {
        mainWalletElement.innerHTML = `USD${appData.user.mainWallet.toLocaleString()} <span class="wallet-type">Main Wallet</span>`;
    }
    if (totalEarningElement) {
        totalEarningElement.innerHTML = `USD${appData.user.totalEarning.toLocaleString()} <span class="wallet-type">Total Earning</span>`;
    }
}

// Update wallet management cards
function updateWalletManagement() {
    const walletAmounts = document.querySelectorAll('.wallet-amount');

    if (walletAmounts.length >= 4) {
        walletAmounts[0].textContent = `USD${appData.walletData.deposit.toLocaleString()}`;
        walletAmounts[1].textContent = `USD${appData.walletData.withdraw.toLocaleString()}`;
        walletAmounts[2].textContent = `USD${appData.walletData.pendingDeposit.toLocaleString()}`;
        walletAmounts[3].textContent = `USD${appData.walletData.pendingWithdraw.toLocaleString()}`;
    }
}

// Update recent activity table
function updateRecentActivity() {
    const tableBody = document.querySelector('.table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    appData.recentActivity.forEach(activity => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="table-cell">${activity.type}</div>
            <div class="table-cell">USD${activity.amount.toFixed(2)}</div>
            <div class="table-cell"><span class="status-completed">${activity.status}</span></div>
            <div class="table-cell">${activity.date}</div>
        `;
        tableBody.appendChild(row);
    });
}

// Update referral data
function updateReferralData() {
    const referralAmounts = document.querySelectorAll('.referral-amount');

    if (referralAmounts.length >= 4) {
        referralAmounts[0].textContent = `USD${appData.referralData.totalCommission.toFixed(2)}`;
        referralAmounts[1].textContent = appData.referralData.totalReferrals.toString();
        referralAmounts[2].textContent = appData.referralData.linkClicks.toString();
        referralAmounts[3].textContent = `USD${appData.referralData.totalBonus.toFixed(2)}`;
    }
}

// Initialize charts
function initializeCharts() {
    initializeActivityChart();
    initializeWalletChart();
    initializeEarningChart();
}

// Initialize 15-day activity chart
function initializeActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: appData.chartData.last15Days.dates,
            datasets: [
                {
                    label: 'Referral',
                    data: appData.chartData.last15Days.referral,
                    borderColor: '#00ff7f',
                    backgroundColor: 'rgba(0, 255, 127, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Deposits',
                    data: appData.chartData.last15Days.deposits,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Investments',
                    data: appData.chartData.last15Days.investments,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Inv. Return',
                    data: appData.chartData.last15Days.returns,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0aec0'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return 'USD' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize wallet balance chart
function initializeWalletChart() {
    const ctx = document.getElementById('walletChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Credits', 'Debits'],
            datasets: [{
                data: [65000, 18000],
                backgroundColor: ['#00ff7f', '#ef4444'],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a0aec0'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return value / 1000 + 'k';
                        }
                    }
                }
            }
        }
    });
}

// Initialize earning chart
function initializeEarningChart() {
    const ctx = document.getElementById('earningChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Investment', 'Staking', 'Pool', 'Referral', 'Bonus'],
            datasets: [{
                data: [3200, 0, 0, 0, 1200],
                backgroundColor: ['#8b5cf6', '#3b82f6', '#00ff7f', '#f59e0b', '#ef4444'],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        maxRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return value / 1000 + 'k';
                        }
                    }
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Investment plan buttons
    const investButtons = document.querySelectorAll('.invest-btn');
    investButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Investment feature will be implemented soon!');
        });
    });

    // Chat support button
    const chatButton = document.querySelector('.chat-btn');
    if (chatButton) {
        chatButton.addEventListener('click', function () {
            alert('Chat support will be available soon!');
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (!link.parentElement.classList.contains('has-submenu')) {
            link.addEventListener('click', function (e) {
                // Just visual effects, NO preventDefault
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });

                this.parentElement.classList.add('active');

                // Mobile close
                if (window.innerWidth <= 1024) {
                    document.getElementById('sidebar').classList.remove('open');
                }

                // Let browser handle navigation naturally
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
}

// Utility functions
function formatCurrency(amount) {
    return `USD${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(number) {
    return number.toLocaleString('en-US');
}

// Animation functions
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;
        element.textContent = formatCurrency(current);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Export functions for external use
window.CryptoDashboard = {
    appData,
    initializeApp,
    initializeCharts,
    formatCurrency,
    formatNumber,
    animateValue
};
