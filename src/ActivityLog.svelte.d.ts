import type { Component } from 'svelte';
import type { ActivityLogOptions } from './index.js';

declare const ActivityLog: Component<ActivityLogOptions & { class?: string }>;
export default ActivityLog;
