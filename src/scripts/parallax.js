export function applyParallax() {
    const scrollY = window.scrollY;
    document.querySelectorAll('.parallax').forEach((el) => {
        const speed = parseFloat(getComputedStyle(el).getPropertyValue('--parallax-speed'));
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
}
