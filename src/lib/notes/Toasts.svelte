<script>
  import Toast from "./Toast.svelte";
  import { dismissToast, toasts } from "./toast";
</script>

{#if $toasts.length}
  <section>
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        dismissible={toast.dismissible}
        on:dismiss={() => dismissToast(toast.id)}>{@html toast.message}</Toast
      >
    {/each}
  </section>
{/if}

<style>
  section {
    position: absolute;
    top: 2rem;
    right: 0;
    max-width: 560px;
    display: flex;
    margin-top: 1rem;
    justify-content: end;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.4rem;
    z-index: 1000;
  }
</style>
