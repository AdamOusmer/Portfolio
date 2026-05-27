import Lenis from 'lenis';
import { applyParallax } from './parallax.js';

export const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
});

function raf(time) {
    lenis.raf(time);
    applyParallax();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
