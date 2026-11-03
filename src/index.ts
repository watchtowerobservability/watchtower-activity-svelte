// Svelte wrapper of <wt-activity>: an action (any Svelte version) and the ActivityLog component (Svelte 5).
import '@watchtowerobservability/activity-web';
import {
  applyProps, EVENTS, type ActivityErrorDetail, type ActivityEvent, type ActivityLoadDetail, type ActivityLogProps, type WtActivityElement,
} from './props';

export * from './props';

/** Props plus event callbacks. */
export interface ActivityLogOptions extends ActivityLogProps {
  onOpen?: (event: ActivityEvent) => void;
  onLoad?: (detail: ActivityLoadDetail) => void;
  onError?: (detail: ActivityErrorDetail) => void;
}

/**
 * `<div use:wtActivity={{ session: token, live: true, onOpen }} />`: renders <wt-activity> inside the node and keeps it in
 * step with the options. The returned `element` gives `reload()`.
 */
export function wtActivity(node: HTMLElement, options: ActivityLogOptions) {
  const el = document.createElement('wt-activity') as WtActivityElement;
  let opts = options;
  const listeners: [string, (e: Event) => void][] = [
    [EVENTS.open, (e) => opts.onOpen?.((e as CustomEvent<{ event: ActivityEvent }>).detail.event)],
    [EVENTS.load, (e) => opts.onLoad?.((e as CustomEvent<ActivityLoadDetail>).detail)],
    [EVENTS.error, (e) => opts.onError?.((e as CustomEvent<ActivityErrorDetail>).detail)],
  ];
  for (const [n, f] of listeners) el.addEventListener(n, f);
  applyProps(el, opts); // before connecting, so the first fetch already has the session
  node.append(el);
  return {
    element: el,
    update(next: ActivityLogOptions) { opts = next; applyProps(el, next); },
    destroy() { for (const [n, f] of listeners) el.removeEventListener(n, f); el.remove(); },
  };
}
