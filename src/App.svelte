<script>
	import Canvas2 from './Canvas2.svelte'
	import Canvas1 from './Canvas1.svelte'
	import Battle from './battle/Battle.svelte'
	import Game from './game/Game.svelte'
	import { Toasts, addToast } from './lib/notes'
	import { Route, router } from 'tinro'
	router.mode.hash()
</script>

<Toasts />

<main class="main">
	<Route path="/game/*">
		<section
		class="flex-1 w-full max-w-5xl mx-auto my-4 relative overflow-hidden">
		<Game />
		</section>
	</Route>
	<Route path="/battle">
		<Canvas2 />
	</Route>
	<Route path="/test">
		<Canvas1 />
	</Route>
	<Route fallback>
		<section class="absolute inset-0 z-10 overflow-hidden flex flex-col">
			<div
				class="w-full max-w-xs mx-auto my-auto grid gap-2 p-4 shadow-md rounded-md">
				<a href="/battle" class="link tracking-widest">Battle</a>
				<a href="/game" class="link tracking-widest">Game</a>
				<a href="/test" class="link tracking-widest">Test</a>
			</div>
		</section>
	</Route>
</main>

<style>
	.link {
		@apply px-4 py-2 text-center text-xl font-medium shadow border rounded;
	}
	.link.active,
	.link:hover {
		@apply shadow-blue-600 border-blue-600 bg-blue-500 text-blue-50;
	}
</style>
