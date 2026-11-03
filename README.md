# @watchtowerobservability/activity-svelte

Typed Svelte bindings for the Watchtower hosted activity log: a thin layer (under 2 KB gzipped, checked by `npm run size`) over the `<wt-activity>` web component of `@watchtowerobservability/activity-web`, which does the rendering, theming, export and verification.

```sh
npm i @watchtowerobservability/activity-svelte @watchtowerobservability/activity-web
```

Svelte 5 component:

```svelte
<script lang="ts">
  import ActivityLog from '@watchtowerobservability/activity-svelte/ActivityLog.svelte';
  let { token } = $props();
</script>

<ActivityLog session={token} baseUrl="https://YOUR_WATCHTOWER_HOST" theme="system" live verify onOpen={(e) => console.log(e.action)} />
```

Action (Svelte 4 and 5):

```svelte
<script lang="ts">
  import { wtActivity } from '@watchtowerobservability/activity-svelte';
  export let token: string;
</script>

<div use:wtActivity={{ session: token, live: true, onError: (d) => d.status === 401 && refresh() }} />
```

Your backend mints `token` with a server SDK (`createViewerSession`). It is sent only as `Authorization: Bearer`, never in a URL. Never put a secret key in the browser.

Options: `session` (required; a new value reloads the feed), `baseUrl`, `theme` (`light`, `dark`, `system`), `accent`, `density` (`compact`, `comfortable`), `locale`, `live`, `verify`, `pageSize`, `extrasUrl`, `sealKey`, and the callbacks `onOpen(event)`, `onLoad({count, hasMore})`, `onError({message, status?})` (from the element's `wt-activity-open`, `wt-activity-load` and `wt-activity-error` DOM events). The action's return value carries `element` with `reload()`.

License: Apache-2.0
