/**
 * Adds a "Copy" button to every <pre> code block inside .prose containers.
 */
document.addEventListener("DOMContentLoaded", () => {
    const codeBlocks = document.querySelectorAll(".prose pre, .sl-markdown-content pre");

    codeBlocks.forEach((pre) => {
        // Wrap in a container for positioning
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // Create copy button
        const btn = document.createElement("button");
        btn.className = "copy-code-btn";
        btn.setAttribute("aria-label", "Copy code");
        btn.innerHTML = `
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;

        wrapper.appendChild(btn);

        btn.addEventListener("click", async () => {
            const code = pre.querySelector("code");
            const text = code ? code.innerText : pre.innerText;

            try {
                await navigator.clipboard.writeText(text);
                // Show success state
                btn.querySelector(".copy-icon").style.display = "none";
                btn.querySelector(".check-icon").style.display = "block";
                btn.classList.add("copied");

                setTimeout(() => {
                    btn.querySelector(".copy-icon").style.display = "block";
                    btn.querySelector(".check-icon").style.display = "none";
                    btn.classList.remove("copied");
                }, 2000);
            } catch (err) {
                console.error("Failed to copy code:", err);
            }
        });
    });
});
