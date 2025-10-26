<script>
  import { onMount, onDestroy } from 'svelte';
  import { caps } from '../stores/capabilities';
  import { pulseColor, state as effectState } from '$lib/stores/effects';

  const WIDTH = 340;
  const HEIGHT = 340;
  const tooltipId = 'node-tooltip';

  let color = '#6c2bd9';
  let speed = 1;
  const unsubscribeColor = pulseColor.subscribe((value) => {
    color = value;
  });
  const unsubscribeState = effectState.subscribe((value) => {
    speed = value.speed;
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const baseNodes = Array.from({ length: 9 }, (_, i) => ({
    id: 'N' + (i + 1),
    x: i % 3,
    y: Math.floor(i / 3),
    active: false,
    role: ['Leader', 'Peer', 'Relay'][i % 3]
  }));

  let nodes = baseNodes;
  let t = 0;
  let raf = 0;
  let reduceQuery;
  let tooltip;
  let reduceHandler;
  let linkedCount = 0;
  let liveStatus = '';

  const cx = (n) => 32 + n.x * 110;
  const cy = (n) => 32 + n.y * 110;

  const createTooltip = (node) => {
    const left = clamp((cx(node) / WIDTH) * 100, 8, 92);
    const baseTop = (cy(node) / HEIGHT) * 100;
    const placement = baseTop < 24 ? 'below' : 'above';
    const top = clamp(baseTop, 8, 92);

    return {
      id: node.id,
      status: node.active ? 'Linked' : 'Idle',
      left,
      top,
      placement
    };
  };

  const findNode = (id) => nodes.find((node) => node.id === id);

  const showTooltipById = (id) => {
    const node = findNode(id);
    tooltip = node ? createTooltip(node) : undefined;
  };

  const hideTooltip = (id) => {
    if (!tooltip) return;
    if (!id || tooltip.id === id) {
      tooltip = undefined;
    }
  };

  const toggle = (id) => {
    nodes = nodes.map((node) =>
      node.id === id ? { ...node, active: !node.active } : node
    );
    if (tooltip?.id === id) {
      showTooltipById(id);
    }
  };

  const handleKey = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(id);
    } else if (event.key === 'Escape') {
      hideTooltip(id);
    }
  };

  const shouldAnimate = () => !(reduceQuery?.matches);

  const stopLoop = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    t = 0;
  };

  const loop = (time) => {
    if (!shouldAnimate()) {
      stopLoop();
      return;
    }
    t = time * 0.002 * speed;
    raf = requestAnimationFrame(loop);
  };

  const startLoop = () => {
    if (raf || !shouldAnimate()) {
      if (!shouldAnimate()) {
        t = 0;
      }
      return;
    }
    raf = requestAnimationFrame(loop);
  };

  $: syncAvailable = $caps?.features.sync;

  $: linkedCount = nodes.reduce((count, node) => count + (node.active ? 1 : 0), 0);
  $: liveStatus = linkedCount === 0
    ? 'All nodes are idle.'
    : linkedCount === nodes.length
      ? 'All nodes are linked.'
      : `${linkedCount} of ${nodes.length} nodes linked.`;

  onMount(() => {
    if (typeof matchMedia === 'function') {
      reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
      reduceHandler = (event) => {
        if (event.matches) {
          stopLoop();
        } else {
          startLoop();
        }
      };
      reduceQuery.addEventListener('change', reduceHandler);
    }

    startLoop();

    return () => {
      stopLoop();
      if (reduceHandler) {
        reduceQuery?.removeEventListener('change', reduceHandler);
      }
    };
  });

  onDestroy(() => {
    unsubscribeColor();
    unsubscribeState();
  });
</script>

<section class="section container card" id="mesh" aria-labelledby="mesh-h">
  <h2 id="mesh-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">Node visualization</h2>
  <div class="node-area">
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      role="img"
      aria-label={syncAvailable === false ? 'Nine nodes in a grid' : 'Nine synchronized nodes in a grid'}
    >
      {#each nodes as a}
        {#each nodes as b}
          {#if Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1}
            <line x1={cx(a)} y1={cy(a)} x2={cx(b)} y2={cy(b)} stroke="rgba(255,255,255,.15)" stroke-width="2" />
          {/if}
        {/each}
      {/each}

      {#each nodes as n}
        {#key n.id}
          <g
            role="switch"
            aria-checked={n.active}
            aria-label={`${n.id} ${n.active ? 'linked' : 'idle'}`}
            aria-describedby={tooltip?.id === n.id ? tooltipId : undefined}
            tabindex="0"
            on:click={() => toggle(n.id)}
            on:keydown={(event) => handleKey(event, n.id)}
            on:focus={() => showTooltipById(n.id)}
            on:blur={() => hideTooltip(n.id)}
            on:pointerenter={() => showTooltipById(n.id)}
            on:pointerleave={() => hideTooltip(n.id)}
          >
            <circle
              cx={cx(n)}
              cy={cy(n)}
              r={18 + 2 * Math.sin(t)}
              fill="none"
              stroke={n.active ? color : 'rgba(231,59,163,.45)'}
              stroke-width="2"
            />
            <circle cx={cx(n)} cy={cy(n)} r="12" fill={n.active ? 'url(#grad)' : 'rgba(255,255,255,.85)'} />
            <title>{n.id} • {n.active ? 'Linked' : 'Idle'}</title>
          </g>
        {/key}
      {/each}

      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="60%" stop-color="#e73ba3" />
          <stop offset="100%" stop-color="#6c2bd9" />
        </radialGradient>
      </defs>
    </svg>
    {#if tooltip}
      <div
        id={tooltipId}
        class="node-tooltip"
        class:below={tooltip.placement === 'below'}
        role="tooltip"
        style={`left:${tooltip.left}%;top:${tooltip.top}%`}
      >
        <span class="node-id">{tooltip.id}</span>
        <span class="node-state">{tooltip.status}</span>
      </div>
    {/if}
    <span class="sr-only" aria-live="polite" aria-atomic="true" role="status">{liveStatus}</span>
  </div>
  {#if syncAvailable === false}
    <p class="lead" style="margin:.5rem 0 0; color:var(--muted)">
      Tap a node to link or unlink it. Sync is off in this firmware build, so each node runs on its own clock.
    </p>
  {:else}
    <p class="lead" style="margin:.5rem 0 0; color:var(--muted)">
      Tap a node to link or unlink it. Hover or focus to see its status. All nodes share one timing pulse, so effects stay in step.
    </p>
  {/if}
</section>
