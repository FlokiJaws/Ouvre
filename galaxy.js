// Fond galaxie : étoiles scintillantes, étoiles filantes et petites Saturne flottantes
(function galaxy() {
    const canvas = document.createElement('canvas');
    canvas.className = 'galaxy-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let stars = [];
    let shootingStars = [];
    let width, height, dpr;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.floor((width * height) / 2500);
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.3 + 0.2,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.005,
            hue: [0, 200, 280, 330][Math.floor(Math.random() * 4)]
        }));
    }

    function spawnShootingStar() {
        shootingStars.push({
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.4,
            len: Math.random() * 80 + 60,
            speed: Math.random() * 6 + 6,
            life: 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (const s of stars) {
            s.phase += s.speed;
            const alpha = 0.5 + Math.sin(s.phase) * 0.5;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.hue === 0
                ? `rgba(255,255,255,${alpha})`
                : `hsla(${s.hue},80%,85%,${alpha})`;
            ctx.fill();
        }

        shootingStars = shootingStars.filter(s => s.life > 0);
        for (const s of shootingStars) {
            const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * 0.5);
            grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.len, s.y - s.len * 0.5);
            ctx.stroke();
            s.x += s.speed;
            s.y += s.speed * 0.5;
            s.life -= 0.015;
        }

        if (Math.random() < 0.004) spawnShootingStar();
        requestAnimationFrame(draw);
    }

    // Petites Saturne
    const saturnColors = [
        ['#f6c58f', '#d98f5c', '#ffe3b8'],
        ['#c9a7ff', '#7d5bd6', '#eadcff'],
        ['#ff9fc8', '#d6558f', '#ffd6e8']
    ];

    function saturnSVG([light, dark, ring], id) {
        return `
        <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="p${id}" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="${light}"/>
                    <stop offset="100%" stop-color="${dark}"/>
                </radialGradient>
            </defs>
            <path d="M15 46 A45 13 -12 0 1 105 34" fill="none" stroke="${ring}" stroke-width="4" opacity="0.8"/>
            <circle cx="60" cy="40" r="22" fill="url(#p${id})"/>
            <path d="M105 34 A45 13 -12 0 1 15 46" fill="none" stroke="${ring}" stroke-width="4" opacity="0.9"/>
        </svg>`;
    }

    const saturnPositions = [
        { top: '8%', left: '5%', size: 140, delay: 0 },
        { top: '65%', left: '78%', size: 180, delay: 2 },
        { top: '75%', left: '6%', size: 110, delay: 4 }
    ];

    saturnPositions.forEach((pos, i) => {
        const el = document.createElement('div');
        el.className = 'saturn';
        el.style.top = pos.top;
        el.style.left = pos.left;
        el.style.width = pos.size + 'px';
        el.style.animationDelay = `-${pos.delay}s`;
        el.innerHTML = saturnSVG(saturnColors[i % saturnColors.length], i);
        document.body.prepend(el);
    });

    window.addEventListener('resize', resize);
    resize();
    draw();
})();
