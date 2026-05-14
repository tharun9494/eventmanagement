import { useEffect, useRef, useState } from "react";

/**
 * Premium magnetic cursor — pure CSS transform + JS spring.
 * - Pointer becomes a smooth blob that follows the real cursor
 * - Expands on hover over [data-cursor], buttons, links
 * - Hidden on touch / mobile
 */
export default function MagneticCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const isTouch =
            window.matchMedia("(hover: none)").matches ||
            window.innerWidth < 1024;
        if (isTouch) return;
        setEnabled(true);

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = -200,
            my = -200;
        let dx = mx,
            dy = my,
            rx = mx,
            ry = my;
        let hover = false;
        let seen = false;
        let raf;

        const onMove = (e) => {
            if (!seen) {
                seen = true;
                dx = e.clientX;
                dy = e.clientY;
                rx = e.clientX;
                ry = e.clientY;
                dot.style.opacity = "1";
                ring.style.opacity = "0.5";
            }
            mx = e.clientX;
            my = e.clientY;
        };

        const onLeave = () => {
            dot.style.opacity = "0";
            ring.style.opacity = "0";
        };

        const onOver = (e) => {
            const target = e.target.closest(
                "a, button, [role=button], [data-cursor], input, textarea",
            );
            hover = !!target;
            if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") {
                ring.dataset.text = "1";
            } else {
                ring.dataset.text = "0";
            }
        };

        const tick = () => {
            dx += (mx - dx) * 0.35;
            dy += (my - dy) * 0.35;
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
            ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${hover ? 1.7 : 1})`;
            if (seen) ring.style.opacity = hover ? "0.9" : "0.5";
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, true);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver, true);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    if (!enabled) return null;
    return (
        <>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="fixed top-0 left-0 size-2 rounded-full bg-[#0B1221] pointer-events-none z-[80] mix-blend-difference transition-opacity duration-200"
                style={{ willChange: "transform", opacity: 0 }}
            />
            <div
                ref={ringRef}
                aria-hidden="true"
                className="fixed top-0 left-0 size-9 rounded-full border border-[#0B1221] pointer-events-none z-[80] mix-blend-difference transition-opacity duration-200"
                style={{
                    willChange: "transform, opacity",
                    opacity: 0,
                }}
            />
        </>
    );
}
