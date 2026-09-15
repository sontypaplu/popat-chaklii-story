/*
  Popat ❤️ Chaklii — Our Little Forever Movie
  Production-ready vanilla JS with an optional GSAP enhancement layer.
  All story copy is local and editable.
*/

(() => {
  'use strict';

  const START_DATE = new Date('2024-05-04T00:00:00');
  const TOTAL_SCENES = 19;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MOTION_FACTOR = 1.18;
  if (window.gsap && !prefersReducedMotion) window.gsap.globalTimeline.timeScale(0.86);

  // Replace the image paths below with your real memories. Keep image: "" to show a beautiful placeholder.
  const memories = [
    { image: 'assets/images/memories/01.jpg', date: '04 MAY 2024', title: 'The Beginning', message: 'The date that quietly started everything.' },
    { image: 'assets/images/memories/02.jpg', date: 'OUR EARLY DAYS', title: 'That Silly Moment', message: 'The kind of memory that still makes an ordinary day better.' },
    { image: 'assets/images/memories/03.jpg', date: 'ONE OF THOSE DAYS', title: 'Professional Fighting', message: 'Proof that two stubborn people can still find their way back to a smile.' },
    { image: 'assets/images/memories/04.jpg', date: 'A FAVOURITE MEMORY', title: 'Just Us', message: 'The little moments somehow become the ones that stay.' },
    { image: 'assets/images/memories/05.jpg', date: 'STILL HERE', title: 'Our Next Chapter', message: 'Another memory waiting for us to notice it.' }
  ];

  const secretMessages = [
    'I love your smile. ❤️',
    'I love your angry face. (Yes, even that 😂)',
    'I love how much you care.',
    'I love that you still choose me.',
    'I love my Chaklii.'
  ];

  const state = {
    currentScene: 0,
    soundEnabled: true,
    musicOn: false,
    transitionLocked: false,
    touchStartX: 0,
    touchStartY: 0,
    touchStartScrollTop: 0,
    noClicks: { scene4: 0, scene17: 0 },
    quizIndex: 0,
    quizAnswered: false,
    complaintSubmitted: false,
    finalLetterOpened: false,
    firstLetterOpened: false,
    surpriseOpened: false,
    secretClickCount: 0
  };

  const els = {
    app: document.getElementById('app'),
    scenes: [...document.querySelectorAll('.scene[data-scene]')],
    progressFill: document.getElementById('progress-fill'),
    sceneCount: document.getElementById('scene-count'),
    nextScene: document.getElementById('next-scene'),
    toast: document.getElementById('toast'),
    musicToggle: document.getElementById('music-toggle'),
    soundToggle: document.getElementById('sound-toggle'),
    loadingCopy: document.getElementById('loading-copy'),
    loadingLineFill: document.getElementById('loading-line-fill'),
    enterStory: document.getElementById('enter-story'),
    chakliiCopy: document.getElementById('chaklii-copy'),
    popatCopy: document.getElementById('popat-copy'),
    dramaticResult: document.getElementById('dramatic-result'),
    fightResult: document.getElementById('fight-result'),
    submitComplaint: document.getElementById('submit-complaint'),
    complaintResult: document.getElementById('complaint-result'),
    complaintStamp: document.getElementById('complaint-stamp'),
    yesEscape: document.getElementById('yes-escape'),
    noEscape: document.getElementById('no-escape'),
    escapeResult: document.getElementById('escape-result'),
    openLetter1: document.getElementById('open-letter-1'),
    letter1: document.getElementById('letter-body-1'),
    envelope1: document.getElementById('envelope-1'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    quizResult: document.getElementById('quiz-result'),
    quizNext: document.getElementById('quiz-next'),
    quizStep: document.getElementById('quiz-step'),
    secretBoard: document.getElementById('secret-heart-board'),
    secretMessage: document.getElementById('secret-message'),
    updateSettings: document.getElementById('update-settings'),
    settingsResult: document.getElementById('settings-result'),
    scanFill: document.getElementById('scan-fill'),
    errorCopy: document.getElementById('error-copy'),
    continueError: document.getElementById('continue-error'),
    openFinalLetter: document.getElementById('open-final-letter'),
    finalLetter: document.getElementById('final-letter'),
    finalLetterWrap: document.getElementById('final-letter-wrap'),
    countDays: document.getElementById('count-days'),
    countHours: document.getElementById('count-hours'),
    countMinutes: document.getElementById('count-minutes'),
    countSeconds: document.getElementById('count-seconds'),
    memoryTimeline: document.getElementById('memory-timeline'),
    yesFinal: document.getElementById('yes-final'),
    noFinal: document.getElementById('no-final'),
    finalEscapeRow: document.getElementById('final-escape-row'),
    finalEscapeResult: document.getElementById('final-escape-result'),
    treasureBox: document.getElementById('treasure-box'),
    openSurprise: document.getElementById('open-surprise'),
    surpriseResult: document.getElementById('surprise-result'),
    endingLoveLetterStage: document.getElementById('ending-love-letter-stage'),
    endingLoveLetter: document.getElementById('ending-love-letter'),
    toCredits: document.getElementById('to-credits'),
    replayStory: document.getElementById('replay-story'),
    particleLayer: document.getElementById('particle-layer'),
    heartLayer: document.getElementById('heart-layer')
  };

  const quiz = [
    {
      q: 'Who is more dramatic?',
      options: [
        ['Chaklii 😌', 'Nice try, Chaklii. 😂 But Popat is officially taking the dramatic crown. 🏆❤️'],
        ['Popat 😏', 'Correct. Chaklii has identified the professional drama department: Popat. 😂❤️'],
        ['Both of us 💀', 'Fair… but Popat still has a tiny lead in the drama department. 😌']
      ]
    },
    {
      q: 'Who fell first?',
      options: [
        ['Me ❤️', 'Chaklii chose herself. Popat is smiling very proudly right now. 😌❤️'],
        ['Him ❤️', 'That answer just made Popat quietly happy. Maybe you noticed first… ❤️']
      ]
    },
    {
      q: 'Who is most likely to say “I’m fine” while very obviously not being fine?',
      options: [
        ['Me 😇', 'Interesting choice, Chaklii. Popat would like to investigate further. 👀'],
        ['Popat 😂', 'Fair accusation. Popat has officially been exposed. 😂'],
        ['Both of us 💀', 'Correct. Two people. One sentence. Zero actual honesty. 😂❤️']
      ]
    },
    {
      q: 'Who is more likely to secretly miss the other first after a silly fight?',
      options: [
        ['Me 🐦❤️', 'Chaklii… Popat has a feeling that answer might be true. 😌'],
        ['Popat 🦜❤️', 'Exactly. Popat can tease all he wants, but he misses his Chaklii quickly. ❤️'],
        ['Both, but nobody admits it 😂', 'Now THAT sounds like your relationship. Stubborn, soft, and adorable. 😂❤️']
      ]
    },
    {
      q: 'If Popat annoys you 100 times, how many times will Chaklii still love Popat?',
      options: [
        ['0 😤', 'System error detected. Chaklii is pretending. 😂'],
        ['100 ❤️', 'Very close… but Popat is counting on one extra. 😌'],
        ['101 ❤️', 'Correct answer ❤️ Popat plans to annoy you forever, apparently. 😂']
      ]
    }
  ];

  // Audio starts only after the viewer taps "Enter Our Story", which keeps it compatible with iOS/Android autoplay rules.
  // Personalized background song: upload it exactly as assets/audio/song.mp3
  const MUSIC_PATH = 'assets/audio/song.mp3';
  const MUSIC_TARGET_VOLUME = 0.18;
  const backgroundMusic = new Audio(MUSIC_PATH);
  backgroundMusic.loop = true;
  backgroundMusic.preload = 'auto';
  backgroundMusic.volume = 0;
  backgroundMusic.setAttribute('playsinline', '');

  let musicFadeFrame = null;
  let audioContext = null;

  function ensureAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }

  function tone(freq, duration = .12, volume = .025, type = 'sine', delay = 0) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), start + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + .03);
  }

  function synthSfx(kind = 'tap') {
    if (!state.soundEnabled) return;
    if (kind === 'whoosh') {
      const ctx = ensureAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + .28);
      gain.gain.setValueAtTime(.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.018, ctx.currentTime + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .3);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + .32);
      return;
    }
    tone(740, .08, .018, 'sine');
    tone(1110, .1, .012, 'sine', .025);
  }

  function safePlay(kind = 'tap') {
    synthSfx(kind);
    if ('vibrate' in navigator && state.soundEnabled) {
      try { navigator.vibrate(kind === 'whoosh' ? 14 : 7); } catch (_) {}
    }
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => els.toast.classList.remove('is-visible'), 2300);
  }

  function tween(target, vars, duration = .6) {
    if (window.gsap && !prefersReducedMotion) return window.gsap.to(target, { duration, ease: 'power3.out', ...vars });
    Object.entries(vars).forEach(([key, value]) => {
      if (key === 'opacity') target.style.opacity = value;
      if (key === 'x') target.style.transform = `translateX(${value}px)`;
      if (key === 'y') target.style.transform = `translateY(${value}px)`;
      if (key === 'scale') target.style.transform = `scale(${value})`;
      if (key === 'filter') target.style.filter = value;
    });
    return null;
  }

  function timeline(steps) {
    if (window.gsap && !prefersReducedMotion) return window.gsap.timeline(steps);
    return null;
  }

  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, prefersReducedMotion ? Math.min(ms, 100) : Math.round(ms * MOTION_FACTOR))); }

  function typeText(el, text, speed = 38, callback) {
    if (!el) return Promise.resolve();
    return new Promise(resolve => {
      el.textContent = '';
      if (prefersReducedMotion) {
        el.textContent = text;
        callback?.();
        resolve();
        return;
      }
      let i = 0;
      const tick = () => {
        el.textContent = text.slice(0, i++);
        if (i <= text.length) {
          setTimeout(tick, Math.round(speed * MOTION_FACTOR));
        } else {
          callback?.();
          resolve();
        }
      };
      tick();
    });
  }

  async function loadingSequence() {
    const lines = [
      'Loading a story…',
      'A story of two crazy people…',
      'Who fight like enemies…',
      'But still find their way back to each other.',
      'Popat ❤️ Chaklii'
    ];
    const weights = [16, 34, 54, 75, 100];
    for (let i = 0; i < lines.length; i++) {
      await typeText(els.loadingCopy, lines[i], 24);
      els.loadingLineFill.style.width = `${weights[i]}%`;
      await sleep(i === lines.length - 1 ? 800 : 620);
    }
    showIntro();
  }

  function showIntro() {
    const loading = document.getElementById('loading-screen');
    const intro = document.getElementById('intro-screen');
    loading.classList.remove('is-active');
    intro.classList.add('is-active');
    state.currentScene = 0.5;
    updateHUD(.5);
    tween(intro.querySelector('.intro__inner'), { opacity: 1, y: 0 }, .9);
  }

  function openStory() {
    safePlay('whoosh');
    state.musicOn = true;
    startMusic();
    if (window.gsap && !prefersReducedMotion) {
      const tl = window.gsap.timeline();
      tl.to('.curtain--left', { xPercent: -105, duration: 1.1, ease: 'power4.inOut' }, 0)
        .to('.curtain--right', { xPercent: 105, duration: 1.1, ease: 'power4.inOut' }, 0)
        .to('#intro-screen .intro__inner', { opacity: 0, scale: .96, duration: .5, ease: 'power2.in' }, .42)
        .call(() => changeScene(1, true), null, '+=.2');
    } else {
      document.querySelector('.curtain--left').style.transform = 'translateX(-105%)';
      document.querySelector('.curtain--right').style.transform = 'translateX(105%)';
      changeScene(1, true);
    }
  }

  function cancelMusicFade() {
    if (musicFadeFrame !== null) {
      cancelAnimationFrame(musicFadeFrame);
      musicFadeFrame = null;
    }
  }

  function fadeMusicTo(targetVolume, duration = 1200, onComplete) {
    cancelMusicFade();

    const from = Number.isFinite(backgroundMusic.volume) ? backgroundMusic.volume : 0;
    const to = Math.max(0, Math.min(1, targetVolume));

    if (prefersReducedMotion || duration <= 0 || Math.abs(from - to) < 0.001) {
      backgroundMusic.volume = to;
      onComplete?.();
      return;
    }

    const startedAt = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - startedAt) / duration);
      // Smoothstep easing keeps the fade gentle on phone speakers/headphones.
      const eased = progress * progress * (3 - 2 * progress);
      backgroundMusic.volume = from + (to - from) * eased;

      if (progress < 1) {
        musicFadeFrame = requestAnimationFrame(tick);
      } else {
        musicFadeFrame = null;
        backgroundMusic.volume = to;
        onComplete?.();
      }
    };

    musicFadeFrame = requestAnimationFrame(tick);
  }

  function setMusicButton(isOn) {
    els.musicToggle.setAttribute('aria-pressed', String(isOn));
    els.musicToggle.textContent = isOn ? '♫' : '♩';
  }

  function startMusic() {
    if (!state.musicOn) return;

    cancelMusicFade();
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0;

    const playPromise = backgroundMusic.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          if (!state.musicOn) {
            backgroundMusic.pause();
            return;
          }
          setMusicButton(true);
          fadeMusicTo(MUSIC_TARGET_VOLUME, 1800);
        })
        .catch(error => {
          console.warn('[Movie] song.mp3 could not start:', error);
          state.musicOn = false;
          setMusicButton(false);
          showToast('Music could not start. Check assets/audio/song.mp3');
        });
    } else {
      setMusicButton(true);
      fadeMusicTo(MUSIC_TARGET_VOLUME, 1800);
    }
  }

  function stopMusic(resetToBeginning = false) {
    cancelMusicFade();
    setMusicButton(false);

    const finishStop = () => {
      backgroundMusic.pause();
      if (resetToBeginning) {
        try { backgroundMusic.currentTime = 0; } catch (_) {}
      }
    };

    if (backgroundMusic.paused) {
      finishStop();
      return;
    }

    fadeMusicTo(0, 450, finishStop);
  }

  function toggleMusic() {
    if (!state.musicOn) {
      state.musicOn = true;
      startMusic();
      showToast('Your song is playing ♫');
    } else {
      state.musicOn = false;
      stopMusic(false);
      showToast('Music off');
    }
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    els.soundToggle.setAttribute('aria-pressed', String(state.soundEnabled));
    showToast(state.soundEnabled ? 'Touch sounds on' : 'Touch sounds muted');
  }

  function updateHUD(sceneIndex) {
    const normalized = Math.max(0, Math.min(TOTAL_SCENES, Math.floor(sceneIndex)));
    const percent = normalized <= 0 ? 0 : ((normalized - 1) / (TOTAL_SCENES - 1)) * 100;
    els.progressFill.style.width = `${Math.max(0, percent)}%`;
    els.sceneCount.textContent = `${String(Math.max(1, normalized)).padStart(2, '0')} / ${TOTAL_SCENES}`;
    els.nextScene.style.opacity = normalized >= TOTAL_SCENES ? '.5' : '1';
    setTimeout(updateNextControl, 40);
  }

  async function changeScene(sceneNumber, immediate = false) {
    const target = Math.round(sceneNumber);
    if (target < 1 || target > TOTAL_SCENES || state.transitionLocked || target === state.currentScene) return;

    const current = els.scenes.find(s => Number(s.dataset.scene) === Number(state.currentScene));
    const next = els.scenes.find(s => Number(s.dataset.scene) === target);
    if (!next) {
      console.error(`[Movie] Scene ${target} was requested but does not exist.`);
      return;
    }

    state.transitionLocked = true;
    try {
      safePlay('whoosh');

      if (!immediate && current) current.classList.remove('is-active');
      els.scenes.forEach(s => { if (s !== next) s.classList.remove('is-active'); });

      // Always enter a chapter at its beginning.
      next.scrollTop = 0;
      next.classList.add('is-active');
      state.currentScene = target;
      updateHUD(target);

      // Animation code is decorative. A broken animation must never block the story.
      try {
        const task = runSceneIntro(target);
        if (task && typeof task.catch === 'function') {
          task.catch(error => console.error(`[Movie] Scene ${target} intro animation failed:`, error));
        }
      } catch (error) {
        console.error(`[Movie] Scene ${target} intro animation failed:`, error);
      }

      next.classList.remove('scene-entered');
      void next.offsetWidth;
      next.classList.add('scene-entered');
      setTimeout(updateNextControl, 120);
      await sleep(immediate ? 50 : 420);
    } finally {
      // Critical reliability guard: navigation is always released.
      state.transitionLocked = false;
    }
  }

  function runSceneIntro(n) {
    // Scene-specific animation hooks. Returning the hook makes failures observable,
    // while changeScene() still guarantees that navigation can never deadlock.
    switch (n) {
      case 1: return runScene1();
      case 2: return runScene2();
      case 3: return runScene3();
      case 5: return runScene5();
      case 7: return runScene7();
      case 8: return initQuiz();
      case 10: return spawnSecretHearts();
      case 12: return runErrorScene();
      case 14: return startCounter();
      case 15: return renderMemories();
      case 18: return runSurpriseScene();
      default: return undefined;
    }
  }

  function runScene5() {
    // The previous build referenced runScene5() but never defined it.
    // That threw a ReferenceError on “The Real Story” and permanently locked navigation.
    const date = document.querySelector('#scene-5 .date-reveal');
    const cards = [...document.querySelectorAll('#scene-5 .timeline-card')];
    const reflection = document.querySelector('#scene-5 .reflection-card');

    if (date) {
      date.style.opacity = '0';
      date.style.transform = 'translateY(14px) scale(.98)';
      setTimeout(() => tween(date, { opacity: 1, y: 0 }, .7), prefersReducedMotion ? 10 : 120);
    }

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      setTimeout(() => tween(card, { opacity: 1, y: 0 }, .82), (prefersReducedMotion ? 20 : 360) * i + 300);
    });

    if (reflection) {
      reflection.style.opacity = '0';
      reflection.style.transform = 'translateY(18px)';
      setTimeout(() => tween(reflection, { opacity: 1, y: 0 }, .9), prefersReducedMotion ? 80 : 2050);
    }
  }

  function runScene7() {
    // This hook was also referenced but missing in the previous build.
    const cards = [...document.querySelectorAll('#scene-7 .effort-card')];
    const closing = [...document.querySelectorAll('#scene-7 .thanks-line, #scene-7 .thanks-sub, #scene-7 .hands')];

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px) scale(.985)';
      setTimeout(() => tween(card, { opacity: 1, y: 0 }, .78), (prefersReducedMotion ? 20 : 320) * i + 140);
    });

    closing.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      setTimeout(() => tween(el, { opacity: 1, y: 0 }, .82), (prefersReducedMotion ? 25 : 390) * i + 1280);
    });
  }

  async function runScene1() {
    els.chakliiCopy.textContent = '';
    els.popatCopy.textContent = '';
    await typeText(els.chakliiCopy, 'Cute. Beautiful. Dangerously adorable. Can become angry faster than WiFi disconnects 😂', 32);
    await sleep(450);
    await typeText(els.popatCopy, 'Professional teaser. Part-time troublemaker. Full-time Chaklii lover. ❤️', 32);
  }

  async function runScene2() {
    document.querySelectorAll('#scene-2 .reveal-line').forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
      setTimeout(() => tween(el, { opacity: 1, y: 0 }, .82), i * (prefersReducedMotion ? 50 : 760));
    });
  }

  function runScene3() {
    if (state.complaintSubmitted) return;
    document.querySelectorAll('.complaint-item').forEach((item, i) => {
      item.style.opacity = '0'; item.style.transform = 'translateX(-22px)';
      setTimeout(() => tween(item, { opacity: 1, x: 0 }, .5), i * (prefersReducedMotion ? 30 : 220));
      setTimeout(() => { item.querySelector('.checkbox').textContent = '☑'; }, i * (prefersReducedMotion ? 30 : 220) + (prefersReducedMotion ? 0 : 350));
    });
  }

  function dramaticChoice(value) {
    safePlay('tap');
    if (value === 'chaklii') {
      const btn = document.querySelector('[data-value="chaklii"]');
      btn.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], {duration:650});
      els.dramaticResult.textContent = 'Chaklii chose herself… brave girl. 😂';
      setTimeout(() => els.dramaticResult.textContent = 'But Popat would like to submit Exhibit A: himself. 😌', Math.round(1900));
      setTimeout(() => els.dramaticResult.textContent = 'Final verdict: Popat is the dramatic one. You were just being cute. ❤️', Math.round(4000));
      createHearts(8);
    } else {
      els.dramaticResult.textContent = 'Correct answer. 😌 Popat accepts the evidence.';
      setTimeout(() => { els.dramaticResult.textContent = 'Chaklii has successfully identified the dramatic Popat. 🏆❤️'; createHearts(16); }, Math.round(5200));
    }
  }

  function fightChoice(value) {
    safePlay('tap');
    if (value === 'him') {
      els.fightResult.textContent = 'Exactly. Popat accepts the accusation. 😂❤️';
      setTimeout(() => els.fightResult.textContent = 'Chaklii gets bonus points for knowing her Popat. ❤️', Math.round(2400));
      createHearts(10);
    } else {
      const btn = document.querySelector('#scene-2 [data-value="me"]');
      btn.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], {duration:260});
      state.noClicks.scene2 = (state.noClicks.scene2 || 0) + 1;
      els.fightResult.textContent = state.noClicks.scene2 === 1 ? 'Nice try, Chaklii… but Popat is taking the blame today. 😂' : 'Nope. Popat refuses to let you carry the blame. 👀❤️';
      if (state.noClicks.scene2 >= 3) els.fightResult.textContent = 'Okay okay… fine. Sometimes Popat contributes more than a little. 😂❤️';
    }
  }

  async function submitComplaint() {
    if (state.complaintSubmitted) return;
    state.complaintSubmitted = true;
    safePlay('tap');
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.to(els.complaintStamp, { opacity: 1, scale: 1, rotation: -11, duration: .42, ease: 'back.out(1.6)' });
    } else {
      els.complaintStamp.style.opacity = '1'; els.complaintStamp.style.transform = 'rotate(-11deg) scale(1)';
    }
    els.complaintResult.textContent = 'Punishment decided…';
    await sleep(1000);
    els.complaintResult.textContent = 'Popat must love Chaklii forever. ❤️';
    createHearts(14);
  }

  function makeRunawayButton(button, container, attempts, messages, resultEl) {
    attempts++;
    button.textContent = messages[Math.min(attempts - 1, messages.length - 1)];
    resultEl.textContent = messages[Math.min(attempts - 1, messages.length - 1)];
    if (attempts === 1) {
      button.animate([{transform:'translateX(0)'},{transform:'translateX(-14px)'},{transform:'translateX(10px)'},{transform:'translateX(0)'}], {duration:420});
    } else {
      const bounds = container.getBoundingClientRect();
      const maxX = Math.max(18, bounds.width / 2 - button.offsetWidth / 2 - 16);
      const x = Math.round((Math.random() * 2 - 1) * maxX);
      const y = Math.round((Math.random() * 2 - 1) * 40);
      button.style.transform = `translate(${x}px, ${y}px)`;
    }
    return attempts;
  }

  function yesEscape() {
    safePlay('tap');
    createHearts(28);
    els.escapeResult.textContent = 'I knew it ❤️';
    setTimeout(() => els.escapeResult.textContent = 'Good decision Chaklii 😌', 1000);
  }

  function noEscape() {
    state.noClicks.scene4 += 1;
    const n = state.noClicks.scene4;
    safePlay('tap');
    const messages = ['Are you sure Chaklii? 👀','Think again… This Popat is cute sometimes.','Button is losing confidence 😂'];
    if (n < 4) {
      els.noEscape.textContent = n === 1 ? 'NO 😤' : n === 2 ? 'NOPE 😤' : 'STILL NO 😤';
      els.noEscape.style.transform = `translate(${Math.round((Math.random() * 2 - 1) * 100)}px, ${Math.round((Math.random() * 2 - 1) * 44)}px) scale(${1 - n * .12})`;
      els.escapeResult.textContent = messages[n - 1];
    } else {
      els.noEscape.style.opacity = '0'; els.noEscape.style.pointerEvents = 'none';
      els.escapeResult.textContent = 'Interesting… Your escape plan failed. You are stuck with Popat forever ❤️';
      createHearts(20);
    }
  }

  async function openFirstLetter() {
    if (state.firstLetterOpened) return;
    state.firstLetterOpened = true;
    safePlay('tap');
    els.openLetter1.style.display = 'none';
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.timeline()
        .to(els.envelope1.querySelector('.envelope__flap'), { rotationX: 175, duration: .65, transformOrigin: '50% 0', ease:'power2.inOut' })
        .to(els.envelope1.querySelector('.envelope__seal'), { scale: 0, opacity: 0, duration:.25 }, '<')
        .to(els.envelope1.querySelector('.envelope__paper'), { yPercent: -48, duration:.7, ease:'power3.out' }, '-=.15')
        .call(() => { els.letter1.hidden = false; revealLetter(els.letter1); });
    } else {
      els.letter1.hidden = false; revealLetter(els.letter1);
    }
  }

  function revealLetter(container) {
    const paragraphs = [...container.querySelectorAll('p')];
    paragraphs.forEach((p, i) => {
      p.style.opacity = '0';
      p.style.transform = 'translateY(12px)';
      setTimeout(() => tween(p, { opacity: 1, y: 0 }, .72), i * (prefersReducedMotion ? 20 : 235));
    });
  }

  function initQuiz() {
    state.quizIndex = 0;
    state.quizAnswered = false;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = quiz[state.quizIndex];
    els.quizStep.textContent = String(state.quizIndex + 1);
    els.quizQuestion.textContent = q.q;
    els.quizOptions.innerHTML = '';
    els.quizResult.textContent = '';
    els.quizNext.hidden = true;
    q.options.forEach(([label, response]) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.type = 'button';
      btn.textContent = label;
      btn.addEventListener('click', () => answerQuiz(response, btn));
      els.quizOptions.appendChild(btn);
    });
  }

  function answerQuiz(response, btn) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;
    safePlay('tap');
    btn.style.borderColor = 'rgba(247,223,137,.65)';
    els.quizResult.textContent = response;
    if (state.quizIndex < quiz.length - 1) els.quizNext.hidden = false;
    else createHearts(18);
  }

  function nextQuiz() {
    if (!state.quizAnswered) return;
    state.quizIndex += 1;
    state.quizAnswered = false;
    renderQuizQuestion();
  }

  function spawnSecretHearts() {
    if (els.secretBoard.dataset.spawned === 'true') return;
    els.secretBoard.dataset.spawned = 'true';
    secretMessages.forEach((message, i) => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'secret-heart'; btn.textContent = '♥'; btn.setAttribute('aria-label', 'Reveal secret message');
      btn.style.left = `${10 + Math.random() * 76}%`;
      btn.style.top = `${10 + Math.random() * 72}%`;
      btn.style.animationDelay = `${-Math.random() * 6}s`;
      btn.addEventListener('click', () => {
        if (btn.dataset.clicked === 'true') return;
        btn.dataset.clicked = 'true';
        btn.style.opacity = '.15'; btn.style.pointerEvents = 'none';
        state.secretClickCount += 1;
        els.secretMessage.textContent = message;
        safePlay('tap'); createHearts(5);
        if (state.secretClickCount === secretMessages.length) showToast('You found all the hidden messages ❤️');
        setTimeout(() => spawnReplacementHeart(), 450);
      });
      els.secretBoard.appendChild(btn);
    });
  }

  function spawnReplacementHeart() {
    const btn = document.createElement('button');
    btn.type='button'; btn.className='secret-heart'; btn.textContent='♥'; btn.setAttribute('aria-label','Reveal another secret message');
    btn.style.left = `${10 + Math.random() * 76}%`; btn.style.top=`${10 + Math.random()*72}%`; btn.style.animationDelay=`${-Math.random()*6}s`;
    const msg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    btn.addEventListener('click', () => { els.secretMessage.textContent=msg; btn.remove(); createHearts(5); safePlay('tap'); });
    els.secretBoard.appendChild(btn);
  }

  function runErrorScene() {
    els.scanFill.style.width = '0%';
    els.continueError.disabled = true;
    els.errorCopy.textContent = 'Running relationship diagnostics…';
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.round(8 + Math.random()*14);
      if (progress >= 100) {
        progress = 100; clearInterval(timer);
        els.scanFill.style.width='100%';
        els.errorCopy.textContent = 'ERROR FOUND — Too much Chaklii cuteness detected.';
        els.continueError.disabled = false;
        createHearts(10);
      }
      els.scanFill.style.width = `${progress}%`;
    }, prefersReducedMotion ? 80 : 170);
  }

  function updateSettings() {
    safePlay('tap');
    els.settingsResult.textContent = 'Error ❌';
    setTimeout(() => els.settingsResult.textContent = 'Chaklii cannot be modified. She is already perfect. ❤️', 650);
    createHearts(10);
  }

  async function openFinalLetter() {
    if (state.finalLetterOpened) return;
    state.finalLetterOpened = true;
    safePlay('tap');
    els.openFinalLetter.style.display='none';
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.timeline()
        .to('.envelope--final .envelope__flap',{rotationX:175,duration:.65,transformOrigin:'50% 0',ease:'power2.inOut'})
        .to('.envelope--final .envelope__seal',{scale:0,opacity:0,duration:.25},'<')
        .to('.envelope--final .envelope__paper',{yPercent:-48,duration:.7,ease:'power3.out'},'-.15')
        .call(() => { els.finalLetter.hidden=false; revealLetter(els.finalLetter); createHearts(18); });
    } else {
      els.finalLetter.hidden=false; revealLetter(els.finalLetter); createHearts(18);
    }
  }

  function updateCounter() {
    const now = new Date();
    let diff = Math.max(0, now.getTime() - START_DATE.getTime());
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    els.countDays.textContent = String(days).padStart(4,'0');
    els.countHours.textContent = String(hours).padStart(2,'0');
    els.countMinutes.textContent = String(minutes).padStart(2,'0');
    els.countSeconds.textContent = String(seconds).padStart(2,'0');
  }

  let counterTimer = null;
  function startCounter() {
    updateCounter();
    clearInterval(counterTimer);
    counterTimer = setInterval(updateCounter, 1000);
  }

  function renderMemories() {
    if (els.memoryTimeline.dataset.rendered === 'true') return;
    els.memoryTimeline.dataset.rendered = 'true';
    memories.forEach((memory, i) => {
      const card = document.createElement('article');
      card.className='memory-card';
      card.style.setProperty('--tilt', `${i % 2 === 0 ? -1.2 : 1.1}deg`);
      const media = document.createElement('div'); media.className='memory-card__media';
      if (memory.image) {
        const img = document.createElement('img'); img.loading='lazy'; img.alt=memory.title; img.src=memory.image;
        img.onerror = () => { media.innerHTML=''; const p=document.createElement('div'); p.className='memory-placeholder'; p.innerHTML='♥<br><span>A memory lives here</span>'; media.appendChild(p); };
        media.appendChild(img);
      } else {
        const placeholder = document.createElement('div'); placeholder.className='memory-placeholder'; placeholder.innerHTML='♥<br><span>A memory lives here</span>'; media.appendChild(placeholder);
      }
      const copy=document.createElement('div');
      copy.innerHTML=`<div class="memory-card__date">${escapeHtml(memory.date)}</div><h3>${escapeHtml(memory.title)}</h3><p>${escapeHtml(memory.message)}</p>`;
      card.append(media,copy); els.memoryTimeline.appendChild(card);
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function yesFinal() {
    safePlay('tap'); createHearts(70);
    els.finalEscapeResult.textContent='Correct choice detected ❤️';
    setTimeout(() => els.finalEscapeResult.textContent='Chaklii officially chooses Popat again.', 950);
  }

  function noFinal() {
    state.noClicks.scene17 += 1;
    safePlay('tap');
    const n=state.noClicks.scene17;
    const messages=['Nice try 😂','Your escape plan is weak.','Even the button knows you love Popat.','No button available. Only Popat available forever. ❤️'];
    if (n<4) {
      const row=els.finalEscapeRow.getBoundingClientRect();
      const maxX=Math.max(40,row.width/2-els.noFinal.offsetWidth/2-20);
      const x=Math.round((Math.random()*2-1)*maxX), y=Math.round((Math.random()*2-1)*55);
      els.noFinal.style.transform=`translate(${x}px,${y}px) rotate(${n*8}deg) scale(${1-n*.13})`;
      els.finalEscapeResult.textContent=messages[n-1];
    } else {
      els.noFinal.style.opacity='0'; els.noFinal.style.pointerEvents='none'; els.finalEscapeResult.textContent=messages[3]; createHearts(28);
    }
  }

  function runSurpriseScene() {
    if (state.surpriseOpened) return;
    setTimeout(() => { if (state.currentScene===18) createHearts(8); }, 1900);
  }

  function revealEndingLoveLetter() {
    if (!els.endingLoveLetterStage || !els.endingLoveLetter) return;
    els.endingLoveLetterStage.hidden = false;
    els.endingLoveLetter.hidden = false;
    els.toCredits.style.display = 'none';
    setTimeout(() => {
      els.endingLoveLetterStage.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      revealLetter(els.endingLoveLetter);
      createHearts(30);
    }, prefersReducedMotion ? 100 : 2200);
    setTimeout(() => { els.toCredits.style.display = ''; }, prefersReducedMotion ? 350 : 1800);
  }

  function openSurprise() {
    if (state.surpriseOpened) return;
    state.surpriseOpened=true;
    safePlay('whoosh');
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.to(els.treasureBox.querySelector('.treasure-lid'), { rotationX:-120, transformOrigin:'50% 100%', duration:1.15, ease:'power3.inOut' });
      window.gsap.to(els.treasureBox, { y:-8, scale:1.08, duration:.85, ease:'power2.out' });
      window.gsap.to(els.openSurprise, { opacity:0, scale:.8, duration:.45, onComplete:() => {
        els.openSurprise.style.display='none';
        els.surpriseResult.hidden=false;
        tween(els.surpriseResult,{opacity:1,y:0},1.0);
        createHearts(100);
        revealEndingLoveLetter();
      } });
    } else {
      els.openSurprise.style.display='none';
      els.surpriseResult.hidden=false;
      createHearts(100);
      revealEndingLoveLetter();
    }
  }

  function createParticle() {
    const p = document.createElement('span'); p.className='particle';
    p.style.left=`${Math.random()*100}%`; p.style.top=`${Math.random()*100}%`; p.style.width=`${1+Math.random()*3}px`; p.style.height=p.style.width; p.style.opacity=`${.12+Math.random()*.4}`;
    els.particleLayer.appendChild(p);
    const duration = 12000 + Math.random()*11000;
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.to(p,{y:-(40+Math.random()*160),x:(Math.random()*2-1)*50,opacity:0,duration:duration/1000,ease:'sine.inOut',onComplete:()=>{p.remove();createParticle();}});
    } else {
      p.animate([{transform:'translate(0,0)',opacity:p.style.opacity},{transform:`translate(${(Math.random()*2-1)*50}px,-${40+Math.random()*160}px)`,opacity:0}],{duration,easing:'ease-in-out'}).onfinish=()=>{p.remove();createParticle();};
    }
  }

  function createAmbientHeart() {
    const heart = document.createElement('span');
    const shapes = ['♥', '♡', '♥', '♡', '❥', '♥  ♥'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    heart.className = `ambient-heart${shape.includes('  ') ? ' ambient-heart--pair' : ''}`;
    heart.textContent = shape;
    heart.style.left = `${3 + Math.random() * 94}%`;
    heart.style.top = `${68 + Math.random() * 28}%`;
    heart.style.fontSize = `${8 + Math.random() * 24}px`;
    const ambientOpacity = 0.035 + Math.random() * 0.055;
    heart.style.setProperty('--ambient-opacity', `${ambientOpacity}`);
    heart.style.setProperty('--ambient-mid-opacity', `${ambientOpacity * .78}`);
    heart.style.setProperty('--ambient-low-opacity', `${ambientOpacity * .48}`);
    const duration = 17000 + Math.random() * 13000;
    els.heartLayer.appendChild(heart);

    if (window.gsap && !prefersReducedMotion) {
      const peakOpacity = Number.parseFloat(heart.style.getPropertyValue('--ambient-opacity')) || .07;
      window.gsap.timeline({ onComplete: () => { heart.remove(); createAmbientHeart(); } })
        .fromTo(heart,
          { opacity: 0, y: 26, x: 0, scale: .72, rotation: -10 },
          { opacity: peakOpacity, y: 0, duration: 2.2, ease: 'sine.out' }
        )
        .to(heart, {
          y: -(230 + Math.random() * 360),
          x: (Math.random() * 2 - 1) * 105,
          rotation: (Math.random() * 2 - 1) * 20,
          scale: .9 + Math.random() * .32,
          opacity: 0,
          duration: Math.max(12, duration / 1000 - 2.2),
          ease: 'sine.inOut'
        });
    } else {
      heart.style.animation = `ambientDriftSoft ${duration}ms ease-in-out forwards`;
      setTimeout(() => { heart.remove(); createAmbientHeart(); }, duration + 120);
    }
  }

  function createHeart(xPercent = 50, yPercent = 65) {
    const heart = document.createElement('span');
    const shapes = ['♥', '♡', '❥', '♥', '♡', '♥  ♥'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    heart.className = `float-heart${shape.includes('  ') ? ' float-heart--pair' : ''}`;
    heart.textContent = shape;
    heart.style.left = `${xPercent}%`;
    heart.style.top = `${yPercent}%`;
    heart.style.fontSize = `${9 + Math.random() * 23}px`;
    els.heartLayer.appendChild(heart);

    const dx = (Math.random() * 2 - 1) * 120;
    const dy = 130 + Math.random() * 220;
    const peakOpacity = .12 + Math.random() * .12;
    const driftDuration = 2.5 + Math.random() * 1.9;

    if (window.gsap && !prefersReducedMotion) {
      // Use a real GSAP timeline. The old Tween.to() chain threw an error,
      // leaving each heart permanently on screen and causing the dense heart wall.
      window.gsap.timeline({ onComplete: () => heart.remove() })
        .fromTo(heart,
          { opacity: 0, scale: .65, y: 14, rotation: -8 },
          { opacity: peakOpacity, scale: 1, y: 0, duration: .55, ease: 'sine.out' }
        )
        .to(heart, {
          x: dx,
          y: -dy,
          rotation: (Math.random() * 2 - 1) * 24,
          scale: .9 + Math.random() * .3,
          opacity: 0,
          duration: driftDuration,
          ease: 'sine.out'
        });
    } else {
      const animation = heart.animate([
        { opacity: 0, transform: 'translate(0,14px) scale(.65) rotate(-8deg)' },
        { opacity: peakOpacity, transform: 'translate(0,0) scale(1) rotate(0deg)', offset: .18 },
        { opacity: 0, transform: `translate(${dx}px,-${dy}px) scale(1.08) rotate(12deg)` }
      ], { duration: 3000 + Math.random() * 1600, easing: 'ease-out' });
      animation.onfinish = () => heart.remove();
    }
  }

  function createHearts(count=12) {
    const spacing = prefersReducedMotion ? 18 : 86;
    for (let i=0; i<count; i++) {
      setTimeout(() => createHeart(6 + Math.random() * 88, 72 + Math.random() * 24), i * spacing);
    }
  }

  function activeScene() {
    return els.scenes.find(s => Number(s.dataset.scene) === Number(state.currentScene));
  }

  function updateNextControl() {
    const label = els.nextScene.querySelector('span');
    const arrow = els.nextScene.querySelector('b');
    const finished = state.currentScene >= TOTAL_SCENES;

    els.nextScene.disabled = finished;
    if (label) label.textContent = finished ? 'Finished' : 'Continue';
    if (arrow) arrow.textContent = finished ? '♥' : '→';
  }

  function nextScene() {
    // Reliability first: Continue ALWAYS advances one chapter.
    // Long chapters can still be read by normal vertical scrolling/swiping.
    if (state.currentScene >= 1 && state.currentScene < TOTAL_SCENES) {
      changeScene(state.currentScene + 1);
    }
  }

  function replayStory() {
    stopMusic(true); state.musicOn=false; state.currentScene=0.5; state.noClicks={scene4:0,scene17:0}; state.complaintSubmitted=false; state.firstLetterOpened=false; state.finalLetterOpened=false; state.surpriseOpened=false;
    els.sceneCount.textContent='01 / 19';
    els.progressFill.style.width='0%';
    els.scenes.forEach(s=>s.classList.remove('is-active'));
    document.getElementById('intro-screen').classList.add('is-active');
    document.querySelector('.curtain--left').style.transform='translateX(0)';
    document.querySelector('.curtain--right').style.transform='translateX(0)';
    els.noEscape.style.cssText=''; els.noEscape.textContent='NO 😤'; els.noEscape.style.opacity='1'; els.noEscape.style.pointerEvents='auto';
    els.noFinal.style.cssText=''; els.noFinal.textContent='NO 😤'; els.noFinal.style.opacity='1'; els.noFinal.style.pointerEvents='auto';
    els.openLetter1.style.display=''; els.letter1.hidden=true; els.openFinalLetter.style.display=''; els.finalLetter.hidden=true; els.finalLetterWrap.style.display='';
    if (els.endingLoveLetterStage) els.endingLoveLetterStage.hidden = true;
    if (els.endingLoveLetter) els.endingLoveLetter.hidden = true;
    if (els.toCredits) els.toCredits.style.display = '';
    window.scrollTo(0,0); showToast('Our movie starts again. ❤️');
  }

  function bind() {
    els.enterStory.addEventListener('click', openStory);
    els.musicToggle.addEventListener('click', toggleMusic);
    els.soundToggle.addEventListener('click', toggleSound);
    els.nextScene.addEventListener('click', nextScene);
    els.replayStory.addEventListener('click', replayStory);
    els.submitComplaint.addEventListener('click', submitComplaint);
    els.yesEscape.addEventListener('click', yesEscape);
    els.noEscape.addEventListener('click', noEscape);
    els.openLetter1.addEventListener('click', openFirstLetter);
    els.quizNext.addEventListener('click', nextQuiz);
    els.updateSettings.addEventListener('click', updateSettings);
    els.continueError.addEventListener('click', () => { showToast('Impossible. Still too cute. 😂❤️'); createHearts(20); });
    els.openFinalLetter.addEventListener('click', openFinalLetter);
    els.yesFinal.addEventListener('click', yesFinal);
    els.noFinal.addEventListener('click', noFinal);
    els.openSurprise.addEventListener('click', openSurprise);
    els.toCredits.addEventListener('click', () => changeScene(19));

    document.querySelectorAll('#scene-1 .choice-btn').forEach(btn => btn.addEventListener('click', e => dramaticChoice(e.currentTarget.dataset.value)));
    document.querySelectorAll('#scene-2 .choice-btn').forEach(btn => btn.addEventListener('click', e => fightChoice(e.currentTarget.dataset.value)));

    const canScrollScene = (scene, direction, scrollTop = scene?.scrollTop || 0) => {
      if (!scene) return false;
      const maxScroll = Math.max(0, scene.scrollHeight - scene.clientHeight);
      if (maxScroll <= 2) return false;
      return direction > 0 ? scrollTop < maxScroll - 2 : scrollTop > 2;
    };

    let wheelLock=false;
    els.app.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) < 25 || wheelLock || state.currentScene < 1) return;

      const scene = activeScene();
      // Let long scenes scroll normally. Change chapters only when the user
      // scrolls beyond the top or bottom edge of the current scene.
      if (canScrollScene(scene, e.deltaY)) return;

      wheelLock=true;
      if (e.deltaY > 0) nextScene(); else if (state.currentScene>1) changeScene(state.currentScene-1);
      setTimeout(()=>wheelLock=false,650);
    }, {passive:true});

    els.app.addEventListener('touchstart', e => {
      const t=e.changedTouches[0];
      state.touchStartX=t.clientX;
      state.touchStartY=t.clientY;
      state.touchStartScrollTop=activeScene()?.scrollTop || 0;
    }, {passive:true});

    els.app.addEventListener('touchend', e => {
      const t=e.changedTouches[0]; const dx=t.clientX-state.touchStartX, dy=t.clientY-state.touchStartY;
      if (state.currentScene < 1) return;
      if (Math.abs(dx)>55 || Math.abs(dy)>70) {
        if (Math.abs(dy)>=Math.abs(dx)) {
          const direction = dy < 0 ? 1 : -1;
          const scene = activeScene();
          // If this swipe began while more content was available in the same
          // scene, keep the swipe for scrolling instead of skipping a chapter.
          if (canScrollScene(scene, direction, state.touchStartScrollTop)) return;
          if (dy < 0) nextScene(); else if (state.currentScene>1) changeScene(state.currentScene-1);
        } else {
          if (dx < 0) nextScene(); else if (state.currentScene>1) changeScene(state.currentScene-1);
        }
      }
    }, {passive:true});


    els.scenes.forEach(scene => scene.addEventListener('scroll', updateNextControl, { passive: true }));

    document.addEventListener('keydown', e => {
      if (state.currentScene < 1) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextScene();
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && state.currentScene > 1) {
        e.preventDefault();
        changeScene(state.currentScene - 1);
      }
    });
  }

  function setViewportHeight() {
    document.documentElement.style.setProperty('--movie-vh', `${window.innerHeight}px`);
  }

  // Tiny read-only diagnostics helper used to verify hosted builds.
  window.__MOVIE_STATUS__ = () => ({
    currentScene: state.currentScene,
    totalScenes: TOTAL_SCENES,
    transitionLocked: state.transitionLocked,
    activeSceneId: activeScene()?.id || null
  });

  function init() {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(setViewportHeight, 180), { passive: true });
    // Create a subtle background particle field, then recycle particles forever.
    for (let i=0;i<(window.innerWidth<600?22:34);i++) createParticle();
    for (let i=0;i<(window.innerWidth<600?5:8);i++) setTimeout(createAmbientHeart, i * 850);
    bind();
    updateHUD(1);
    loadingSequence();
  }

  init();
})();
