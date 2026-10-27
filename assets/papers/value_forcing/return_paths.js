/* Figure 7, humanoidmaze-giant: reveal recorded Euler paths up to flow time tau.
   The return density appears only at tau = 1. Recorded paths and densities are
   loaded from ret_flow_paths/humanoidmaze_giant_interactive.json. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var WIDTH = 330;
  var HEIGHT = 295;
  var TOP = 24;
  var BOTTOM = 244;
  var START = 82;
  var END = 234;
  var SPAN = END - START;
  var LEFT = START - 0.26 * SPAN;
  var RIGHT = END + 0.26 * SPAN;
  var VIOLIN = 0.22 * SPAN;
  var PLAY_DURATION = 6000;

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function svgElement(tag, attributes, text) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attributes || {}).forEach(function (key) { node.setAttribute(key, attributes[key]); });
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function yPosition(value) { return TOP + (1 - value) * (BOTTOM - TOP) / 2; }
  function clampTau(value) {
    var number = Number(value);
    return isFinite(number) ? Math.max(0, Math.min(1, number)) : 0;
  }

  function trajectoryPath(values, times) {
    return values.map(function (value, i) {
      return (i ? 'L' : 'M') + (START + SPAN * times[i]).toFixed(3) + ' ' + yPosition(value).toFixed(3);
    }).join('');
  }

  function violinPath(grid, density, data) {
    var center = (data.returnRange[0] + data.returnRange[1]) / 2;
    var half = (data.returnRange[1] - data.returnRange[0]) / 2;
    var path = 'M' + END + ' ' + yPosition((grid[0] - center) / half).toFixed(3);
    for (var i = 0; i < grid.length; i++) {
      path += 'L' + (END + VIOLIN * density[i] / data.kde.scale).toFixed(3) + ' ' +
        yPosition((grid[i] - center) / half).toFixed(3);
    }
    return path + 'L' + END + ' ' + yPosition((grid[grid.length - 1] - center) / half).toFixed(3) + 'Z';
  }

  function noisePath(halfRange) {
    var path = 'M' + START + ' ' + BOTTOM;
    for (var i = 0; i <= 120; i++) {
      var noise = -halfRange + 2 * halfRange * i / 120;
      path += 'L' + (START - VIOLIN * Math.exp(-0.5 * noise * noise)).toFixed(3) + ' ' +
        yPosition(noise / halfRange).toFixed(3);
    }
    return path + 'L' + START + ' ' + TOP + 'Z';
  }

  function validNumbers(values, count) {
    return Array.isArray(values) && values.length === count && values.every(function (v) {
      return typeof v === 'number' && isFinite(v);
    });
  }

  function validate(data) {
    if (!data || data.version !== 1 || !validNumbers(data.percentiles, 51) ||
        !validNumbers(data.noise, 51) || !validNumbers(data.times, 11) ||
        !validNumbers(data.returnRange, 2) || data.returnRange[0] >= data.returnRange[1] ||
        !data.kde || !validNumbers(data.kde.grid, 801) || !validNumbers(data.kde.truth, 801) ||
        !(data.kde.scale > 0) || !(data.noiseHalfRange > 0) ||
        !validNumbers(data.returnTicks, 5) || !Array.isArray(data.methods) || data.methods.length !== 4) {
      throw new Error('Incomplete return-flow data.');
    }
    data.methods.forEach(function (method) {
      if (typeof method.name !== 'string' || !/^#[0-9a-f]{6}$/i.test(method.color) ||
          !/^#[0-9a-f]{6}$/i.test(method.lightColor) || !validNumbers(method.returns, 51) ||
          !validNumbers(method.density, 801) || !Array.isArray(method.paths) || method.paths.length !== 51 ||
          !method.paths.every(function (path) { return validNumbers(path, 11); })) {
        throw new Error('Incomplete method paths.');
      }
    });
  }

  function drawAxes(svg, data) {
    var grid = svgElement('g', { stroke: '#e4e9e5', 'stroke-width': 1, 'aria-hidden': 'true' });
    var axes = svgElement('g', { fill: 'none', stroke: '#48524b', 'stroke-width': 1, 'aria-hidden': 'true' });
    var labels = svgElement('g', { fill: '#48524b', 'font-size': 15.5, 'aria-hidden': 'true' });
    [0, 0.25, 0.5, 0.75, 1].forEach(function (t) {
      var x = START + SPAN * t;
      grid.appendChild(svgElement('path', { d: 'M' + x + ' ' + TOP + 'V' + BOTTOM }));
      axes.appendChild(svgElement('path', { d: 'M' + x + ' ' + BOTTOM + 'v5' }));
      labels.appendChild(svgElement('text', { x: x, y: 264, 'text-anchor': 'middle' }, String(t)));
    });
    [-2, 0, 2].forEach(function (noise) {
      var y = yPosition(noise / data.noiseHalfRange);
      axes.appendChild(svgElement('path', { d: 'M' + LEFT + ' ' + y + 'h-5' }));
      labels.appendChild(svgElement('text', { x: LEFT - 8, y: y + 5, 'text-anchor': 'end' }, String(noise).replace('-', '\u2212')));
    });
    var center = (data.returnRange[0] + data.returnRange[1]) / 2;
    var half = (data.returnRange[1] - data.returnRange[0]) / 2;
    data.returnTicks.forEach(function (value) {
      var y = yPosition((value - center) / half);
      axes.appendChild(svgElement('path', { d: 'M' + RIGHT + ' ' + y + 'h5' }));
      labels.appendChild(svgElement('text', { x: RIGHT + 7, y: y + 5, 'text-anchor': 'start', 'font-size': 14 }, String(value).replace('-', '\u2212')));
    });
    axes.appendChild(svgElement('rect', { x: LEFT, y: TOP, width: RIGHT - LEFT, height: BOTTOM - TOP }));
    labels.appendChild(svgElement('text', { x: LEFT, y: 15, 'text-anchor': 'start', 'font-size': 14 }, 'Noise'));
    labels.appendChild(svgElement('text', { x: RIGHT, y: 15, 'text-anchor': 'end', 'font-size': 14 }, 'Return'));
    labels.appendChild(svgElement('text', { x: (START + END) / 2, y: 287, 'text-anchor': 'middle' }, 'Noise level \u03c4'));
    svg.appendChild(grid);
    return { axes: axes, labels: labels };
  }

  function buildPanel(data, method, index) {
    var panel = element('figure', 'return-paths-panel');
    var svg = svgElement('svg', { 'class': 'return-paths-chart', viewBox: '0 0 ' + WIDTH + ' ' + HEIGHT, role: 'img' });
    var clipId = 'return-path-clip-' + index;
    var revealId = 'return-path-reveal-' + index;
    var defs = svgElement('defs');
    var clip = svgElement('clipPath', { id: clipId });
    clip.appendChild(svgElement('rect', { x: LEFT, y: TOP, width: RIGHT - LEFT, height: BOTTOM - TOP }));
    defs.appendChild(clip);
    var reveal = svgElement('clipPath', { id: revealId });
    var revealRect = svgElement('rect', { x: START, y: TOP, width: 0, height: BOTTOM - TOP });
    reveal.appendChild(revealRect);
    defs.appendChild(reveal);
    svg.appendChild(defs);
    var frame = drawAxes(svg, data);
    var contents = svgElement('g', { 'clip-path': 'url(#' + clipId + ')', 'aria-hidden': 'true' });
    contents.appendChild(svgElement('path', { d: noisePath(data.noiseHalfRange), fill: method.lightColor,
      'fill-opacity': 0.75, stroke: method.color, 'stroke-width': 1 }));
    var prediction = svgElement('path', { d: violinPath(data.kde.grid, method.density, data), fill: method.lightColor,
      'fill-opacity': 0.75, stroke: method.color, 'stroke-width': 1, visibility: 'hidden' });
    contents.appendChild(prediction);
    contents.appendChild(svgElement('path', { d: violinPath(data.kde.grid, data.kde.truth, data), fill: '#7f7f7f',
      'fill-opacity': 0.45, stroke: '#7f7f7f', 'stroke-width': 1 }));
    var paths = svgElement('g', { 'clip-path': 'url(#' + revealId + ')' });
    method.paths.forEach(function (values) {
      paths.appendChild(svgElement('path', { d: trajectoryPath(values, data.times), fill: 'none', stroke: method.color,
        'stroke-width': 1.2, 'stroke-opacity': 0.7 }));
    });
    contents.appendChild(paths);
    var cursor = svgElement('path', { fill: 'none', stroke: '#48524b', 'stroke-width': 1,
      'stroke-dasharray': '3 4', 'stroke-opacity': 0.6 });
    contents.appendChild(cursor);
    svg.appendChild(contents);
    svg.appendChild(frame.axes);
    svg.appendChild(frame.labels);
    panel.appendChild(svg);
    return { panel: panel, svg: svg, revealRect: revealRect, prediction: prediction, cursor: cursor };
  }

  function init() {
    var root = document.getElementById('return-paths');
    if (!root) { return; }
    var slider = document.getElementById('return-path-tau');
    var time = document.getElementById('return-path-time');
    var playButton = document.getElementById('return-path-play');
    var resetButton = document.getElementById('return-path-reset');
    var grid = root.querySelector('.return-paths-grid');
    var controls = root.querySelector('.return-paths-controls');
    var fallback = root.querySelector('.return-paths-fallback');
    var status = root.querySelector('.return-paths-status');
    var legend = root.querySelector('.return-paths-legend');
    if (!slider || !time || !playButton || !resetButton || !grid || !controls || !fallback) { return; }
    if (!window.fetch) { return; }
    window.fetch(root.getAttribute('data-src')).then(function (response) {
      if (!response.ok) { throw new Error('Could not load recorded paths.'); }
      return response.json();
    }).then(function (data) {
      validate(data);
      var panels = data.methods.map(function (method, i) {
        var panel = buildPanel(data, method, i);
        grid.appendChild(panel.panel);
        return panel;
      });
      var playing = false;
      var frameId = null;
      var startedAt = null;
      var startTau = 0;
      var autoplayObserver = null;
      var autoplayPending = false;
      var inView = false;
      function render() {
        var tau = clampTau(slider.value);
        var complete = tau === 1;
        slider.value = String(tau);
        time.textContent = '\u03c4 = ' + tau.toFixed(2);
        slider.setAttribute('aria-valuetext', 'Noise level ' + tau.toFixed(2));
        panels.forEach(function (panel, i) {
          var method = data.methods[i];
          // Clip only the path layer; the original polyline data stays unchanged.
          panel.revealRect.setAttribute('width', SPAN * tau);
          panel.prediction.setAttribute('visibility', complete ? 'visible' : 'hidden');
          panel.cursor.setAttribute('d', 'M' + (START + SPAN * tau) + ' ' + TOP + 'V' + BOTTOM);
          panel.cursor.setAttribute('visibility', complete ? 'hidden' : 'visible');
          panel.svg.setAttribute('aria-label', method.name + ': 51 recorded flow paths revealed up to noise level ' + tau.toFixed(2) +
            '. ' + (complete ? 'The colored predicted return distribution is visible.' : 'The predicted return distribution appears at noise level 1.') +
            ' Gray shows the ground-truth return distribution.');
        });
      }
      function cancelAutoplay() {
        autoplayPending = false;
        if (autoplayObserver) {
          autoplayObserver.disconnect();
          autoplayObserver = null;
        }
      }
      function pause() {
        playing = false;
        if (frameId !== null) { window.cancelAnimationFrame(frameId); }
        frameId = null;
        playButton.textContent = 'Play';
        playButton.setAttribute('aria-label', 'Play return flow animation');
      }
      function animate(timestamp) {
        frameId = null;
        if (!playing) { return; }
        if (startedAt === null) { startedAt = timestamp; }
        var tau = Math.min(1, startTau + (timestamp - startedAt) / PLAY_DURATION);
        // Match the slider's hundredth steps, reaching 1 only at the end.
        var step = tau === 1 ? 1 : Math.floor(tau * 100) / 100;
        if (step !== clampTau(slider.value)) {
          slider.value = String(step);
          render();
        }
        if (tau === 1) { pause(); }
        else { frameId = window.requestAnimationFrame(animate); }
      }
      function play() {
        cancelAutoplay();
        if (playing) { return; }
        if (clampTau(slider.value) === 1) {
          slider.value = '0';
          render();
        }
        startTau = clampTau(slider.value);
        startedAt = null;
        playing = true;
        playButton.textContent = 'Pause';
        playButton.setAttribute('aria-label', 'Pause return flow animation');
        frameId = window.requestAnimationFrame(animate);
      }
      function scrub() {
        cancelAutoplay();
        pause();
        render();
      }
      slider.disabled = false;
      playButton.disabled = false;
      resetButton.disabled = false;
      slider.addEventListener('pointerdown', scrub);
      slider.addEventListener('input', scrub);
      slider.addEventListener('change', scrub);
      playButton.addEventListener('click', function () {
        if (playing) { pause(); }
        else { play(); }
      });
      resetButton.addEventListener('click', function () {
        cancelAutoplay();
        pause();
        slider.value = '0';
        render();
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { pause(); }
        else if (autoplayPending && inView) { play(); }
      });
      render();
      grid.hidden = false;
      controls.hidden = false;
      fallback.hidden = true;
      if (legend) { legend.hidden = false; }
      if (status) { status.hidden = true; }
      // Start once when the figure is in view; manual controls remain available
      // when the reader prefers reduced motion.
      var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion) {
        autoplayPending = true;
        if (window.IntersectionObserver) {
          autoplayObserver = new window.IntersectionObserver(function (entries) {
            var entry = entries[entries.length - 1];
            inView = !!entry && entry.isIntersecting && entry.intersectionRatio >= 0.25;
            if (autoplayPending && inView && !document.hidden) { play(); }
          }, { threshold: 0.25 });
          autoplayObserver.observe(root);
        } else {
          inView = true;
          if (!document.hidden) { play(); }
        }
      }
    }).catch(function () {
      grid.hidden = true;
      controls.hidden = true;
      fallback.hidden = false;
      if (legend) { legend.hidden = true; }
      if (status) { status.textContent = 'Interactive paths could not load. A static version is shown below.'; status.hidden = false; }
    });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
}());
