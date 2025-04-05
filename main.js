// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.body.dataset.theme = savedTheme;
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Toggle theme
themeToggle.addEventListener('click', () => {
  const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Navigation active link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === '#tools')) {
    link.classList.add('active');
    link.style.backgroundColor = 'var(--primary)';
    link.style.color = 'white';
  }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '2rem';
backToTopButton.style.right = '2rem';
backToTopButton.style.width = '3rem';
backToTopButton.style.height = '3rem';
backToTopButton.style.borderRadius = '50%';
backToTopButton.style.backgroundColor = 'var(--primary)';
backToTopButton.style.color = 'white';
backToTopButton.style.border = 'none';
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
backToTopButton.style.display = 'none';
backToTopButton.style.zIndex = '1000';
backToTopButton.style.transition = 'all 0.3s';

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'flex';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Tool card animations
const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Copied!';
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '20px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = 'var(--primary)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '0.5rem 1rem';
    tooltip.style.borderRadius = '4px';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      copyToClipboard(textToCopy);
    });
  });
});