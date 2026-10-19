/* Neon vector art in arcade units (the context is already scaled): girders, ladders, the great ape, the climber, Nova and every hazard. No image files. */
(function (G) {
  'use strict';
  const U = G.U, C = G.C, GFX = G.gfx, TAU = U.TAU;
  const Art = {};
  const hexA = (hex, a) => { const n = parseInt(hex.replace('#', ''), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; };
  const glow = (ctx, col, x, y, r, a) => GFX.drawGlow(ctx, col, x, y, r, a);

  Art.drawBackdrop = function (ctx, st, th, t) {
    ctx.fillStyle = 'rgba(2,4,16,0.5)'; ctx.fillRect(0, 0, C.UW, C.UH);
    ctx.strokeStyle = hexA(th.rim, 0.06); ctx.lineWidth = 0.4;
    ctx.beginPath(); for (let y = 8; y < C.UH; y += 16) { ctx.moveTo(0, y); ctx.lineTo(C.UW, y); } for (let x = 8; x < C.UW; x += 16) { ctx.moveTo(x, 0); ctx.lineTo(x, C.UH); } ctx.stroke();
    ctx.strokeStyle = hexA(th.rim, 0.5); ctx.lineWidth = 0.8; ctx.strokeRect(0.4, 0.4, C.UW - 0.8, C.UH - 0.8);
  };

  /* ---------- structure ---------- */
  Art.drawGirder = function (ctx, g, th, t) {
    const x1 = g.x1, x2 = g.x2, th2 = 6;
    const y1 = g.lift ? g.y : g.y1, y2 = g.lift ? g.y : g.y2;
    ctx.save();
    ctx.fillStyle = '#12081c';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x2, y2 + th2); ctx.lineTo(x1, y1 + th2); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = hexA(th.rim, 0.45); ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = x1; x < x2 - 3; x += 8) {
      const ax = x, bx = Math.min(x2, x + 8), ay = y1 + (y2 - y1) * ((ax - x1) / ((x2 - x1) || 1)), by = y1 + (y2 - y1) * ((bx - x1) / ((x2 - x1) || 1));
      ctx.moveTo(ax, ay + th2); ctx.lineTo(bx, by); ctx.moveTo(ax, ay); ctx.lineTo(bx, by + th2);
    }
    ctx.stroke();
    ctx.strokeStyle = g.kind === 'belt' ? '#ffd24a' : g.kind === 'lift' ? '#7dffb0' : th.rim; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.strokeStyle = hexA(th.rim, 0.5); ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(x1, y1 + th2); ctx.lineTo(x2, y2 + th2); ctx.stroke();
    if (g.kind === 'belt') {                                                      /* moving chevrons */
      ctx.strokeStyle = 'rgba(255,210,74,0.8)'; ctx.lineWidth = 0.8; const off = ((t * g.v) % 8 + 8) % 8, s = Math.sign(g.v);
      ctx.beginPath(); for (let x = x1 + off; x < x2 - 2; x += 8) { ctx.moveTo(x - 2 * s, y1 + 1); ctx.lineTo(x, y1 + 3); ctx.lineTo(x - 2 * s, y1 + 5); } ctx.stroke();
      ctx.fillStyle = '#ffd24a'; for (const ex of [x1, x2]) { ctx.beginPath(); ctx.arc(ex, y1 + 3, 3.2, 0, TAU); ctx.fill(); }
    }
    if (g.lift) { glow(ctx, 'rgba(125,255,176,1)', (x1 + x2) / 2, y1, 14, 0.35); ctx.strokeStyle = 'rgba(125,255,176,0.8)'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo((x1 + x2) / 2 - 3, y1 + 4.5); ctx.lineTo((x1 + x2) / 2, y1 + 1.8); ctx.lineTo((x1 + x2) / 2 + 3, y1 + 4.5); ctx.stroke(); }
    ctx.restore();
  };
  Art.drawLadder = function (ctx, L, th) {
    ctx.save(); ctx.strokeStyle = '#7ee8ff'; ctx.lineWidth = 0.9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(L.x - 3, L.yt); ctx.lineTo(L.x - 3, L.yb); ctx.moveTo(L.x + 3, L.yt); ctx.lineTo(L.x + 3, L.yb);
    for (let y = L.yt + 2; y < L.yb; y += 4) { ctx.moveTo(L.x - 3, y); ctx.lineTo(L.x + 3, y); }
    ctx.stroke(); ctx.restore();
  };
  Art.drawRivet = function (ctx, r, t) {
    const y = r.g.at(r.x) - 2.5;
    glow(ctx, 'rgba(255,215,90,1)', r.x, y, 10, 0.55 + 0.2 * Math.sin(t * 6));
    ctx.fillStyle = '#ffd24a'; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.arc(r.x, y, 2.6, 0, TAU); ctx.fill(); ctx.stroke();
  };
  Art.drawDrum = function (ctx, d, t) {
    const y = d.g.at(d.x);
    ctx.save(); ctx.translate(d.x, y);
    ctx.fillStyle = '#1a3a8a'; ctx.strokeStyle = '#7ee8ff'; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.rect(-7, -16, 14, 16); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#7ee8ff'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(-7, -11); ctx.lineTo(7, -11); ctx.moveTo(-7, -5); ctx.lineTo(7, -5); ctx.stroke();
    ctx.fillStyle = '#e8f4ff'; ctx.font = '700 4px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('OIL', 0, -7);
    glow(ctx, 'rgba(255,140,40,1)', 0, -20, 16, 0.6);
    ctx.fillStyle = '#ff7a1f';
    for (let i = 0; i < 3; i++) { const fx = -4 + i * 4, h = 5 + 3 * Math.abs(Math.sin(t * 9 + i * 2)); ctx.beginPath(); ctx.moveTo(fx - 2, -16); ctx.quadraticCurveTo(fx, -16 - h, fx + 2, -16); ctx.fill(); }
    ctx.restore();
  };

  /* ---------- characters ---------- */
  Art.drawPrincess = function (ctx, pr, t, happy) {
    const y = pr.g.at(pr.x);
    ctx.save(); ctx.translate(pr.x, y);
    glow(ctx, 'rgba(255,140,210,1)', 0, -8, 22, 0.5);
    const wave = Math.sin(t * 6);
    ctx.fillStyle = '#ff7ad9'; ctx.strokeStyle = '#ffd0f0'; ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(-2.5, -9); ctx.lineTo(2.5, -9); ctx.lineTo(5.5, 0); ctx.lineTo(-5.5, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#ffd0f0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-2, -8); ctx.lineTo(-5, -12 - wave * (happy ? 3 : 1.5)); ctx.moveTo(2, -8); ctx.lineTo(5, -12 + wave * (happy ? 3 : 1.5)); ctx.stroke();
    ctx.fillStyle = '#ffe8d0'; ctx.beginPath(); ctx.arc(0, -12, 3, 0, TAU); ctx.fill();
    ctx.fillStyle = '#7a3dff'; ctx.beginPath(); ctx.arc(0, -13.2, 3.4, Math.PI, TAU); ctx.fill(); ctx.fillRect(-3.4, -13.2, 1.4, 5);
    ctx.fillStyle = '#10142a'; ctx.fillRect(-1.5, -12.2, 0.8, 0.8); ctx.fillRect(0.8, -12.2, 0.8, 0.8);
    if (!happy && Math.floor(t * 0.8) % 3 === 0) { ctx.fillStyle = '#fff'; ctx.font = '800 5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('HELP!', 0, -21); }
    ctx.restore();
  };

  Art.drawKong = function (ctx, dk, t, phase, collapse) {
    const y = dk.g.at(dk.x);
    ctx.save(); ctx.translate(dk.x, y);
    if (phase === 'collapse' || phase === 'victory') { ctx.translate(0, collapse * collapse * 40); ctx.rotate(Math.min(1.2, collapse * 0.6)); }
    const beat = Math.sin((dk.anim || 0) * 5), thr = dk.throwing > 0 ? 1 : 0;
    glow(ctx, 'rgba(255,90,140,1)', 0, -16, 38, 0.3);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    /* legs */
    ctx.fillStyle = '#2a1030'; ctx.strokeStyle = '#ff7aa8'; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.ellipse(-8, -3, 6, 4, 0, 0, TAU); ctx.ellipse(8, -3, 6, 4, 0, 0, TAU); ctx.fill(); ctx.stroke();
    /* body */
    const bg = ctx.createLinearGradient(0, -34, 0, -4); bg.addColorStop(0, '#5a2a68'); bg.addColorStop(1, '#2a1030');
    ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(0, -16, 15, 13, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c47a8a'; ctx.beginPath(); ctx.ellipse(0, -14, 9, 8, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#7a3a4a'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(0, -21); ctx.lineTo(0, -8); ctx.stroke();
    /* arms: one beating, or lifting a drum */
    ctx.strokeStyle = '#ff7aa8'; ctx.lineWidth = 0.9; ctx.fillStyle = '#4a2058';
    ctx.beginPath(); ctx.moveTo(-13, -22); ctx.quadraticCurveTo(-24, -14 + beat * 2, -21, -3); ctx.lineTo(-17, -3); ctx.quadraticCurveTo(-18, -14, -9, -17); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(13, -22); ctx.quadraticCurveTo(24, thr ? -34 : -14 - beat * 2, thr ? 14 : 21, thr ? -40 : -3); ctx.lineTo(thr ? 18 : 17, thr ? -40 : -3); ctx.quadraticCurveTo(thr ? 20 : 18, thr ? -30 : -14, 9, -17); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (thr) { ctx.fillStyle = '#ff9a3d'; ctx.strokeStyle = '#ffe0a0'; ctx.beginPath(); ctx.rect(11, -50, 12, 10); ctx.fill(); ctx.stroke(); }
    /* head */
    ctx.fillStyle = '#5a2a68'; ctx.strokeStyle = '#ff7aa8'; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.ellipse(0, -31, 10, 8.5, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c47a8a'; ctx.beginPath(); ctx.ellipse(0, -29, 6.6, 5.2, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#2a1030'; ctx.beginPath(); ctx.moveTo(-9, -35); ctx.lineTo(0, -32); ctx.lineTo(9, -35); ctx.lineTo(8, -37); ctx.lineTo(-8, -37); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff3d5a'; ctx.beginPath(); ctx.arc(-3.4, -33, 1.5, 0, TAU); ctx.arc(3.4, -33, 1.5, 0, TAU); ctx.fill();
    glow(ctx, 'rgba(255,60,90,1)', 0, -33, 10, 0.5);
    ctx.fillStyle = '#10142a'; ctx.beginPath(); ctx.ellipse(0, -26.2, 4.2, thr ? 2.6 : 1.4, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(-3, -27.4, 1.2, 1); ctx.fillRect(1.8, -27.4, 1.2, 1);
    ctx.restore();
  };

  Art.drawClimber = function (ctx, p, t, phase) {
    if (p.dead) {                                                                   /* spinning away */
      ctx.save(); ctx.translate(p.x, p.y - 7); ctx.rotate(t * 14); ctx.scale(0.9, 0.9); body(ctx, p, t, 'air'); ctx.restore(); return;
    }
    if (p.inv > 0 && Math.floor(t * 14) % 2 && phase !== 'ready') return;
    ctx.save(); ctx.translate(p.x, p.y);
    ctx.scale(p.face, 1);
    body(ctx, p, t, p.state);
    ctx.restore();
  };
  function body(ctx, p, t, state) {
    const run = state === 'ground' && p.moving ? Math.sin(p.anim * 16) : 0, climbing = state === 'ladder';
    const cl = climbing ? (p.moving ? Math.sin(p.anim * 14) : 0) : 0;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (p.hammer > 0) glow(ctx, 'rgba(255,230,90,1)', 0, -8, 24, 0.5);
    else glow(ctx, 'rgba(126,232,255,1)', 0, -7, 16, 0.3);
    /* legs */
    ctx.strokeStyle = '#2f6a9a'; ctx.lineWidth = 2.2;
    if (state === 'air') { ctx.beginPath(); ctx.moveTo(-1.5, -4.5); ctx.lineTo(-4.2, -1.2); ctx.moveTo(1.5, -4.5); ctx.lineTo(4.5, -2.8); ctx.stroke(); }
    else if (climbing) { ctx.beginPath(); ctx.moveTo(-1.5, -4.5); ctx.lineTo(-2 + cl * 1.5, -0.5 - cl); ctx.moveTo(1.5, -4.5); ctx.lineTo(2 - cl * 1.5, -0.5 + cl); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(-1.5, -4.5); ctx.lineTo(-1.5 - run * 2.4, 0); ctx.moveTo(1.5, -4.5); ctx.lineTo(1.5 + run * 2.4, 0); ctx.stroke(); }
    ctx.strokeStyle = '#ffd24a'; ctx.lineWidth = 2.4; ctx.beginPath(); if (state === 'ground') { ctx.moveTo(-1.5 - run * 2.4, -0.3); ctx.lineTo(-0.4 - run * 2.4, -0.3); ctx.moveTo(1.5 + run * 2.4, -0.3); ctx.lineTo(2.6 + run * 2.4, -0.3); } ctx.stroke();
    /* backpack and torso */
    ctx.fillStyle = '#3a5a8a'; ctx.beginPath(); ctx.rect(-4.8, -11, 2.6, 6); ctx.fill();
    const tg = ctx.createLinearGradient(0, -12, 0, -4); tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#9ab8d8');
    ctx.fillStyle = tg; ctx.strokeStyle = '#7ee8ff'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-3, -11.5, 6, 7.5, 1.6) : ctx.rect(-3, -11.5, 6, 7.5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff5a5a'; ctx.fillRect(-1.2, -9, 2.4, 1.4);
    /* arms */
    ctx.strokeStyle = '#e8f4ff'; ctx.lineWidth = 1.8;
    if (p.hammer > 0) {
      const s = Math.sin(p.swing);
      ctx.beginPath(); ctx.moveTo(1, -9.5); ctx.lineTo(4.5, -10 - s * 2); ctx.stroke();
      ctx.save(); ctx.translate(4.5, -10 - s * 2); ctx.rotate(-0.6 + s * 1.1);
      ctx.strokeStyle = '#a07a40'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -9); ctx.stroke();
      ctx.fillStyle = '#ffe45a'; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.rect(-4, -13, 8, 5); ctx.fill(); ctx.stroke();
      ctx.restore();
    } else if (climbing) { ctx.beginPath(); ctx.moveTo(-2, -10); ctx.lineTo(-3 - cl, -14 + cl); ctx.moveTo(2, -10); ctx.lineTo(3 + cl, -14 - cl); ctx.stroke(); }
    else if (state === 'air') { ctx.beginPath(); ctx.moveTo(1, -10); ctx.lineTo(4.5, -13); ctx.moveTo(-1, -10); ctx.lineTo(-3.5, -13); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(1, -10); ctx.lineTo(3 + run * 1.2, -7); ctx.moveTo(-1, -10); ctx.lineTo(-3 - run * 1.2, -7); ctx.stroke(); }
    /* helmet */
    ctx.fillStyle = '#f2f8ff'; ctx.strokeStyle = '#7ee8ff'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.arc(0.4, -14.2, 3.9, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#10305a'; ctx.beginPath(); ctx.ellipse(1.8, -14.2, 2.3, 2, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(126,232,255,0.8)'; ctx.fillRect(1, -15.1, 1.6, 0.8);
  }

  /* ---------- hazards and pickups ---------- */
  Art.drawBarrel = function (ctx, b, t) {
    ctx.save(); ctx.translate(b.x, b.y);
    glow(ctx, 'rgba(255,150,50,1)', 0, 0, 12, 0.35);
    ctx.rotate(b.rot);
    ctx.fillStyle = '#ff9a3d'; ctx.strokeStyle = '#ffe0a0'; ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#7a3a10'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.moveTo(0, -5); ctx.lineTo(0, 5); ctx.stroke();
    ctx.strokeStyle = '#7a3a10'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.arc(0, 0, 3, 0, TAU); ctx.stroke();
    ctx.restore();
  };
  Art.drawFire = function (ctx, f, t) {
    ctx.save(); ctx.translate(f.x, f.y);
    const cold = f.frozen > 0;
    glow(ctx, cold ? 'rgba(130,200,255,1)' : 'rgba(255,100,40,1)', 0, 0, 16, 0.6);
    const s = 1 + 0.12 * Math.sin(t * 14 + f.t);
    ctx.scale(s, 1 / s * (1 + 0.1 * Math.sin(t * 9 + f.t * 2)));
    ctx.fillStyle = cold ? '#8ac8ff' : '#ff5a1f'; ctx.beginPath();
    ctx.moveTo(0, -8); ctx.quadraticCurveTo(7, -2, 5, 3); ctx.quadraticCurveTo(0, 7, -5, 3); ctx.quadraticCurveTo(-7, -2, 0, -8); ctx.fill();
    ctx.fillStyle = cold ? '#e0f4ff' : '#ffb347'; ctx.beginPath(); ctx.moveTo(0, -3); ctx.quadraticCurveTo(4, 0, 2.5, 3); ctx.quadraticCurveTo(0, 5, -2.5, 3); ctx.quadraticCurveTo(-4, 0, 0, -3); ctx.fill();
    ctx.fillStyle = '#10142a'; ctx.fillRect(-2.6 + f.dir * 0.6, -1, 1.4, 1.8); ctx.fillRect(1 + f.dir * 0.6, -1, 1.4, 1.8);
    ctx.restore();
  };
  Art.drawPie = function (ctx, pi, t) {
    ctx.save(); ctx.translate(pi.x, pi.y);
    glow(ctx, 'rgba(255,120,200,1)', 0, 0, 10, 0.3);
    ctx.fillStyle = '#c8c8e0'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.ellipse(0, 1, 7, 2.2, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff6ac8'; ctx.beginPath(); ctx.moveTo(-5.5, 0.5); ctx.quadraticCurveTo(-4, -5, 0, -4.5); ctx.quadraticCurveTo(4, -5, 5.5, 0.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffe0f4'; ctx.beginPath(); ctx.arc(-1.5, -2.5, 0.9, 0, TAU); ctx.arc(2, -1.8, 0.7, 0, TAU); ctx.fill();
    ctx.restore();
  };
  Art.drawSpring = function (ctx, sp, t) {
    ctx.save(); ctx.translate(sp.x, sp.y);
    glow(ctx, 'rgba(125,255,176,1)', 0, 0, 12, 0.4);
    const sq = U.clamp(1 - Math.abs(sp.vy) / 400, 0.55, 1), h = 8 * sq;
    ctx.strokeStyle = '#7dffb0'; ctx.lineWidth = 1.1; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(-4, 4); for (let i = 0; i < 6; i++) ctx.lineTo(i % 2 ? 4 : -4, 4 - h * (i + 1) / 6 * 1.4); ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-5, 4.4); ctx.lineTo(5, 4.4); ctx.moveTo(-5, 4 - h * 1.4 - 0.4); ctx.lineTo(5, 4 - h * 1.4 - 0.4); ctx.stroke();
    ctx.restore();
  };
  Art.drawHammerItem = function (ctx, h, t) {
    ctx.save(); ctx.translate(h.x, h.y);
    glow(ctx, 'rgba(255,230,90,1)', 0, -6, 14, 0.5 + 0.2 * Math.sin(t * 6));
    ctx.rotate(Math.sin(t * 3) * 0.12);
    ctx.strokeStyle = '#a07a40'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -9); ctx.stroke();
    ctx.fillStyle = '#ffe45a'; ctx.strokeStyle = '#fff6c8'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.rect(-4, -13, 8, 5); ctx.fill(); ctx.stroke();
    ctx.restore();
  };
  Art.drawItem = function (ctx, it, t) {
    ctx.save(); ctx.translate(it.x, it.y);
    const col = it.type === 'hat' ? '#7ee8ff' : it.type === 'purse' ? '#ff7ad9' : '#ffd24a';
    glow(ctx, hexA(col, 1), 0, -5, 13, 0.45 + 0.15 * Math.sin(t * 5 + it.x));
    ctx.fillStyle = col; ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5; ctx.lineJoin = 'round';
    if (it.type === 'hat') { ctx.beginPath(); ctx.arc(0, -4, 4.5, Math.PI, TAU); ctx.lineTo(6.5, -4); ctx.lineTo(-6.5, -4); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    else if (it.type === 'purse') { ctx.beginPath(); ctx.rect(-4.5, -6, 9, 6); ctx.fill(); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.arc(0, -6, 2.6, Math.PI, TAU); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(-6, -6); ctx.quadraticCurveTo(0, -13, 6, -6); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(0, -0.5); ctx.stroke(); }
    ctx.restore();
  };

  G.art = Art;
})((window.SGS = window.SGS || {}));
