/* ==========================================================
   main.js
   Premium Glassmorphism UI
========================================================== */

const contentOrder = ["top", "artist", "collaboration", "notice", "portfolio", "avatar", "process", "package", "option", "estimate", "faq"];
const mainContent = document.querySelector("main");
contentOrder.forEach(id => {
    const section = document.getElementById(id);
    if (section) mainContent.appendChild(section);
});
document.querySelectorAll('.artist-link[aria-disabled="true"]').forEach(link => link.addEventListener("click", event => event.preventDefault()));

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Smooth Scroll
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {

            const id = link.getAttribute("href");

            if (id === "#") return;

            e.preventDefault();

            document.querySelector(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });
    });

    /* ==========================
       Scroll Reveal
    ========================== */

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: .15
    });

    reveals.forEach(item => revealObserver.observe(item));

    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".floating-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 160;

            if (scrollY >= top) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

    /* ==========================
       Progress Bar
    ========================== */

    const progress = document.querySelector(".scroll-progress");

    function updateProgress() {

        if (!progress) return;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = scrollY / height * 100;

        progress.style.width = percent + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    /* ==========================
       Back To Top
    ========================== */

    const topBtn = document.querySelector(".to-top");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* ==========================
       FAQ
    ========================== */

    document.querySelectorAll(".faq").forEach(item => {

        const button = item.querySelector(".faq-question");

        button?.addEventListener("click", () => {

            item.classList.toggle("active");

            const isOpen = item.classList.contains("active");
            button.setAttribute("aria-expanded", String(isOpen));

            const icon = item.querySelector(".faq-icon");
            if (icon) icon.textContent = isOpen ? "−" : "+";

        });

        button?.setAttribute("aria-expanded", "false");

    });

    /* ==========================
       Hero Parallax
    ========================== */

    const heroImage = document.querySelector(".banner-card");

    window.addEventListener("scroll", () => {

        if (!heroImage) return;

        const y = window.scrollY * .12;

        heroImage.style.transform =
            `translateY(${y}px) rotate(2deg)`;

    });

});

    /* ==========================
       Portfolio Slider
    ========================== */

    const mainImage = document.querySelector(".portfolio-main img");
    const thumbsBox = document.getElementById("portfolioThumbs");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");
    const portfolioGallery = document.getElementById("portfolioGallery");
    const portfolioViewer = document.getElementById("portfolioViewer");
    const portfolioLock = document.getElementById("portfolioLock");
    const portfolioEmpty = document.getElementById("portfolioEmpty");
    const portfolioTitle = document.getElementById("portfolioCategoryTitle");
    const portfolioClose = document.getElementById("portfolioClose");
    const portfolioCounter = document.getElementById("portfolioCounter");

    let currentIndex = 0;
    let portfolioImages = [];

    function showImage(index) {
        if (!mainImage || portfolioImages.length === 0) return;
        currentIndex = (index + portfolioImages.length) % portfolioImages.length;
        const thumbs = [...thumbsBox.querySelectorAll(".thumb")];
        thumbs.forEach(item => item.classList.remove("active"));
        thumbs[currentIndex]?.classList.add("active");
        mainImage.src = portfolioImages[currentIndex].src;
        mainImage.alt = `${portfolioTitle.textContent} 샘플 ${currentIndex + 1}`;
        if (portfolioCounter) portfolioCounter.textContent = `${currentIndex + 1} / ${portfolioImages.length}`;
    }

    function rebuildPortfolioThumbs() {
        portfolioImages.sort((a, b) => a.number - b.number);
        thumbsBox.replaceChildren();
        portfolioImages.forEach((item, index) => {
            const thumb = document.createElement("button");
            thumb.type = "button";
            thumb.className = "thumb";
            thumb.setAttribute("aria-label", `${portfolioTitle.textContent} 샘플 ${index + 1} 보기`);
            thumb.addEventListener("click", () => showImage(index));
            thumbsBox.appendChild(thumb);
        });
        showImage(0);
    }

    function openPortfolioCategory(button) {
        const folder = button.dataset.portfolioFolder;
        const label = button.dataset.portfolioLabel;
        document.querySelectorAll(".portfolio-category").forEach(item => item.classList.toggle("active", item === button));
        portfolioTitle.textContent = `${label} 샘플`;
        portfolioLock.hidden = true;
        portfolioGallery.hidden = false;
        portfolioEmpty.hidden = true;
        portfolioViewer.hidden = true;
        mainImage.hidden = true;
        thumbsBox.replaceChildren();
        if (portfolioCounter) portfolioCounter.textContent = "";
        portfolioImages = [];
        currentIndex = 0;
        let finished = 0;

        for (let index = 1; index <= 20; index++) {
            const number = String(index).padStart(2, "0");
            const probe = new Image();
            const finishProbe = () => {
                finished++;
                if (finished !== 20) return;
                if (portfolioImages.length > 0) {
                    portfolioViewer.hidden = false;
                    mainImage.hidden = false;
                    portfolioEmpty.hidden = true;
                    rebuildPortfolioThumbs();
                } else {
                    portfolioEmpty.hidden = false;
                }
            };
            probe.onload = () => {
                portfolioImages.push({ number: index, src: probe.src });
                finishProbe();
            };
            probe.onerror = finishProbe;
            probe.src = `portfolio/${folder}/${number}.webp`;
        }
    }

    document.querySelectorAll(".portfolio-category").forEach(button => button.addEventListener("click", () => openPortfolioCategory(button)));
    const firstPortfolioCategory = document.querySelector(".portfolio-category");
    if (firstPortfolioCategory) openPortfolioCategory(firstPortfolioCategory);
    portfolioClose?.addEventListener("click", () => {
        portfolioGallery.hidden = true;
        portfolioLock.hidden = false;
        document.querySelectorAll(".portfolio-category").forEach(item => item.classList.remove("active"));
    });

    prevBtn?.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    /* ==========================
       Lightbox
    ========================== */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxClose = lightbox?.querySelector(".lightbox-close");

    mainImage?.addEventListener("click", () => {

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = mainImage.src;
        lightbox.classList.add("active");

    });

    lightboxClose?.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox?.addEventListener("click", e => {

        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }

    });

    /* ==========================
       Keyboard Navigation
    ========================== */

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (e.key === "Escape") {
            lightbox?.classList.remove("active");
        }

    });

    /* ==========================
       Lazy Loading
    ========================== */

    document.querySelectorAll("img[data-src]").forEach(img => {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                img.src = img.dataset.src;
                observer.unobserve(img);

            });

        });

        observer.observe(img);

    });

    /* ==========================
       Mobile Swipe
    ========================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const portfolioMain = document.querySelector(".portfolio-main");

    portfolioMain?.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    portfolioMain?.addEventListener("touchend", (e) => {

        touchEndX = e.changedTouches[0].clientX;

        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < 40) return;

        if (diff > 0) {
            showImage(currentIndex + 1);
        } else {
            showImage(currentIndex - 1);
        }

    }, { passive: true });

    /* ==========================
       Mouse Glow
    ========================== */

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    window.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

    /* ==========================
       Hero Scale
    ========================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const value = Math.min(window.scrollY * 0.0004, 0.08);

        hero.style.transform = `scale(${1 - value})`;
        hero.style.opacity = `${1 - value * 2}`;

    }, { passive: true });

    /* ==========================
       Navbar Blur
    ========================== */

    const floatingMenu = document.querySelector(".floating-menu");

    window.addEventListener("scroll", () => {

        if (!floatingMenu) return;

        if (window.scrollY > 40) {
            floatingMenu.style.background = "rgba(15,22,38,.72)";
            floatingMenu.style.backdropFilter = "blur(40px)";
        } else {
            floatingMenu.style.background = "rgba(255,255,255,.08)";
            floatingMenu.style.backdropFilter = "blur(30px)";
        }

    }, { passive: true });

    /* ==========================
       Floating Animation
    ========================== */

    document.querySelectorAll(".banner-card,.package-card")
    .forEach((item, index) => {

        item.animate(
            [
                { transform: "translateY(0px)" },
                { transform: "translateY(-8px)" },
                { transform: "translateY(0px)" }
            ],
            {
                duration: 5000 + index * 500,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    });

/* ==========================
   Hamster click party
========================== */
document.addEventListener("click", event => {
    const icons = ["hamster", "hamster", "hamster", "✦", "♡", "🐾", "✧"];
    icons.forEach((icon, index) => {
        const particle = document.createElement(icon === "hamster" ? "img" : "span");
        const angle = (Math.PI * 2 * index / icons.length) + (Math.random() - .5) * .35;
        const distance = 68 + Math.random() * 58;
        particle.className = "hamster-particle";
        if (icon === "hamster") {
            particle.classList.add("is-hamster");
            particle.src = "img/hamster-particle.png";
            particle.alt = "";
        } else {
            particle.textContent = icon;
        }
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        if (icon === "hamster") particle.style.width = `${56 + Math.random() * 18}px`;
        else particle.style.fontSize = `${20 + Math.random() * 8}px`;
        particle.style.setProperty("--hx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--hy", `${Math.sin(angle) * distance - 26}px`);
        particle.style.setProperty("--hr", `${-35 + Math.random() * 70}deg`);
        document.body.appendChild(particle);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });
    });
});

/* ==========================
   Avatar Pagination
========================== */

const avatarSection = document.getElementById("avatar");

if (avatarSection) {
    const avatarGrid = avatarSection.querySelector(".avatar-grid");
    avatarGrid.querySelectorAll(".avatar-card").forEach(card => {
        if (card.querySelector("h3")?.textContent.includes("아바타 이름")) card.remove();
    });

    const additionalAvatars = [
        ["시나노", "SHINANO", "avatar/shinano.webp"], ["아이리", "AIRI", "avatar/airi.webp"], ["밀티나", "MILTINA", "avatar/miltina.webp"],
        ["쇼콜라", "CHOCOLAT", "avatar/chocolat.webp"], ["쉬폰", "CHIFFON", "avatar/chiffon.webp"], ["라임", "LIME", "avatar/lime.webp"],
        ["시오", "SHIO", "avatar/shio.webp"], ["신라", "SHINRA", "avatar/shinra.webp"], ["루미나", "LUMINA", "avatar/lumina.webp"],
        ["이치고", "ICHIGO", "avatar/ichigo.webp"], ["마야", "MAYA", "avatar/maya.webp"], ["모에", "MOE", "avatar/moe.webp"],
        ["키펠", "KIPFEL", "avatar/kipfel.webp"], ["코마노", "KOMANO", "avatar/komano.webp"], ["한카", "HANKA", "avatar/hanka.webp"],
        ["미나세", "MINASE", "avatar/minase.webp"], ["리에", "RIER", "avatar/rier.webp"], ["알루에", "ALUE", "avatar/alue.webp"],
        ["카나타", "KANATA", "avatar/kanata.webp"], ["마메히나타", "MAMEHINATA", "avatar/mamehinata.webp"], ["셀레스티아", "SELESTIA", "avatar/selestia.webp"],
        ["카구야", "KAGUYA", "avatar/kaguya.webp"]
    ];
    additionalAvatars.forEach(([name, english, imagePath], index) => {
        const card = document.createElement("div");
        card.className = "avatar-card ripple";
        const hue = 205 + (index % 6) * 10;
        const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="hsl(${hue} 48% 94%)"/><stop offset="1" stop-color="hsl(${hue + 28} 52% 95%)"/></linearGradient></defs><rect width="360" height="360" fill="url(#g)"/><text x="50%" y="48%" text-anchor="middle" fill="#8792aa" font-size="21" font-family="sans-serif">${english}</text><text x="50%" y="59%" text-anchor="middle" fill="#99a2b4" font-size="13" font-family="sans-serif">ADD PHOTO</text></svg>`;
        const placeholderSrc = `data:image/svg+xml,${encodeURIComponent(placeholder)}`;
        card.innerHTML = `<img src="${imagePath || placeholderSrc}" loading="lazy" alt="${name} 이미지"><h3>${name} <span>| ${english}</span></h3>`;
        if (imagePath) card.querySelector("img").addEventListener("error", event => { event.currentTarget.src = placeholderSrc; }, { once: true });
        avatarGrid.appendChild(card);
    });
    const avatarCards = Array.from(avatarSection.querySelectorAll(".avatar-card"));
    const avatarPrev = avatarSection.querySelector(".avatar-page-prev");
    const avatarNext = avatarSection.querySelector(".avatar-page-next");
    const avatarPageButtons = avatarSection.querySelector(".avatar-page-buttons");
    const avatarStatus = avatarSection.querySelector(".avatar-page-status");
    const mobileQuery = window.matchMedia("(max-width: 680px)");
    let avatarPage = 0;

    avatarCards.forEach((card, index) => {
        card.tabIndex = 0;
        card.setAttribute("role", "group");
        card.setAttribute("aria-label", `${index + 1}번째 보유 아바타: ${card.querySelector("h3")?.innerText || "아바타"}`);
    });

    function avatarPageSize() {
        return mobileQuery.matches ? 2 : 8;
    }

    function showAvatarPage(page, options = {}) {
        const pageSize = avatarPageSize();
        const pageCount = Math.max(1, Math.ceil(avatarCards.length / pageSize));
        avatarPage = Math.min(Math.max(page, 0), pageCount - 1);
        const start = avatarPage * pageSize;
        const end = start + pageSize;

        avatarCards.forEach((card, index) => {
            const visible = index >= start && index < end;
            card.hidden = !visible;
            card.classList.toggle("avatar-page-enter", visible);
        });

        avatarPageButtons.replaceChildren();
        for (let index = 0; index < pageCount; index++) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = String(index + 1);
            button.setAttribute("aria-label", `${index + 1}페이지`);
            if (index === avatarPage) {
                button.classList.add("active");
                button.setAttribute("aria-current", "page");
            }
            button.addEventListener("click", () => showAvatarPage(index, { announce: true }));
            avatarPageButtons.appendChild(button);
        }

        avatarPrev.disabled = avatarPage === 0;
        avatarNext.disabled = avatarPage === pageCount - 1;
        avatarSection.querySelector(".avatar-pagination").hidden = pageCount <= 1;
        avatarStatus.textContent = `보유 아바타 ${avatarPage + 1}/${pageCount}페이지, ${start + 1}번부터 ${Math.min(end, avatarCards.length)}번까지 표시`;

        if (options.focus) {
            avatarCards[start]?.focus({ preventScroll: true });
        }
    }

    avatarPrev.addEventListener("click", () => showAvatarPage(avatarPage - 1, { announce: true, focus: true }));
    avatarNext.addEventListener("click", () => showAvatarPage(avatarPage + 1, { announce: true, focus: true }));

    avatarSection.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft" && avatarPage > 0) {
            event.preventDefault();
            showAvatarPage(avatarPage - 1, { announce: true, focus: true });
        }
        if (event.key === "ArrowRight" && avatarPage < Math.ceil(avatarCards.length / avatarPageSize()) - 1) {
            event.preventDefault();
            showAvatarPage(avatarPage + 1, { announce: true, focus: true });
        }
    });

    let avatarTouchStartX = 0;
    avatarGrid.addEventListener("touchstart", event => {
        avatarTouchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    avatarGrid.addEventListener("touchend", event => {
        const distance = avatarTouchStartX - event.changedTouches[0].clientX;
        if (Math.abs(distance) < 45) return;
        showAvatarPage(avatarPage + (distance > 0 ? 1 : -1), { announce: true });
    }, { passive: true });

    const resetAvatarPagination = () => showAvatarPage(0);
    mobileQuery.addEventListener?.("change", resetAvatarPagination);
    showAvatarPage(0);
}

/* ==========================
   Request estimator
========================== */
const estimateSection = document.getElementById("estimate");
if (estimateSection) {
    const packageInputs = [...estimateSection.querySelectorAll('input[name="estimatePackage"]')];
    const optionInputs = [...estimateSection.querySelectorAll('#estimateOptions input')];
    const nameInput = document.getElementById("requestName");
    const channelInput = document.getElementById("requestChannel");
    const contactInput = document.getElementById("requestContact");
    const programInput = document.getElementById("requestProgram");
    const deadlineInput = document.getElementById("requestDeadline");
    const referenceInput = document.getElementById("requestReference");
    const memoInput = document.getElementById("requestMemo");
    const confirmMinus = document.getElementById("confirmMinus");
    const confirmPlus = document.getElementById("confirmPlus");
    const confirmCountOutput = document.getElementById("confirmCount");
    const confirmPriceOutput = document.getElementById("confirmPrice");
    const totalOutput = document.getElementById("estimateTotal");
    const summaryOutput = document.getElementById("estimateSummary");
    const copyButton = document.getElementById("estimateCopy");
    const resetButton = document.getElementById("estimateReset");
    let requestText = "";
    let confirmCount = 0;

    function updateEstimate() {
        const selectedPackage = packageInputs.find(input => input.checked) || packageInputs[0];
        const selectedOptions = optionInputs.filter(input => input.checked);
        const total = Number(selectedPackage.dataset.price) + selectedOptions.reduce((sum, input) => sum + Number(input.dataset.price), 0) + confirmCount * 5000;
        const selectedOptionNames = selectedOptions.map(input => input.value);
        if (confirmCount) selectedOptionNames.push(`추가 컨펌 ${confirmCount}회`);
        const optionText = selectedOptionNames.length ? selectedOptionNames.join(", ") : "선택 없음";
        confirmCountOutput.textContent = String(confirmCount);
        confirmPriceOutput.textContent = `+${(confirmCount * 5000).toLocaleString("ko-KR")}원`;
        confirmMinus.disabled = confirmCount === 0;
        confirmPlus.disabled = confirmCount === 10;
        totalOutput.textContent = `${total.toLocaleString("ko-KR")}원`;
        summaryOutput.textContent = `패키지  ${selectedPackage.value}\n추가 옵션  ${optionText}`;
        requestText = `[커미션 견적 상담]\n방송 닉네임: ${nameInput.value.trim() || "미입력"}\n방송국 주소: ${channelInput.value.trim() || "미입력"}\n상담 연락처: ${contactInput.value.trim() || "미입력"}\n패키지: ${selectedPackage.value}\n추가 옵션: ${optionText}\n사용 프로그램: ${programInput.value}\n희망 마감일: ${deadlineInput.value || "미정"}\n자료 링크: ${referenceInput.value.trim() || "미입력"}\n요청사항: ${memoInput.value.trim() || "미입력"}\n예상 견적: ${total.toLocaleString("ko-KR")}원\n\n※ 자동 계산된 상담용 예상 금액이며 최종 견적은 자료 확인 후 확정됩니다.`;
    }

    async function copyRequest() {
        updateEstimate();
        try {
            await navigator.clipboard.writeText(requestText);
        } catch (error) {
            const helper = document.createElement("textarea");
            helper.value = requestText;
            helper.style.position = "fixed";
            helper.style.opacity = "0";
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            helper.remove();
        }
        copyButton.textContent = "복사되었어요 ✓";
        window.setTimeout(() => copyButton.textContent = "의뢰 내용 복사", 1800);
    }

    [...packageInputs, ...optionInputs, nameInput, channelInput, contactInput, programInput, deadlineInput, referenceInput, memoInput].forEach(input => {
        input.addEventListener("input", updateEstimate);
        input.addEventListener("change", updateEstimate);
    });
    confirmMinus.addEventListener("click", () => { confirmCount = Math.max(0, confirmCount - 1); updateEstimate(); });
    confirmPlus.addEventListener("click", () => { confirmCount = Math.min(10, confirmCount + 1); updateEstimate(); });
    copyButton.addEventListener("click", copyRequest);
    resetButton.addEventListener("click", () => {
        packageInputs[0].checked = true;
        optionInputs.forEach(input => input.checked = false);
        confirmCount = 0;
        nameInput.value = "";
        channelInput.value = "";
        contactInput.value = "";
        programInput.selectedIndex = 0;
        deadlineInput.value = "";
        referenceInput.value = "";
        memoInput.value = "";
        updateEstimate();
    });
    updateEstimate();
}
