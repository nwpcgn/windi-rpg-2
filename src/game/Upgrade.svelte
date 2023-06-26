<script>
	import { fade } from 'svelte/transition'
	import { X } from 'lucide-svelte'
	import { router } from 'tinro'
	import { clickOutside } from '../lib/data'
	export let addcomma
	export let upgrade
	export let game = {
		total: 900,
		clickInc: 1,
		autoInc: 0,
		upgrades: {
			clicker: {
				name: 'Clicker',
				total: 0,
				cost: 15,
				effect: 1,
				max: 0
			},
			cats: {
				name: 'Cats',
				total: 0,
				cost: 25,
				autoInc: 1,
				boost: 1,
				effect: 1,
				max: 0
			},
			worker: {
				name: 'Worker',
				total: 0,
				cost: 250,
				autoInc: 15,
				boost: 1,
				effect: 15,
				max: 0
			}
		},
		meta: {
			town: 'Gotham City',
			mayor: 'Bruce Wayne',
			autosave: false,
			auto_duration: 30000
		}
	}
	export let actTab = 'clicker'
</script>

<article
	class="fixed z-40 inset-0 flex flex-col px-4 py-2 overflow-hidden overflow-y-auto bg-black bg-opacity-50">
	<div
		in:fade
		out:fade
		class="w-full max-w-xl bg-white rounded-md mx-auto my-4"
		use:clickOutside
		on:click_outside={() => router.goto('/game')}>
		<header
			class="px-4 py-3 bg-blue-500 text-white rounded-t-md flex items-center">
			<span class="text-2xl capitalize">Upgrades</span>
			<a href="/game" class="ml-auto"><X /></a>
		</header>
		<nav class="overflow-y-auto">
			<div class="flex flex-col divide-y py-2">
				{#each Object.entries(game.upgrades) as [a, b]}
					<div class="flex items-end justify-between px-4 py-2">
						<div class="flex flex-col">
							<span class="text-xl font-semibold capitalize">{a} <small class="text-gray-400">({b.total})</small></span>
							<span class="text-sm font-light text-red-500">- {addcomma(b.cost)} €</span>
							<span class="text-sm font-light text-blue-500"
								>+ {addcomma(b.effect)} /{a === 'clicker' ? 'click' : 'sec'}</span>
						</div>

						<button
							class="btn btn-blue"
							disabled={b.cost > game.total}
							on:click={() => upgrade(a)}>Upgrade</button>
					</div>
				{/each}
			</div>
		</nav>
	</div>
</article>
