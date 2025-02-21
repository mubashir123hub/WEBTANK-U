// Theme toggling functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('light-theme', savedTheme === 'light');
        if (themeToggle) {
            updateThemeIcon(savedTheme === 'light');
        }
    } else {
        // Use system preference as default
        body.classList.toggle('light-theme', !prefersDarkScheme.matches);
        if (themeToggle) {
            updateThemeIcon(!prefersDarkScheme.matches);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLightTheme = body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
            updateThemeIcon(isLightTheme);
        });
    }

    function updateThemeIcon(isLight) {
        const sunIcon = themeToggle?.querySelector('.fa-sun');
        const moonIcon = themeToggle?.querySelector('.fa-moon');

        if (sunIcon && moonIcon) {
            sunIcon.style.display = isLight ? 'none' : 'block';
            moonIcon.style.display = isLight ? 'block' : 'none';
        }
    }

    // Update theme on system preference change
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            body.classList.toggle('light-theme', !e.matches);
            if (themeToggle) {
                updateThemeIcon(!e.matches);
            }
        }
    });

    // Scroll-aware navigation
    let lastScrollTop = 0;
    const header = document.querySelector('.nav-header');
    const bottomNav = document.querySelector('.bottom-nav');
    const scrollThreshold = 100;

    if (header && bottomNav) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Determine scroll direction
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down
                header.classList.add('hidden');
                bottomNav.classList.add('visible');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
                bottomNav.classList.remove('visible');
            }

            lastScrollTop = scrollTop;
        });
    }
});