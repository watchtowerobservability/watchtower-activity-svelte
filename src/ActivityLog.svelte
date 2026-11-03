<script lang="ts">
  // <ActivityLog session={token} live onOpen={(e) => ...} />: the <wt-activity> element with typed props (Svelte 5).
  import { wtActivity, type ActivityLogOptions } from './index.js';

  let { class: className = '', ...options }: ActivityLogOptions & { class?: string } = $props();
</script>

<div class={className} use:wtActivity={options}></div>
