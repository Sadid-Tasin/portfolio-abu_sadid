document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ============================================================
    // 1. "400+ PROBLEMS SOLVED" COUNTER
    // ============================================================
    const counterElements = document.querySelectorAll(".problems-counter-val");
    function animateCounter(el) {
        if (prefersReducedMotion) { el.textContent = "400+"; return; }
        const startVal = 1, targetVal = 400, duration = 1000;
        const startTime = performance.now();
        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(startVal + (targetVal - startVal) * easeOutProgress);
            if (progress < 1) { el.textContent = currentCount; requestAnimationFrame(updateCount); }
            else { el.textContent = "400+"; }
        }
        requestAnimationFrame(updateCount);
    }
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => { if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); } });
        }, { threshold: 0.2 });
        counterElements.forEach((el) => counterObserver.observe(el));
    }

    // ============================================================
    // 2. SECTION 4: WHAT I WORK WITH (EXACT SCREENSHOT REPLICA)
    // ============================================================
    const techData = {
        cpp: {
            title: "C++", category: "CORE LANGUAGE & CP", profText: "92%", profWidth: "92%",
            desc: "Building strong foundations in problem solving, data structures, algorithms, and competitive programming using C++.",
            tags: ["OOP", "Pointers", "Memory Mgmt", "STL"],
            icon: "fa-solid fa-code", color: "#3b82f6"
        },
        java: {
            title: "Java", category: "OBJECT-ORIENTED PROGRAMMING", profText: "85%", profWidth: "85%",
            desc: "Exploring object-oriented programming concepts and enterprise application development architectures.",
            tags: ["Classes", "Inheritance", "JVM", "Spring Base"],
            icon: "fa-brands fa-java", color: "#f59e0b"
        },
        python: {
            title: "Python", category: "SCRIPTING & AI", profText: "78%", profWidth: "78%",
            desc: "Learning Python for software development, automation scripts, and future Artificial Intelligence/ML work.",
            tags: ["Automation", "Data Handling", "AI/ML Base", "Scripts"],
            icon: "fa-brands fa-python", color: "#eab308"
        },
        dsa: {
            title: "DSA", category: "CORE CONCEPT", profText: "95%", profWidth: "95%",
            desc: "Deep focus on Data Structures and Algorithms. Mastering trees, graphs, dynamic programming, and optimization.",
            tags: ["Graphs", "Trees", "DP", "Complexity"],
            icon: "fa-solid fa-diagram-project", color: "#10b981"
        },
        cp: {
            title: "Competitive Prog.", category: "PROBLEM SOLVING", profText: "88%", profWidth: "88%",
            desc: "Active participant in programming contests. Focused on algorithmic thinking and writing time-efficient code.",
            tags: ["Codeforces", "Beecrowd", "Math", "Logic"],
            icon: "fa-solid fa-trophy", color: "#cf1767"
        },
        webdev: {
            title: "Web Dev", category: "FRONTEND & BACKEND", profText: "70%", profWidth: "70%",
            desc: "Learning to turn ideas into responsive web experiences. Working with modern HTML, CSS, JavaScript, and frameworks.",
            tags: ["HTML/CSS", "JavaScript", "React", "Responsive"],
            icon: "fa-solid fa-globe", color: "#06b6d4"
        },
        ai: {
            title: "Artificial Intel.", category: "EMERGING TECH", profText: "60%", profWidth: "60%",
            desc: "Exploring the fundamentals of artificial intelligence, intelligent agents, and search algorithms.",
            tags: ["Heuristics", "Search Algorithms", "Logic Models"],
            icon: "fa-solid fa-brain", color: "#8b5cf6"
        },
        ml: {
            title: "Machine Learning", category: "DATA SCIENCE", profText: "65%", profWidth: "65%",
            desc: "Building mathematical foundations (Linear Algebra, Calculus, Stats) required for modern Machine Learning models.",
            tags: ["Math", "Data Models", "Statistics", "PyTorch"],
            icon: "fa-solid fa-robot", color: "#ec4899"
        }
    };

    const ssNodes = document.querySelectorAll(".ss-node");
    const ssPanelIcon = document.querySelector("#panel-icon i");
    const ssPanelIconBox = document.getElementById("panel-icon");
    const ssPanelTitle = document.getElementById("panel-title");
    const ssPanelCategory = document.getElementById("panel-category");
    const ssPanelProfText = document.getElementById("panel-prof-text");
    const ssPanelDesc = document.getElementById("panel-desc");
    const ssPanelTags = document.getElementById("panel-tags");
    const ssPanelProfFill = document.getElementById("panel-prof-fill");

    const ssActiveLine = document.getElementById("tech-active-line");
    const ssOrbitContainer = document.getElementById("orbit-container");

    let currentSSNode = document.querySelector(".ss-node.active");

    function hexToRgba(hex, opacity) {
        let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    function updateSSPanel(id) {
        const data = techData[id];
        if (!data) return;

        ssPanelTitle.textContent = data.title;
        ssPanelCategory.textContent = data.category;
        ssPanelCategory.style.color = data.color;
        ssPanelProfText.textContent = data.profText;
        ssPanelDesc.textContent = data.desc;

        ssPanelIcon.className = data.icon;
        ssPanelIconBox.style.color = data.color;
        ssPanelIconBox.style.background = hexToRgba(data.color, 0.1);
        ssPanelIconBox.style.borderColor = hexToRgba(data.color, 0.3);

        ssPanelTags.innerHTML = "";
        data.tags.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag;
            ssPanelTags.appendChild(span);
        });

        ssPanelProfFill.style.width = data.profWidth;
        ssPanelProfFill.style.background = `linear-gradient(90deg, ${data.color}, #ffffff)`;

        if (ssActiveLine) {
            ssActiveLine.setAttribute("stroke", data.color);
        }
    }

    if (currentSSNode) {
        updateSSPanel(currentSSNode.getAttribute("data-id"));
    }

    ssNodes.forEach(node => {
        node.addEventListener("click", () => {
            ssNodes.forEach(n => n.classList.remove("active"));
            node.classList.add("active");
            currentSSNode = node;
            updateSSPanel(node.getAttribute("data-id"));
        });
    });

    function trackActiveNode() {
        if (currentSSNode && ssActiveLine && ssOrbitContainer) {
            const containerRect = ssOrbitContainer.getBoundingClientRect();
            const nodeRect = currentSSNode.getBoundingClientRect();

            const startX = containerRect.width / 2;
            const startY = containerRect.height / 2;

            const endX = (nodeRect.left - containerRect.left) + nodeRect.width / 2;
            const endY = (nodeRect.top - containerRect.top) + nodeRect.height / 2;

            ssActiveLine.setAttribute("x1", startX);
            ssActiveLine.setAttribute("y1", startY);
            ssActiveLine.setAttribute("x2", endX);
            ssActiveLine.setAttribute("y2", endY);
        }
        requestAnimationFrame(trackActiveNode);
    }
    trackActiveNode();

    // ============================================================
    // 3. SECTION 6: "THE JOURNEY" SCROLL-DRIVEN LINE & NODES
    // ============================================================
    const journeySection = document.getElementById("journey");
    const journeyPathGlow = document.getElementById("journeyPathGlow");
    const journeyPathBg = document.getElementById("journeyPathBg");
    const journeyMilestones = document.querySelectorAll(".journey-milestone");

    if (journeySection && journeyPathGlow) {
        let pathLength = journeyPathGlow.getTotalLength();
        journeyPathGlow.style.strokeDasharray = `${pathLength} ${pathLength}`;
        journeyPathGlow.style.strokeDashoffset = pathLength;

        function updateJourneyPath() {
            const rect = journeySection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalScrollableDistance = rect.height - windowHeight / 2;
            const currentScrollPosition = windowHeight / 2 - rect.top;
            let progress = currentScrollPosition / totalScrollableDistance;
            progress = Math.max(0, Math.min(1, progress));

            if (prefersReducedMotion) {
                journeyPathGlow.style.strokeDashoffset = 0;
                journeyMilestones.forEach(m => m.classList.add("active"));
                return;
            }

            const drawLength = pathLength * progress;
            journeyPathGlow.style.strokeDashoffset = pathLength - drawLength;
            const totalMilestones = journeyMilestones.length;
            journeyMilestones.forEach((milestone, index) => {
                const threshold = index / (totalMilestones - 1);
                if (progress >= threshold - 0.05) {
                    milestone.classList.add("active"); milestone.classList.remove("dimmed");
                } else {
                    milestone.classList.remove("active"); if (progress > 0) milestone.classList.add("dimmed");
                }
            });
        }
        function handleResponsivePath() {
            if (window.innerWidth <= 768 && journeyPathBg) {
                const containerHeight = document.getElementById("journeyMap").offsetHeight;
                const pathD = `M 35 30 L 35 ${containerHeight - 40}`;
                journeyPathBg.setAttribute("d", pathD); journeyPathGlow.setAttribute("d", pathD);
            } else if (journeyPathBg) {
                const pathD = "M 120 70 L 880 70 L 880 200 L 120 200 L 120 330 L 880 330 L 880 460 L 120 460 L 120 590 L 880 590 L 880 720 L 500 720";
                journeyPathBg.setAttribute("d", pathD); journeyPathGlow.setAttribute("d", pathD);
            }
            pathLength = journeyPathGlow.getTotalLength();
            journeyPathGlow.style.strokeDasharray = `${pathLength} ${pathLength}`;
            updateJourneyPath();
        }
        window.addEventListener("scroll", () => requestAnimationFrame(updateJourneyPath));
        window.addEventListener("resize", handleResponsivePath);
        handleResponsivePath();
    }

    // ============================================================
    // 4. SECTION 7: "BEYOND THE CODE" EDITORIAL REVEALS
    // ============================================================
    const magazineReveals = document.querySelectorAll(".magazine-reveal");
    if (magazineReveals.length > 0) {
        if (prefersReducedMotion) {
            magazineReveals.forEach(el => el.classList.add("is-visible"));
        } else {
            const magazineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
            }, { threshold: 0.15 });
            magazineReveals.forEach((el, idx) => {
                el.style.transitionDelay = `${(idx % 4) * 0.1}s`;
                magazineObserver.observe(el);
            });
        }
    }

    // ============================================================
    // 5. SECTION 8: ALGORITHM VISUALIZER & TERMINAL
    // ============================================================
    const polyline = document.getElementById("animatedPathPolyline");
    const badge = document.getElementById("pathStatusBadge");
    const successLabel = document.getElementById("pathSuccessLabel");
    const pulseCircle = document.getElementById("algoDataPulse");
    const nodes = {
        start: document.querySelector('.graph-node[data-node="START"]'),
        a: document.querySelector('.graph-node[data-node="A"]'),
        b: document.querySelector('.graph-node[data-node="B"]'),
        c: document.querySelector('.graph-node[data-node="C"]'),
        target: document.querySelector('.graph-node[data-node="TARGET"]')
    };

    const terminalLines = document.querySelectorAll(".terminal-line");
    terminalLines.forEach((line) => {
        const delay = line.getAttribute("data-delay");
        if (delay) { setTimeout(() => { line.style.opacity = "1"; }, parseInt(delay)); }
    });

    if (polyline && badge && successLabel && pulseCircle) {
        const points = [{ x: 75, y: 70 }, { x: 125, y: 227.5 }, { x: 300, y: 245 }, { x: 410, y: 157.5 }];
        let animFrame;
        function runAlgorithmTraversal() {
            let step = 0; const totalSteps = points.length - 1; const durationPerSegment = 600;
            badge.textContent = "SEARCHING..."; badge.style.background = "rgba(245, 158, 11, 0.15)"; badge.style.color = "#f59e0b";
            successLabel.style.opacity = "0";
            Object.values(nodes).forEach(n => { if (n) n.classList.remove("active-node", "visited-node"); });
            if (nodes.start) nodes.start.classList.add("active-node");
            pulseCircle.setAttribute("opacity", "1");
            let startTime = performance.now();

            function animatePulse(now) {
                const elapsed = now - startTime;
                const segmentProgress = Math.min(elapsed / durationPerSegment, 1);
                const currentP = points[step]; const nextP = points[step + 1];
                const curX = currentP.x + (nextP.x - currentP.x) * segmentProgress;
                const curY = currentP.y + (nextP.y - currentP.y) * segmentProgress;
                pulseCircle.setAttribute("cx", curX); pulseCircle.setAttribute("cy", curY);

                if (segmentProgress < 1) {
                    animFrame = requestAnimationFrame(animatePulse);
                } else {
                    step++;
                    if (step === 1 && nodes.b) { if (nodes.start) nodes.start.classList.add("visited-node"); nodes.b.classList.add("active-node"); }
                    else if (step === 2 && nodes.c) { if (nodes.b) nodes.b.classList.add("visited-node"); nodes.c.classList.add("active-node"); }
                    else if (step === 3 && nodes.target) { if (nodes.c) nodes.c.classList.add("visited-node"); nodes.target.classList.add("active-node"); }

                    if (step < totalSteps) { startTime = performance.now(); animFrame = requestAnimationFrame(animatePulse); }
                    else {
                        badge.textContent = "OPTIMAL PATH FOUND"; badge.style.background = "rgba(16, 185, 129, 0.15)"; badge.style.color = "#10b981";
                        successLabel.style.opacity = "1"; setTimeout(runAlgorithmTraversal, 3500);
                    }
                }
            }
            if (!prefersReducedMotion) { animFrame = requestAnimationFrame(animatePulse); }
            else {
                badge.textContent = "OPTIMAL PATH FOUND"; badge.style.background = "rgba(16, 185, 129, 0.15)"; badge.style.color = "#10b981";
                successLabel.style.opacity = "1"; Object.values(nodes).forEach(n => n && n.classList.add("visited-node"));
                if (nodes.target) nodes.target.classList.add("active-node");
            }
        }
        const workspaceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { runAlgorithmTraversal(); workspaceObserver.unobserve(entry.target); } });
        }, { threshold: 0.3 });
        const workspaceSection = document.getElementById("dev-workspace");
        if (workspaceSection) workspaceObserver.observe(workspaceSection);
    }

    // ============================================================
    // 6. SECTION 9: EXPLORATION (INTERACTIVE SPLIT-VIEW)
    // ============================================================
    const exploreData = {
        ai: {
            title: "Artificial Intelligence",
            desc: "Exploring the core concepts behind intelligent systems, search algorithms, and heuristic problem-solving models.",
            tags: ["Heuristics", "Search Algorithms", "Logic Models"],
            icon: "fa-solid fa-brain", color: "#8b5cf6"
        },
        ml: {
            title: "Machine Learning",
            desc: "Building mathematical foundations (Linear Algebra, Calculus, Stats) required for modern Machine Learning models.",
            tags: ["Math", "Data Models", "Statistics", "PyTorch"],
            icon: "fa-solid fa-robot", color: "#ec4899"
        },
        dsa: {
            title: "Advanced DSA",
            desc: "Going deeper into optimization, complex data structures like Graphs and Trees, and dynamic programming.",
            tags: ["Graphs", "Trees", "DP", "Complexity"],
            icon: "fa-solid fa-diagram-project", color: "#10b981"
        },
        python: {
            title: "Python",
            desc: "Mastering Python for software development, automation scripts, and future AI/ML integration.",
            tags: ["Automation", "Data Handling", "Scripts"],
            icon: "fa-brands fa-python", color: "#eab308"
        },
        web: {
            title: "Web Development",
            desc: "Learning to build modern, responsive, and interactive web experiences using the latest frontend technologies.",
            tags: ["HTML/CSS", "JavaScript", "React", "Responsive"],
            icon: "fa-solid fa-globe", color: "#06b6d4"
        },
        java: {
            title: "Java OOP",
            desc: "Deepening my understanding of object-oriented programming, class design, and scalable application architecture.",
            tags: ["Classes", "Inheritance", "JVM", "Spring Base"],
            icon: "fa-brands fa-java", color: "#f97316"
        }
    };

    const expItems = document.querySelectorAll(".explore-item");
    const expWindow = document.getElementById("exp-window");
    const expBlob = document.getElementById("exp-blob");
    const expIconWrap = document.getElementById("exp-icon-wrap");
    const expIcon = document.getElementById("exp-icon");
    const expTitle = document.getElementById("exp-title");
    const expDesc = document.getElementById("exp-desc");
    const expTags = document.getElementById("exp-tags");

    function hexToRgbaExp(hex, opacity) {
        let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    expItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            expItems.forEach(el => el.classList.remove("active"));
            item.classList.add("active");

            const key = item.getAttribute("data-exp");
            const data = exploreData[key];

            expWindow.classList.add("fade-content");

            setTimeout(() => {
                expTitle.textContent = data.title;
                expDesc.textContent = data.desc;
                expIcon.className = data.icon;

                expIconWrap.style.color = data.color;
                expIconWrap.style.background = hexToRgbaExp(data.color, 0.1);
                expIconWrap.style.borderColor = hexToRgbaExp(data.color, 0.3);

                expBlob.style.background = `radial-gradient(circle, ${hexToRgbaExp(data.color, 0.3)} 0%, transparent 70%)`;

                expTags.innerHTML = "";
                data.tags.forEach(tag => {
                    const span = document.createElement("span");
                    span.textContent = tag;
                    expTags.appendChild(span);
                });

                expWindow.classList.remove("fade-content");
            }, 300);
        });
    });

    // ============================================================
    // 7. SECTION 10 & 11: CINEMATIC & LET'S BUILD ENTRANCE
    // ============================================================
    const cinematicItems = document.querySelectorAll(".cinematic-item");
    const cinematicFinal = document.getElementById("cinematicFinal");
    const cinematicObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-active"); });
    }, { threshold: 0.35 });
    cinematicItems.forEach((item) => cinematicObserver.observe(item));
    if (cinematicFinal) cinematicObserver.observe(cinematicFinal);

    const contactSection = document.getElementById("contact");
    let animationTriggered = false;
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !animationTriggered) {
                animationTriggered = true;
                setTimeout(() => document.getElementById("wordLets")?.classList.add("is-visible"), 100);
                setTimeout(() => document.getElementById("wordBuild")?.classList.add("is-visible"), 400);
                setTimeout(() => document.getElementById("buildSubtitles")?.classList.add("is-visible"), 700);
                setTimeout(() => document.getElementById("availabilityBadge")?.classList.add("is-visible"), 900);
                document.querySelectorAll(".editorial-nav-link").forEach((link, idx) => {
                    setTimeout(() => { link.classList.add("is-visible"); }, 1100 + idx * 150);
                });
                setTimeout(() => document.getElementById("closingFooter")?.classList.add("is-visible"), 1700);
            }
        });
    }, { threshold: 0.2 });
    if (contactSection) contactObserver.observe(contactSection);

    // ============================================================
    // 8. GLOBAL SCROLL REVEAL ANIMATION (Smooth Staggered Fade-Up)
    // ============================================================
    const elementsToReveal = document.querySelectorAll(`
        section:not(#intro) h2, 
        section:not(#intro) h3, 
        section:not(#intro) p, 
        section:not(#intro) .eyebrow-text,
        .academic-card, .career-spotlight, .stat-box, 
        .showcase-item, .editorial-block, .terminal-wrapper, 
        .visualizer-wrapper, .cp-stat-card, .explore-item, 
        .exp-visual-window, .cinematic-item, .editorial-nav-link,
        .award-card, .profile-card, .profile-quote-box
    `);

    elementsToReveal.forEach(el => {
        el.classList.add("reveal-on-scroll");
    });

    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    document.querySelectorAll(".reveal-on-scroll").forEach(target => {
        scrollRevealObserver.observe(target);
    });
});
