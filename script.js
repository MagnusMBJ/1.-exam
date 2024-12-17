document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    let clickTimeout = null;

    // Toggle burger menu
    burgerMenu.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Handle dropdown click behavior
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        let clickCount = 0;

        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            clickCount++;

            if (clickCount === 1) {
                // First click: Show the dropdown menu
                dropdownMenu.style.display = 'flex';

                // Reset click count after a delay if no second click
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            } else if (clickCount === 2) {
                // Second click: Navigate to the link
                window.location.href = link.href;
                clickCount = 0; // Reset click count
            }
        });
    });

    // Close burger menu and dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const isDropdownClicked = Array.from(dropdowns).some(dropdown => dropdown.contains(e.target));
        if (!menu.contains(e.target) && !burgerMenu.contains(e.target) && !isDropdownClicked) {
            menu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                dropdownMenu.style.display = 'none';
            });
        }
    });
});
