/* Site interactions and easter eggs */
(function () {
  const THEME_KEY = "babijon-theme";
  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme =
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.body.classList.toggle("theme-dark", initialTheme === "dark");
  document.body.classList.toggle("theme-light", initialTheme !== "dark");

  const path = window.location.pathname;
  if (path.includes("work.html")) {
    document.body.classList.add("page-work");
  }

  // Theme toggle
  const nav = document.querySelector(".nav");
  let themeToggle = null;
  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-light", !isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.textContent = isDark ? "Светлая тема" : "Тёмная тема";
      themeToggle.title = isDark
        ? "Переключиться на светлую тему"
        : "Переключиться на тёмную тему";
    }
  };

  if (nav) {
    themeToggle = document.createElement("button");
    themeToggle.type = "button";
    themeToggle.className = "theme-toggle";
    themeToggle.addEventListener("click", () => {
      const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
      applyTheme(next);
    });
    nav.appendChild(themeToggle);
    applyTheme(document.body.classList.contains("theme-dark") ? "dark" : "light");
  }

  const buildMobileNav = () => {
    if (!nav || document.querySelector(".mobile-nav") || document.querySelector(".mobile-menu-toggle")) return;
    const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = Array.from(nav.querySelectorAll("nav a[href]"))
      .map((a) => ({
        href: a.getAttribute("href"),
        label: (a.textContent || "").trim()
      }))
      .filter((item) => item.href && item.href.endsWith(".html"));

    const unique = [];
    const used = new Set();
    links.forEach((item) => {
      if (!used.has(item.href)) {
        used.add(item.href);
        unique.push(item);
      }
    });

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "mobile-nav");
    toggle.setAttribute("aria-label", "Открыть меню");
    toggle.textContent = "Меню";
    nav.appendChild(toggle);

    const backdrop = document.createElement("div");
    backdrop.className = "mobile-nav-backdrop";

    const mobile = document.createElement("aside");
    mobile.className = "mobile-nav";
    mobile.id = "mobile-nav";
    mobile.setAttribute("aria-label", "Мобильная навигация");

    const header = document.createElement("div");
    header.className = "mobile-nav-header";
    const title = document.createElement("div");
    title.className = "mobile-nav-title";
    title.textContent = "Навигация";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "mobile-nav-close";
    close.setAttribute("aria-label", "Закрыть меню");
    close.textContent = "×";
    header.appendChild(title);
    header.appendChild(close);

    const list = document.createElement("div");
    list.className = "mobile-nav-list";
    const iconSvgByHref = {
      "index.html": '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M3 10.8L12 3l9 7.8v9.2a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z"/></svg>',
      "work.html": '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M2 7a2 2 0 0 1 2-2h4l2 2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>',
      "about.html": '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12m0 2c-4.1 0-7.5 2.2-7.5 5V21h15v-2c0-2.8-3.4-5-7.5-5"/></svg>',
      "testimonials.html": '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>',
      "contact.html": '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 0l7 5 7-5z"/></svg>'
    };
    unique.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.className = "mobile-nav-link";
      link.style.setProperty("--i", String(list.children.length));
      if (page === item.href.toLowerCase() || (page === "" && item.href === "index.html")) {
        link.classList.add("active");
      }
      const icon = document.createElement("span");
      icon.className = "mobile-nav-link-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = iconSvgByHref[item.href] || '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="3"/></svg>';
      const label = document.createElement("span");
      label.className = "mobile-nav-link-label";
      label.textContent = item.label || item.href;
      link.appendChild(icon);
      link.appendChild(label);
      list.appendChild(link);
    });

    const mobileTheme = document.createElement("button");
    mobileTheme.type = "button";
    mobileTheme.className = "mobile-theme-toggle";
    mobileTheme.style.setProperty("--i", String(list.children.length + 1));
    mobileTheme.textContent = "Переключить тему";
    mobileTheme.addEventListener("click", () => {
      const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
      applyTheme(next);
    });

    mobile.appendChild(header);
    mobile.appendChild(list);
    mobile.appendChild(mobileTheme);
    document.body.appendChild(backdrop);
    document.body.appendChild(mobile);

    const closeMenu = () => {
      document.body.classList.remove("mobile-nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    };
    const openMenu = () => {
      document.body.classList.add("mobile-nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Закрыть меню");
    };

    toggle.addEventListener("click", () => {
      const opened = document.body.classList.contains("mobile-nav-open");
      if (opened) closeMenu();
      else openMenu();
    });
    close.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
    list.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  };

  buildMobileNav();

  const buildQuickContactDock = () => {
    if (document.querySelector(".quick-contact-fab") || document.querySelector(".quick-contact-panel")) return;

    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "quick-contact-fab";
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-controls", "quick-contact-panel");
    fab.setAttribute("aria-label", "Открыть контакты");
    fab.textContent = "Контакты";

    const panel = document.createElement("aside");
    panel.className = "quick-contact-panel";
    panel.id = "quick-contact-panel";
    panel.setAttribute("aria-label", "Быстрые контакты");
    panel.innerHTML = `
      <div class="quick-contact-panel-title">Связь со студией</div>
      <a class="quick-contact-panel-link" href="https://t.me/Welika_00" target="_blank" rel="noopener noreferrer">Телеграм: @Welika_00</a>
      <a class="quick-contact-panel-link" href="mailto:jadeloomwear@gmail.com">Почта: jadeloomwear@gmail.com</a>
      <a class="quick-contact-panel-link" href="tel:+79940057901">Телефон: +7 994 005 79 01</a>
      <a class="quick-contact-panel-link" href="contact.html">Все контакты</a>
    `;

    const backdrop = document.createElement("div");
    backdrop.className = "quick-contact-backdrop";

    const closeDock = () => {
      document.body.classList.remove("quick-contact-open");
      fab.setAttribute("aria-expanded", "false");
    };
    const openDock = () => {
      document.body.classList.add("quick-contact-open");
      fab.setAttribute("aria-expanded", "true");
    };

    fab.addEventListener("click", () => {
      const opened = document.body.classList.contains("quick-contact-open");
      if (opened) closeDock();
      else openDock();
    });
    backdrop.addEventListener("click", closeDock);
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDock);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDock();
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(fab);
  };

  buildQuickContactDock();

  // Work cards wiggle on hover
  document.querySelectorAll(".work-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.animation = "wiggle 0.5s ease-in-out";
    });
    item.addEventListener("animationend", () => {
      item.style.animation = "";
    });
  });

  // Mascot interaction (work page)
  const pandaContainer = document.querySelector(".panda-container");
  const crunchSound = document.getElementById("crunch-sound");
  if (pandaContainer && crunchSound) {
    const stage = pandaContainer.querySelector(".mascot-stage");
    const bamboo = pandaContainer.querySelector(".bamboo-svg");
    const segments = Array.from(pandaContainer.querySelectorAll(".bamboo-seg")).reverse();
    const leaves = Array.from(pandaContainer.querySelectorAll(".bamboo-leaf"));
    const crumbsContainer = pandaContainer.querySelector(".crumbs");
    const mouth = pandaContainer.querySelector(".panda-mouth");
    const hint = pandaContainer.querySelector(".panda-hint");
    let eatingLock = false;

    const setHint = (text) => {
      if (hint) hint.textContent = text;
    };

    const syncCrumbsToMouth = () => {
      if (!crumbsContainer || !mouth || !stage) return;
      const stageRect = stage.getBoundingClientRect();
      const mouthRect = mouth.getBoundingClientRect();
      const left = mouthRect.left - stageRect.left + mouthRect.width * 0.52;
      const top = mouthRect.top - stageRect.top + mouthRect.height * 0.5;
      crumbsContainer.style.left = `${left}px`;
      crumbsContainer.style.top = `${top}px`;
    };

    const spawnCrumbBurst = (amount = 6) => {
      if (!crumbsContainer) return;
      for (let i = 0; i < amount; i++) {
        const crumb = document.createElement("div");
        crumb.className = "crumb";
        crumb.style.left = `${-4 + Math.random() * 10}px`;
        crumb.style.top = `${-3 + Math.random() * 8}px`;
        crumb.style.setProperty("--tx", `${10 + Math.random() * 30}px`);
        crumb.style.setProperty("--ty", `${-14 - Math.random() * 16}px`);
        crumb.style.setProperty("--dur", `${620 + Math.random() * 420}ms`);
        crumbsContainer.appendChild(crumb);
        requestAnimationFrame(() => crumb.classList.add("show"));
        setTimeout(() => crumb.remove(), 1200);
      }
    };

    const playCrunch = () => {
      crunchSound.volume = 0.65;
      crunchSound.currentTime = 0;
      const promise = crunchSound.play();
      if (promise) promise.catch(() => {});
    };

    const runEatSequence = () => {
      if (!bamboo || !segments.length || eatingLock) return;
      eatingLock = true;
      const preBiteDelay = 240;
      setHint("Панда берёт бамбук лапкой...");
      pandaContainer.classList.add("pre-bite");
      pandaContainer.classList.remove("satisfied");
      syncCrumbsToMouth();

      setTimeout(() => {
        pandaContainer.classList.remove("pre-bite");
        pandaContainer.classList.add("eating");
        bamboo.classList.add("bamboo-tilt");
        setHint("Маскот с удовольствием жуёт бамбук...");
      }, preBiteDelay);

      segments.forEach((segment, index) => {
        setTimeout(() => {
          if (mouth) {
            mouth.classList.add("bite");
            setTimeout(() => mouth.classList.remove("bite"), 180);
          }
          segment.classList.add("eaten");
          const leaf = leaves[index];
          if (leaf) leaf.classList.add("eaten");
          spawnCrumbBurst(6);
          playCrunch();
        }, preBiteDelay + 260 * index);
      });

      const finishTime = preBiteDelay + 260 * segments.length + 520;
      setTimeout(() => {
        pandaContainer.classList.remove("pre-bite");
        pandaContainer.classList.remove("eating");
        bamboo.classList.remove("bamboo-tilt");
        segments.forEach((segment) => segment.classList.remove("eaten"));
        leaves.forEach((leaf) => leaf.classList.remove("eaten"));
        if (mouth) mouth.classList.remove("bite");
        pandaContainer.classList.add("satisfied");
        setHint("Панда довольна. Бамбук обновился, можно повторить.");
        setTimeout(() => {
          pandaContainer.classList.remove("satisfied");
          setHint("Привет, я Бабиджон");
        }, 620);
        eatingLock = false;
      }, finishTime);
    };

    pandaContainer.addEventListener("click", runEatSequence);
    window.addEventListener("resize", syncCrumbsToMouth);
    pandaContainer.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        runEatSequence();
      }
    });
    syncCrumbsToMouth();
  }

  // Hero tilt effect
  const tilt = document.getElementById("tilt");
  if (tilt) {
    tilt.addEventListener("mousemove", (event) => {
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const card = tilt.querySelector(".card");
      if (!card) return;
      const rx = (-y * 8).toFixed(2);
      const ry = (x * 12).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(20px) scale(1.02)`;
    });
    tilt.addEventListener("mouseleave", () => {
      const card = tilt.querySelector(".card");
      if (!card) return;
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)";
    });
  }

  // Entrance animation
  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    const items = document.querySelectorAll(
      ".nav, .title, .lead, .btn, .work-item, .testimonial, .work h2, .about h2, .contact h2, .testimonials-page h2, .footer, .hero-visual, .color-palette"
    );
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      setTimeout(() => {
        item.style.transition = "all 800ms cubic-bezier(.25,.46,.45,.94)";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 300 + index * 100);
    });
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetSelector = this.getAttribute("href");
      if (!targetSelector || targetSelector === "#") return;
      const target = document.querySelector(targetSelector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Fade-in sections on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".work, .about, .contact, .testimonials-page, .work-item, .testimonial")
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "all 1s cubic-bezier(.25,.46,.45,.94)";
      observer.observe(section);
    });

  // Color palette interaction
  const renoEffects = ["reno-effect-grout", "reno-effect-roller", "reno-effect-tiles", "reno-effect-drill"];
  const renoPalettes = {
    grout: {
      accent: "#d2a43d",
      accent2: "#9d6f26",
      glow1: "rgba(210, 164, 61, 0.2)",
      glow2: "rgba(121, 88, 44, 0.12)"
    },
    roller: {
      accent: "#cc7c44",
      accent2: "#9d4f26",
      glow1: "rgba(204, 124, 68, 0.22)",
      glow2: "rgba(186, 110, 62, 0.15)"
    },
    tiles: {
      accent: "#8ea39f",
      accent2: "#6a7d79",
      glow1: "rgba(142, 163, 159, 0.2)",
      glow2: "rgba(109, 130, 125, 0.15)"
    },
    drill: {
      accent: "#8b7355",
      accent2: "#64513b",
      glow1: "rgba(139, 115, 85, 0.22)",
      glow2: "rgba(95, 79, 59, 0.18)"
    }
  };

  document.querySelectorAll(".color").forEach((color, index) => {
    color.addEventListener("click", () => {
      color.style.transform = "scale(1.2)";
      setTimeout(() => {
        color.style.transform = "";
      }, 300);

      const inAbout = Boolean(color.closest(".about"));
      if (!inAbout) {
        alert(`Вы выбрали цвет: ${color.title || "неизвестный"}`);
        return;
      }

      const effectKey = color.dataset.effect || ["grout", "roller", "tiles", "drill"][index % 4];
      const palette = renoPalettes[effectKey];
      if (!palette) return;

      renoEffects.forEach((cls) => document.body.classList.remove(cls));
      document.body.classList.add(`reno-effect-${effectKey}`);

      document.body.style.setProperty("--accent", palette.accent);
      document.body.style.setProperty("--accent-2", palette.accent2);
      document.body.style.setProperty("--bg-glow-1", palette.glow1);
      document.body.style.setProperty("--bg-glow-2", palette.glow2);
    });
  });

  // Runner cat easter egg
  let runnerInProgress = false;
  let runnerElement = null;

  const buildRunner = () => {
    if (runnerElement) return runnerElement;
    const el = document.createElement("div");
    el.className = "tricolor-runner";
    el.innerHTML = `
      <div class="runner-cat">
        <div class="runner-ear left"></div>
        <div class="runner-ear right"></div>
        <div class="runner-face">
          <span class="runner-cheek left"></span>
          <span class="runner-cheek right"></span>
          <span class="runner-eye left"></span>
          <span class="runner-eye right"></span>
          <span class="runner-nose"></span>
          <span class="runner-whisker l1"></span>
          <span class="runner-whisker l2"></span>
          <span class="runner-whisker r1"></span>
          <span class="runner-whisker r2"></span>
          <span class="runner-mouth"></span>
        </div>
        <span class="runner-patch orange"></span>
        <span class="runner-patch black"></span>
        <span class="runner-patch white"></span>
        <span class="runner-tail"></span>
        <span class="runner-leg lf"></span>
        <span class="runner-leg rf"></span>
        <span class="runner-leg lb"></span>
        <span class="runner-leg rb"></span>
      </div>`;
    document.body.appendChild(el);
    runnerElement = el;
    return el;
  };

  const collectAboutHeadingPoints = () => {
    const heading = Array.from(document.querySelectorAll(".about h2")).find((el) =>
      (el.textContent || "").toLowerCase().includes("о сашуле")
    );
    if (!heading) return [];

    const words = [];
    let regex;
    try {
      regex = /[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu;
    } catch (_) {
      regex = /[A-Za-zА-Яа-яЁё0-9]+(?:[-'][A-Za-zА-Яа-яЁё0-9]+)*/g;
    }

    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const text = node.textContent || "";
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        if (rect.width > 4 && rect.height > 6) {
          words.push({
            text: match[0].toLowerCase(),
            rect
          });
        }
      }
      node = walker.nextNode();
    }

    const picked = words.filter((w) => w.text === "о" || w.text.startsWith("сашул"));
    const source = picked.length >= 2 ? picked : words.slice(0, 2);
    if (!source.length) return [];
    source.sort((a, b) => a.rect.left - b.rect.left);

    const points = [];
    source.forEach((entry, idx) => {
      const rect = entry.rect;
      const y = rect.top + rect.height * 0.7;
      const steps = idx === source.length - 1 ? 9 : 7;
      for (let i = 0; i < steps; i++) {
        const t = steps === 1 ? 0 : i / (steps - 1);
        points.push({
          x: rect.left + rect.width * t,
          y
        });
      }
    });

    return points;
  };

  const spawnPawprint = (x, y) => {
    const paw = document.createElement("span");
    paw.className = "runner-pawprint";
    paw.style.left = `${x}px`;
    paw.style.top = `${y}px`;
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 900);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runCatAcrossWords = async () => {
    if (runnerInProgress) return;
    const points = collectAboutHeadingPoints();
    if (points.length < 2) return;

    runnerInProgress = true;
    const runner = buildRunner();
    runner.classList.add("is-running");
    runner.classList.remove("is-jumping");
    runner.classList.remove("hide");

    let prev = points[0];
    let flip = 1;
    runner.style.setProperty("--x", prev.x.toFixed(2));
    runner.style.setProperty("--y", (prev.y - 18).toFixed(2));
    runner.style.setProperty("--flip", "1");
    await delay(40);

    for (let i = 1; i < points.length; i++) {
      const next = points[i];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const dist = Math.hypot(dx, dy);
      const duration = Math.max(120, Math.min(280, dist * 2.6));
      flip = dx >= 0 ? 1 : -1;

      runner.style.transition = `transform ${duration}ms cubic-bezier(.22,.71,.2,1)`;
      runner.style.setProperty("--flip", String(flip));
      runner.style.setProperty("--x", next.x.toFixed(2));
      runner.style.setProperty("--y", (next.y - 18).toFixed(2));

      if (i % 2 === 0) {
        spawnPawprint(next.x - 6 * flip, next.y + 6);
      }

      await delay(duration);
      prev = next;
    }

    // jump down after "О студии"
    const jumpX = prev.x + 26 * flip;
    const jumpY = prev.y + 88;
    runner.classList.add("is-jumping");
    runner.style.transition = "transform 460ms cubic-bezier(.22,.68,.18,1.05)";
    runner.style.setProperty("--x", jumpX.toFixed(2));
    runner.style.setProperty("--y", (jumpY - 18).toFixed(2));
    spawnPawprint(jumpX, jumpY + 4);
    await delay(460);

    runner.classList.remove("is-running");
    runner.classList.remove("is-jumping");
    runner.classList.add("hide");
    await delay(260);
    runnerInProgress = false;
  };

  document.querySelectorAll(".easter-trigger").forEach((trigger) => {
    const id = trigger.dataset.target;
    const target = id ? document.getElementById(id) : null;

    if (trigger.classList.contains("easter-trigger-runner")) {
      const launch = () => {
        if (target) {
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
          setTimeout(() => {
            target.style.opacity = "0";
            target.style.transform = "translateY(6px)";
          }, 500);
        }
        runCatAcrossWords();
      };
      trigger.addEventListener("mouseenter", launch);
      trigger.addEventListener("focus", launch);
      trigger.addEventListener("click", launch);
      return;
    }

    if (!target) return;
    trigger.addEventListener("mouseenter", () => {
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    });
    trigger.addEventListener("mouseleave", () => {
      target.style.opacity = "0";
      target.style.transform = "translateY(6px)";
    });
    trigger.addEventListener("focus", () => {
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    });
    trigger.addEventListener("blur", () => {
      target.style.opacity = "0";
      target.style.transform = "translateY(6px)";
    });
    trigger.addEventListener("click", () => {
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
      setTimeout(() => {
        target.style.opacity = "0";
        target.style.transform = "translateY(6px)";
      }, 1200);
    });
  });

  // Page transitions for internal links
  document.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }
    anchor.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank"
      ) {
        return;
      }
      event.preventDefault();
      document.body.classList.add("page-exit-active");
      setTimeout(() => {
        window.location.href = href;
      }, 320);
    });
  });

  // Contact page behavior
  const showPhoneBtn = document.getElementById("show-phone");
  const phoneLink = document.getElementById("phone-link");
  if (showPhoneBtn && phoneLink) {
    showPhoneBtn.addEventListener("click", () => {
      phoneLink.hidden = false;
      showPhoneBtn.hidden = true;
    });
  }

})();

