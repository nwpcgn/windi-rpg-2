<script>
	import {fade} from 'svelte/transition'
	import { X } from 'lucide-svelte'
	import { router } from 'tinro'
	import { clickOutside } from '../lib/data'
	export let addcomma
	export let upgrade

	export let isActive = false
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
	<div in:fade out:fade
		class="w-full max-w-xl bg-white rounded-md mx-auto my-4"
		use:clickOutside
		on:click_outside={() => router.goto('/game')}>
		<header
			class="px-4 py-3 bg-blue-500 text-white rounded-t-md flex items-center">
			<span class="text-2xl capitalize"
				>{actTab}</span>
			<a href="/game" class="ml-auto"><X /></a>
		</header>
		<nav class="space-y-2 p-4 overflow-y-auto">
			{#each Object.entries(game.upgrades) as [k, v]}
				{#if actTab === k}
					<div class="flex flex-col gap-3">
						{#each Object.entries(v) as [a, b]}
							{#if a !== 'boost' && a !== 'autoInc' && a !== 'max' && a !== 'name'}
								<div class="flex items-center justify-between capitalize">
									<div class="font-thin text-lg">{a}</div>

									<div
										class="font-semibold text-xl"
										class:text-blue-600={a === 'effect'}
										class:text-red-600={a === 'cost'}>
										{a === 'effect' ? '+' : ''}
										{a === 'cost' ? '-' : ''}
										{addcomma(b)}
									</div>
								</div>
							{/if}
						{/each}

						<div class="flex items-center justify-between capitalize">
							<button class="btn btn-gray" on:click={() => upgrade(k)}
								>Upgrade</button>
						</div>
					</div>
				{/if}
			{/each}
		</nav>
		<footer class="rounded-b-md border-t">
			<nav class="px-4 gap-2 py-2 flex">
				{#each Object.entries(game.upgrades) as [k, v], i}
					<button
						class="btn shadow-xl w-full"
						on:click={() => (actTab = k)}
						class:opacity-50={k === actTab}>{v.name}</button>
				{/each}
			</nav>
		</footer>
	</div>
</article>
