/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
    const siteNavigation = document.getElementById('site-navigation');

    // Return early if the navigation doesn't exist.
    if (!siteNavigation) {
        return;
    }
    const button = siteNavigation.getElementsByClassName('menu-toggle')[0];
    // Return early if the button doesn't exist.
    if ('undefined' === typeof button) {
        return;
    }

    const menu = siteNavigation.getElementsByTagName('ul')[0];
    // Hide menu toggle button if menu is empty and return early.
    if ('undefined' === typeof menu) {
        button.style.display = 'none';
        return;
    }
    if (!menu.classList.contains('nav-menu')) {
        menu.classList.add('nav-menu');
    }

    // Get all the link elements within the menu.
    const links = menu.getElementsByTagName('a');

    // Get all the link elements with children within the menu.
    const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

    // Toggle focus each time a menu link is focused or blurred.
    for (const link of links) {
        link.addEventListener('focus', toggleFocus, true);
        link.addEventListener('blur', toggleFocus, true);
    }

    // Toggle focus each time a menu link with children receive a touch event.
    for (const link of linksWithChildren) {
        link.addEventListener('touchstart', toggleFocus, false);
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function toggleFocus() {
        if (event.type === 'focus' || event.type === 'blur') {
            let self = this;
            // Move up through the ancestors of the current link until we hit .nav-menu.
            while (!self.classList.contains('nav-menu')) {
                // On li elements toggle the class .focus.
                if ('li' === self.tagName.toLowerCase()) {
                    self.classList.toggle('focus');
                }
                self = self.parentNode;
            }
        }

        if (event.type === 'touchstart') {
            const menuItem = this.parentNode;
            event.preventDefault();
            for (const link of menuItem.parentNode.children) {
                if (menuItem !== link) {
                    link.classList.remove('focus');
                }
            }
            menuItem.classList.toggle('focus');
        }
    }

    /** Toggle menu */
    const menuToggle = document.querySelector('.menu-toggle')
    const headerTitle = document.querySelector('header')
    const siteDescription = document.querySelector('.site-description')
    const mainElement = document.querySelector('.site-main')

    const toggleMenu = (e) => {
        e.stopPropagation()
        mainElement.classList.toggle('nav-is-open')
        menuToggle.classList.toggle('active')
        // Toggle the .toggled class and the aria-expanded value each time the button is clicked.
        siteNavigation.classList.toggle('toggled');
        if (button.getAttribute('aria-expanded') === 'true') {
            button.setAttribute('aria-expanded', 'false');
        } else {
            button.setAttribute('aria-expanded', 'true');
        }
    }

    // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
    document.addEventListener('click', function (event) {
        const isClickInside = siteNavigation.contains(event.target);

        if (!isClickInside) {
            siteNavigation.classList.remove('toggled');
            mainElement.classList.remove('nav-is-open')
            button.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active')
        }
    });

    button.addEventListener('click', toggleMenu)
    siteDescription.addEventListener('click', toggleMenu)
    menuToggle.addEventListener('click', toggleMenu)
    headerTitle.addEventListener('click', toggleMenu)

    /** *Decorative rings */
    let circle_a, circle_b, circle_c

    const mapRange = (value, in_min, in_max, out_min, out_max) => {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }

    const handleMove = (e) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Determine if event is from mouse or touch and extract coordinates accordingly
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        const mappedX = mapRange(x, 0, viewportWidth, 1, 10);
        const mappedY = mapRange(y, 0, viewportHeight, 1, 10);

        circle_a.style.transform = `translate3d(${mappedX}px, ${mappedY}px, 0px)`;
        circle_b.style.transform = `translate3d(${(mappedX * 2) - 1}px, ${mappedY * 2}px, 0px)`;
        circle_c.style.transform = `translate3d(${(mappedX * 3) - 3}px, ${mappedY * 3}px, 0px)`;
    }

    /** debounceEvent
     * return a function to be invoked after 'delay' ms
     */
    const debounceEvent = (func, delay) => {
        let debounceTimer
        return (event) => {
            /** Clear existing timers */
            clearTimeout(debounceTimer)

            /** Set up a new timer to be called after the delay */
            debounceTimer = setTimeout(() => {
                func(event) // Invoke function with captured event object
            }, delay)
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        circle_a = document.querySelector('.hero-decoration-circle-a')
        circle_b = document.querySelector('.hero-decoration-circle-b')
        circle_c = document.querySelector('.hero-decoration-circle-c')
        document.addEventListener('mousemove', debounceEvent(handleMove, 6));
        document.addEventListener('touchmove', debounceEvent(handleMove, 6), { passive: true });
    });

}());
