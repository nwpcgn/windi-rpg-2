<script>
	import { fade } from 'svelte/transition'
	import { X } from 'lucide-svelte'
	import { router } from 'tinro'
	import { clickOutside, elapsed } from '../lib/data'
	export let game = {
		meta: {
			town: 'Gotham City',
			mayor: 'Bruce Wayne',
			autosave: false,
			auto_duration: 30000
		}
	}
	export let saveStore, loadStore, resetStore, log

	function save() {
		saveStore()
		router.goto('/game')
	}
	function load() {
		loadStore()
		router.goto('/game')
	}
	function reset() {
		resetStore()
		router.goto('/game')
	}
</script>

<article
	class="fixed z-40 inset-0 flex flex-col px-4 py-2 overflow-hidden overflow-y-auto bg-black bg-opacity-50">
	<div
		in:fade
		out:fade
		class="w-full max-w-xl bg-white rounded-md mx-auto"
		use:clickOutside
		on:click_outside={() => router.goto('/game')}>
		<header
			class="px-4 py-3 bg-blue-500 text-white rounded-t-md flex items-center">
			<span class="text-2xl">Settings</span>
			<a href="/game" class="ml-auto"><X /></a>
		</header>
		<nav class="space-y-4 p-4 rounded-b-md overflow-x-hidden overflow-y-auto">
			<div>
				<div class="flex items-center justify-between">
					<span>Runtime Total</span>
					<span
						>{new Date(game.runtime * 1000).toISOString().slice(11, 19)}</span>
				</div>
				<div class="flex items-center justify-between">
					<span>Runtime Session</span>
					<span>{new Date($elapsed * 1000).toISOString().slice(11, 19)}</span>
				</div>
			</div>

			{#each Object.entries(game.meta) as [k, v]}
				<div class="flex flex-col gap-1">
					{#if typeof v == 'number'}
						<div class="capitalize">{k}</div>
						<input
							type="number"
							class="form-control"
							bind:value={game.meta[k]} />
					{:else if typeof v == 'boolean'}
						<label class="flex items-center gap-3 py-2">
							<input type="checkbox" bind:checked={game.meta[k]} />
							<span class="capitalize">{k}</span>
						</label>
					{:else}
						<div class="capitalize">{k}</div>
						<input type="text" class="form-control" bind:value={game.meta[k]} />
					{/if}
				</div>
			{/each}
			<div class="grid grid-cols-3 py-2 gap-2">
				<button on:click={save} class="btn btn-blue">Save</button>
				<button on:click={load} class="btn btn-gray">Load</button>
				<button on:click={reset} class="btn btn-gray">Reset</button>
			</div>
		</nav>
	</div>
</article>
