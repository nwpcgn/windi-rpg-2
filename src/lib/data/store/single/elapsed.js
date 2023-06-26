import { derived } from "svelte/store";
import time from "./time";

const start = Date.now();
export const elapsed = derived(time, ($time) =>
  Math.round(($time - start) / 1000)
);

export default elapsed