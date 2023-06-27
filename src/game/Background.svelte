<script>
	import { onDestroy } from 'svelte'

	export let bgs = [
		// 'a01.png',
		// 'a02.png',
		// 'a03.png',
		// 'a04.png',
		// 'a05.png',
		// 'a06.png',
		// 'a07.png',
		[
			'b01.png',
			'b02.png',
			'b03.png',
			'b04.png',
			'b05.png',
			'b06.png',
			'b07.png'
		],
		[
			'e01.png',
			'e02.png',
			'e03.png',
			'e04.png',
			'e05.png',
			'e06.png',
			'e07.png'
		],
		[
			'k01.png',
			'k02.png',
			'k03.png',
			'k04.png',
			'k05.png',
			'k06.png',
			'k07.png'
		],
		[
			'n01.png',
			'n02.png',
			'n03.png',
			'n04.png',
			'n05.png',
			'n06.png',
			'n07.png',
			'n08.png',
			'n09.png'
		]
	]
	export let set = 0
	let max = bgs.length
	let active = 0
	let intId1

	function change() {
		if (active < max - 1) {
			active += 1
		} else {
			active = 0
		}
	}

	intId1 = setInterval(change, 10000)
	onDestroy(() => {
		clearInterval(intId1)
	})
</script>

{#each bgs[set] as item, i}
	<div
		class="absolute inset-0 bg-no-repeat bg-bottom bg-cover transform transition-all rounded-lg duration-500 ease {i == active ? 'opacity-100 z-5' : 'opacity-0 z-1'}"
		style="background-image: url(./img/sf/{item});" />
{/each}
<span class="absolute right-4 top-4 opacity-25">{active}</span>

<style>
</style>
