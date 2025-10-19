import {
  lgBindThemeMode,
  lgBindBrandSelect,
  lgBindRipple,
  lgReveals,
  lgParallax,
  lgTimelineSpy,
  lgBackgroundFlares,
  lgBindTTS,
  lgBindPills,
  lgApplyLEDGradient,
  lgSetPattern,
  lgSetIntensity,
  lgHeroTimelineLoop,
  lgSetSpeed,
  lgGetLEDPalette,
  lgGetLEDGlow,
  lgGetAuraGlow,
  lgTokenEvent
} from './lumigrid.js';

const sections = [
  'hero',
  'system',
  'deep',
  'led',
  'dayflow',
  'scenes',
  'layout',
  'aura',
  'gallery',
  'implement',
  'trust',
  'faq',
  'contact'
];

function createEventManager() {
  const cleanups = [];
  const add = (target, type, handler, options) => {
    if (!target) return;
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };
  const addMany = (targets, type, factory, options) => {
    targets.forEach((target) => {
      const handler = factory(target);
      add(target, type, handler, options);
    });
  };
  return {
    add,
    addMany,
    flush: () => {
      while (cleanups.length) {
        const fn = cleanups.pop();
        try {
          fn();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
}

export function initLandingPage() {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const manager = createEventManager();
  const cleanups = [];
  const use = (fn) => {
    if (typeof fn === 'function') {
      cleanups.push(fn);
    }
  };

  // FX canvas across the whole page
  use(lgBackgroundFlares({ canvasId: 'lg-fx' }));

  // Delight & structure helpers
  use(lgBindRipple());
  use(lgReveals());
  use(lgParallax());
  use(lgTimelineSpy({
    listSelector: '#lg-tl',
    progressSelector: '#lg-tl-progress',
    ids: sections
  }));

  // Theme / brand toggles
  use(lgBindThemeMode(document.querySelector('#uiTheme')));
  use(lgBindBrandSelect(document.querySelector('#brandTheme')));
  use(lgBindTTS(document.querySelector('#ttsToggle')));

  // Pills -> info cards
  use(lgBindPills());

  const ledTargets = '.led-ambient, .led-field, .layout-zone, .layout-map';
  const paletteButtons = Array.from(document.querySelectorAll('[data-led-palette]'));
  const patternButtons = Array.from(document.querySelectorAll('[data-led-pattern-btn]'));
  const sceneButtons = Array.from(document.querySelectorAll('[data-led-scene]'));
  const ledSpeedControl = document.getElementById('ledSpeed');
  const ledSpeedValue = document.querySelector('[data-led-speed-value]');
  const ledIntensityControl = document.getElementById('ledIntensity');
  const ledIntensityValue = document.querySelector('[data-led-intensity-value]');
  const dayflowRoot = document.querySelector('[data-dayflow]');
  const dayflowRange = document.querySelector('[data-dayflow-range]');
  const dayflowTrack = document.querySelector('[data-dayflow-track]');
  const dayflowTime = document.querySelector('[data-dayflow-time]');
  const dayflowName = document.querySelector('[data-dayflow-name]');
  const dayflowCopy = document.querySelector('[data-dayflow-copy]');
  const dayflowIcon = document.querySelector('[data-dayflow-icon]');
  const dayflowMarkers = Array.from(document.querySelectorAll('[data-dayflow-marker]'));
  const dayflowStrips = Array.from(document.querySelectorAll('[data-dayflow-strip]'));
  const sceneArray = Array.from(sceneButtons);
  const getActiveSceneButton = () => sceneArray.find((btn) => btn.classList.contains('is-active'));
  let activePaletteKey = 'rf';
  let activePatternKey = 'chase';
  let activeAuraMode = 'ambient';

  const layoutRoot = document.querySelector('[data-layout-root]');
  const layoutMap = layoutRoot?.querySelector('[data-layout-map]');
  const layoutZoneButtons = layoutRoot ? Array.from(layoutRoot.querySelectorAll('[data-layout-zone-btn]')) : [];
  const layoutZones = layoutRoot ? Array.from(layoutRoot.querySelectorAll('[data-layout-zone]')) : [];
  const layoutStatus = layoutRoot?.querySelector('[data-layout-status]');
  const layoutMood = layoutRoot?.querySelector('[data-layout-mood]');
  const layoutPaletteLabel = layoutRoot?.querySelector('[data-layout-palette]');
  const layoutPatternLabel = layoutRoot?.querySelector('[data-layout-pattern]');
  const layoutIntensityLabel = layoutRoot?.querySelector('[data-layout-intensity]');
  const layoutSpeedLabel = layoutRoot?.querySelector('[data-layout-speed]');
  const layoutCountLabel = layoutRoot?.querySelector('[data-layout-count]');
  const layoutPaletteNames = {
    rf: 'Signature spectrum',
    neon: 'Neon current',
    sunset: 'Sunset blend',
    mint: 'Mint drift'
  };
  const layoutPatternNames = {
    chase: 'Chase ribbon',
    pulse: 'Pulse bloom',
    wave: 'Wave sweep'
  };
  const layoutZoneLabels = Object.fromEntries(
    layoutZoneButtons.map((btn) => [
      btn.dataset.layoutZoneBtn || btn.dataset.layoutZone || '',
      btn.dataset.layoutZoneLabel || btn.textContent.trim()
    ])
  );

  const updateLayoutStatus = () => {
    if (!layoutRoot) return;
    const activeButtons = layoutZoneButtons.filter((btn) => btn.getAttribute('aria-pressed') === 'true');
    const activeKeys = new Set(
      activeButtons.map((btn) => btn.dataset.layoutZoneBtn || btn.dataset.layoutZone || '')
    );
    layoutZones.forEach((zone) => {
      const key = zone.dataset.layoutZone || '';
      zone.classList.toggle('is-active', activeKeys.has(key));
    });
    if (layoutCountLabel) {
      layoutCountLabel.textContent = String(activeButtons.length);
    }
    if (layoutStatus) {
      if (activeButtons.length) {
        const labels = activeButtons.map(
          (btn) => layoutZoneLabels[btn.dataset.layoutZoneBtn || btn.dataset.layoutZone || ''] || btn.textContent.trim()
        );
        layoutStatus.textContent = `${labels.join(' • ')} highlighted`;
      } else {
        layoutStatus.textContent = 'No fixtures highlighted';
      }
    }
    if (layoutMood) {
      layoutMood.textContent = activeButtons.length
        ? `Covering ${activeButtons.length} zone${activeButtons.length === 1 ? '' : 's'}`
        : 'Select a zone to preview coverage';
    }
  };

  const syncLayoutPalette = (paletteKey) => {
    if (!layoutRoot) return;
    const label = layoutPaletteNames[paletteKey] || paletteKey;
    if (layoutPaletteLabel) {
      layoutPaletteLabel.textContent = label;
    }
    const gradient = lgGetLEDPalette(paletteKey);
    const glow = lgGetLEDGlow(paletteKey);
    if (layoutMap) {
      layoutMap.style.setProperty('--layout-grad', gradient);
    }
    layoutRoot.style.setProperty('--layout-grad', gradient);
    layoutRoot.style.setProperty('--layout-glow', glow);
  };

  const syncLayoutPattern = (patternKey) => {
    if (!layoutRoot) return;
    if (layoutPatternLabel) {
      layoutPatternLabel.textContent = layoutPatternNames[patternKey] || patternKey;
    }
    layoutRoot.dataset.layoutPattern = patternKey;
  };

  const syncLayoutIntensity = (value) => {
    if (!layoutRoot) return;
    if (layoutIntensityLabel) {
      layoutIntensityLabel.textContent = `${Math.round(value * 100)}%`;
    }
    layoutRoot.style.setProperty('--layout-intensity', value.toFixed(2));
  };

  const syncLayoutSpeed = (value) => {
    if (!layoutRoot) return;
    if (layoutSpeedLabel) {
      layoutSpeedLabel.textContent = `${value.toFixed(1)}×`;
    }
    layoutRoot.style.setProperty('--layout-speed', value.toFixed(2));
  };

  layoutZoneButtons.forEach((btn) => {
    manager.add(btn, 'click', () => {
      const isPressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
      btn.classList.toggle('is-active', !isPressed);
      updateLayoutStatus();
    });
  });

  if (layoutRoot) {
    updateLayoutStatus();
  }

  const auraRoot = document.querySelector('[data-aura-lab]');
  const auraPreview = auraRoot?.querySelector('[data-aura-preview]');
  const auraStatus = auraRoot?.querySelector('[data-aura-status]');
  const auraModeButtons = auraRoot ? Array.from(auraRoot.querySelectorAll('[data-aura-mode]')) : [];
  const auraEffectButtons = auraRoot ? Array.from(auraRoot.querySelectorAll('[data-aura-effect]')) : [];
  const auraModeLabels = Object.fromEntries(
    auraModeButtons.map((btn) => [btn.dataset.auraMode || '', btn.dataset.auraLabel || btn.textContent.trim()])
  );
  const auraEffectLabels = Object.fromEntries(
    auraEffectButtons.map((btn) => [btn.dataset.auraEffect || '', btn.dataset.auraLabel || btn.textContent.trim()])
  );

  const updateAuraStatus = () => {
    if (!auraStatus) return;
    const modeKey = (auraPreview?.getAttribute('data-aura-mode') || auraModeButtons[0]?.dataset.auraMode || '').trim();
    const parts = [];
    if (modeKey && auraModeLabels[modeKey]) {
      parts.push(auraModeLabels[modeKey]);
    }
    const activeEffects = auraEffectButtons
      .filter((btn) => btn.getAttribute('aria-pressed') === 'true')
      .map((btn) => auraEffectLabels[btn.dataset.auraEffect || ''] || btn.textContent.trim());
    if (activeEffects.length) {
      parts.push(activeEffects.join(' + '));
    }
    if (auraPreview?.dataset.auraScene) {
      parts.push(`Scene: ${auraPreview.dataset.auraScene}`);
    }
    auraStatus.textContent = parts.join(' • ') || 'Custom blend';
  };

  const setAuraMode = (mode) => {
    if (!auraPreview) return;
    const fallback = auraModeButtons[0]?.dataset.auraMode || auraPreview.getAttribute('data-aura-mode') || 'ambient';
    const choice = auraModeLabels[mode] ? mode : fallback;
    auraPreview.setAttribute('data-aura-mode', choice);
    if (auraRoot) {
      auraRoot.style.setProperty('--aura-active-glow', lgGetAuraGlow(choice));
    }
    activeAuraMode = choice;
    auraModeButtons.forEach((btn) => {
      const isActive = btn.dataset.auraMode === choice;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('is-active', isActive);
    });
    updateAuraStatus();
  };

  const setAuraEffectState = (effect, enable) => {
    if (!auraPreview) return;
    const attr = `data-aura-${effect}`;
    if (enable) {
      auraPreview.setAttribute(attr, 'true');
    } else {
      auraPreview.removeAttribute(attr);
    }
  };

  const toggleAuraEffect = (effect) => {
    const btn = auraEffectButtons.find((b) => b.dataset.auraEffect === effect);
    if (!btn) return;
    const next = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', next ? 'true' : 'false');
    btn.classList.toggle('is-active', next);
    setAuraEffectState(effect, next);
    updateAuraStatus();
  };

  const setAuraScene = (sceneTitle, gradient) => {
    if (!auraPreview) return;
    auraPreview.dataset.auraScene = sceneTitle || '';
    auraPreview.style.setProperty('--scene-gradient', gradient || '');
    updateAuraStatus();
  };

  const updateSceneGradients = () => {
    sceneButtons.forEach((btn) => {
      const gradient = btn.dataset.sceneGradient || lgGetLEDPalette(btn.dataset.scenePalette || activePaletteKey);
      btn.style.setProperty('--scene-gradient', gradient);
    });
  };

  const syncDayflow = (sceneBtn, { fromSlider = false } = {}) => {
    if (!sceneBtn || !dayflowRoot) return;
    const icon = sceneBtn.dataset.sceneIcon;
    const label = sceneBtn.dataset.sceneLabel;
    const copy = sceneBtn.dataset.sceneCopy;
    const name = sceneBtn.dataset.sceneName;
    if (dayflowName) dayflowName.textContent = name || label || '';
    if (dayflowCopy) dayflowCopy.textContent = copy || '';
    if (dayflowIcon) dayflowIcon.setAttribute('data-scene', icon || '');
    if (dayflowTime) dayflowTime.textContent = sceneBtn.dataset.sceneTime || '';
    if (dayflowTrack) dayflowTrack.style.setProperty('--scene-gradient', sceneBtn.dataset.sceneGradient || '');
    dayflowMarkers.forEach((marker) => {
      marker.classList.toggle('is-active', marker.dataset.dayflowMarker === sceneBtn.dataset.dayflowMarker);
    });
    dayflowStrips.forEach((strip) => {
      strip.classList.toggle('is-active', strip.dataset.dayflowStrip === sceneBtn.dataset.dayflowStrip);
    });
    if (!fromSlider && dayflowRange) {
      const index = sceneArray.indexOf(sceneBtn);
      if (index >= 0) {
        dayflowRange.value = String(index);
        dayflowRange.setAttribute('aria-valuenow', String(index));
      }
    }
  };

  const clearSceneSelection = () => {
    sceneButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('is-active');
    });
  };

  const setPalette = (palette) => {
    const applied = lgApplyLEDGradient(ledTargets, palette);
    paletteButtons.forEach((btn) => {
      const isActive = btn.dataset.ledPalette === applied;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('is-active', isActive);
    });
    activePaletteKey = applied;
    syncLayoutPalette(applied);
    updateSceneGradients();
    return applied;
  };

  const setPattern = (pattern) => {
    const applied = lgSetPattern(ledTargets, pattern);
    patternButtons.forEach((btn) => {
      const isActive = btn.dataset.ledPatternBtn === applied;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('is-active', isActive);
    });
    activePatternKey = applied;
    syncLayoutPattern(applied);
    return applied;
  };

  const applySpeed = (value, { updateControl = false } = {}) => {
    const desired = Math.max(0.5, Math.min(2, parseFloat(value) || 1));
    const applied = lgSetSpeed(ledTargets, desired);
    if (ledSpeedValue) {
      ledSpeedValue.textContent = `${applied.toFixed(1)}×`;
    }
    if (updateControl && ledSpeedControl) {
      const normalized = Math.round(applied * 10) / 10;
      ledSpeedControl.value = normalized.toFixed(1);
    }
    if (auraRoot) {
      auraRoot.style.setProperty('--aura-speed', applied.toFixed(2));
    }
    syncLayoutSpeed(applied);
    return applied;
  };

  const applyIntensity = (value, { updateControl = false } = {}) => {
    const desired = Math.max(0.4, Math.min(1.2, parseFloat(value) || 1));
    const applied = lgSetIntensity(ledTargets, desired);
    if (ledIntensityValue) {
      ledIntensityValue.textContent = `${Math.round(applied * 100)}%`;
    }
    if (updateControl && ledIntensityControl) {
      const normalized = Math.round(applied * 20) / 20;
      ledIntensityControl.value = normalized.toString();
    }
    if (auraRoot) {
      auraRoot.style.setProperty('--aura-level', applied.toFixed(2));
    }
    syncLayoutIntensity(applied);
    return applied;
  };

  auraModeButtons.forEach((btn) => {
    manager.add(btn, 'click', () => setAuraMode(btn.dataset.auraMode || ''));
  });
  auraEffectButtons.forEach((btn) => {
    manager.add(btn, 'click', () => toggleAuraEffect(btn.dataset.auraEffect || ''));
  });
  if (auraModeButtons.length) {
    setAuraMode(auraModeButtons[0].dataset.auraMode || 'ambient');
  } else if (auraPreview) {
    setAuraMode(auraPreview.getAttribute('data-aura-mode') || 'ambient');
  } else {
    updateAuraStatus();
  }
  auraEffectButtons.forEach((btn) => {
    const isPressed = btn.getAttribute('aria-pressed') === 'true';
    setAuraEffectState(btn.dataset.auraEffect || '', isPressed);
  });

  paletteButtons.forEach((btn) => {
    manager.add(btn, 'click', () => {
      clearSceneSelection();
      setPalette(btn.dataset.ledPalette || 'rf');
    });
  });
  patternButtons.forEach((btn) => {
    manager.add(btn, 'click', () => {
      clearSceneSelection();
      setPattern(btn.dataset.ledPatternBtn || 'chase');
    });
  });

  const defaultPalette = paletteButtons[0]?.dataset.ledPalette || 'rf';
  const defaultPattern = patternButtons[0]?.dataset.ledPatternBtn || 'chase';
  activePaletteKey = defaultPalette;
  activePatternKey = defaultPattern;
  setPalette(defaultPalette);
  setPattern(defaultPattern);

  if (ledSpeedControl) {
    manager.add(ledSpeedControl, 'input', () => {
      clearSceneSelection();
      applySpeed(ledSpeedControl.value);
    });
    applySpeed(ledSpeedControl.value, { updateControl: true });
  } else {
    applySpeed(1);
  }

  if (ledIntensityControl) {
    manager.add(ledIntensityControl, 'input', () => {
      clearSceneSelection();
      applyIntensity(ledIntensityControl.value);
    });
    applyIntensity(ledIntensityControl.value, { updateControl: true });
  } else {
    applyIntensity(1);
  }

  const applyScene = (btn, { fromSlider = false } = {}) => {
    const sceneTitle = btn.dataset.sceneTitle || btn.querySelector('.scene-title')?.textContent || '';
    const palette = btn.dataset.scenePalette || defaultPalette;
    const pattern = btn.dataset.scenePattern || defaultPattern;
    const speed = btn.dataset.sceneSpeed;
    const intensity = btn.dataset.sceneIntensity;
    setPalette(palette);
    setPattern(pattern);
    const gradient = btn.dataset.sceneGradient || lgGetLEDPalette(palette);
    if (speed) {
      applySpeed(speed, { updateControl: true });
    }
    if (intensity) {
      applyIntensity(intensity, { updateControl: true });
    }
    sceneButtons.forEach((sceneBtn) => {
      const isActive = sceneBtn === btn;
      sceneBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      sceneBtn.classList.toggle('is-active', isActive);
    });
    setAuraScene(sceneTitle, gradient);
    syncDayflow(btn, { fromSlider });
  };

  sceneButtons.forEach((btn) => {
    manager.add(btn, 'click', () => applyScene(btn));
  });
  updateSceneGradients();

  if (sceneButtons.length) {
    applyScene(sceneButtons[0]);
  }

  if (dayflowRange) {
    const maxIndex = Math.max(0, sceneArray.length - 1);
    dayflowRange.max = String(maxIndex);
    dayflowRange.setAttribute('aria-valuemax', String(maxIndex));
    manager.add(dayflowRange, 'input', () => {
      const idx = parseInt(dayflowRange.value, 10) || 0;
      const target = sceneArray[idx];
      if (target) {
        applyScene(target, { fromSlider: true });
      }
    });
  }

  const onTokenChange = () => {
    const activeScene = getActiveSceneButton();
    if (activeScene) {
      applyScene(activeScene, { fromSlider: true });
    } else {
      setPalette(activePaletteKey);
      setPattern(activePatternKey);
    }
    if (auraModeButtons.length) {
      setAuraMode(activeAuraMode);
    } else {
      updateAuraStatus();
    }
  };
  manager.add(document, lgTokenEvent, onTokenChange);

  use(lgHeroTimelineLoop());

  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const msgEl = document.getElementById('msg');
  const note = document.getElementById('formNote');
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const err = (el, id, message) => {
    const e = document.getElementById(id);
    if (e) e.textContent = message || '';
    if (el) el.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  [nameEl, emailEl, msgEl].forEach((el) => {
    if (!el) return;
    manager.add(el, 'input', () => {
      if (el === nameEl) err(el, 'err-name', nameEl.value.trim() ? '' : 'Please enter your name.');
      if (el === emailEl) err(el, 'err-email', emailOk(emailEl.value) ? '' : 'Please enter a valid email.');
      if (el === msgEl) err(el, 'err-msg', msgEl.value.trim() ? '' : 'Tell us a little about your project.');
    });
  });

  if (form) {
    manager.add(form, 'submit', (e) => {
      e.preventDefault();
      let ok = true;
      if (!nameEl?.value.trim()) {
        err(nameEl, 'err-name', 'Please enter your name.');
        ok = false;
      }
      if (!emailOk(emailEl?.value || '')) {
        err(emailEl, 'err-email', 'Please enter a valid email.');
        ok = false;
      }
      if (!msgEl?.value.trim()) {
        err(msgEl, 'err-msg', 'Tell us a little about your project.');
        ok = false;
      }
      if (!ok) {
        if (note) note.textContent = 'Please fix the highlighted fields.';
        return;
      }
      if (note) note.textContent = 'Thanks! We’ll get back to you shortly.';
      form.reset();
      ['err-name', 'err-email', 'err-msg'].forEach((id) => {
        const target = document.getElementById(id);
        if (target) target.textContent = '';
      });
    });
  }

  return () => {
    manager.flush();
    while (cleanups.length) {
      const fn = cleanups.pop();
      try {
        fn();
      } catch (err) {
        console.error(err);
      }
    }
  };
}
