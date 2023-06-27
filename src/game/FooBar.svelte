<script>
	import { router } from 'tinro'
	import {
		Gamepad2,
		ArrowUpRightFromCircle,
		Settings,
		Shield,
		Skull,
		Wand,
		PowerOff
	} from 'lucide-svelte'
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
	const ups = [Shield, Skull, Wand]
	// export let actTab = 'all'
	const nav = [
		// {
		// 	name: 'Home',
		// 	path: '/'
		// },
		{
			name: 'Start',
			path: '/game',
			icon: Gamepad2
		},
		{
			name: 'Upgrade',
			path: '/game/1',
			icon: ArrowUpRightFromCircle,
			badge: true
		},
		{
			name: 'Settings',
			path: '/game/2',
			icon: Settings
		}
	]

	const count = () => {
		let a = Object.values(game.upgrades).filter((x) => x.cost <= game.total)
		// console.log('Count', a.length)
		return a.length
	}
	$: uc = count(game.total)
	let show = false
</script>

<footer class="mt-auto">
	<nav class="flex divide-x min-h-14 bg-white bg-opacity-70 border-b rounded-b-lg">
		{#each nav as { name, path, icon, badge }}
			<a
				href={path}
				class="basis-20 transition-all duration-200 relative flex flex-col items-center justify-center py-2 px-2 min-w-12 gap-1 border-t-4 {$router.path ===
				path
					? 'border-blue-600 bg-blue-400 text-white'
					: ' bg-white'}">
				<svelte:component this={icon} />
				<span class="sr-only">{name}</span>
				{#if badge}
					<span
						class="absolute z-25 -top-2 -right-1 flex items-center justify-center border border-pink-800 bg-pink-600 h-6 w-6 text-white text-xs font-light leading-none rounded-full"
						>{uc}</span>
				{/if}
			</a>
		{/each}

		<span class="flex-1" />

		{#each Object.entries(game.upgrades) as [k, v], i}
			<a
				href="/game/1"
				class="basis-20 transition-all duration-200 relative flex flex-col items-center justify-center py-2 px-2 min-w-12 gap-1 border-t-4 {v.cost <=
				game.total
					? 'border-blue-600 bg-blue-500 bg-opacity-90 text-white'
					: ' bg-white'}">
				<svelte:component this={ups[i]} />
				<span class="sr-only">{v.name}</span>

				<span
					class="absolute z-25 -top-2 -right-1 flex items-center justify-center border border-pink-800 bg-pink-600 h-6 w-6 text-white text-xs font-light leading-none rounded-full"
					>{v.total}</span>
			</a>
		{/each}
		<button
			on:click={() => (show = !show)}
			on:mouseleave={() => (show = false)}
			class="basis-20 transition-all  bg-white duration-200 relative flex flex-col items-center justify-center py-2 px-2 min-w-12 gap-1 border-t-4 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-600">
			<svelte:component this={PowerOff} />
			<span class="sr-only">Home</span>
			<span
				class="absolute z-20 -top-9 left-0 right-0 flex items-center justify-center border border-red-800 bg-red-500 h-8 text-white text-xs font-light leading-none rounded-t-lg"
				class:hidden={!show}><a href="/">Exit</a></span>
		</button>
	</nav>
</footer>
