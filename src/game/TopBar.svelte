<script>
	export let formatCurr
	export let addcomma
	export let intTimer = 30
	export let intCount = 0
	export let game
</script>

<header
	class="flex items-end flex-col md:flex-row gap-1 p-2 bg-blue-500 shadow-lg">
	<span class="label label-1">{formatCurr(game.total)}</span>

	<div class="flex items-center gap-2 ml-auto">
		{#if game.meta.autosave}
			<span class="label text-xs leading-none px-1 py-0"
				>Save in {intTimer < 10 ? '0' : ''}{intTimer} s</span>
		{/if}
		<span class="label label-2">{addcomma(game.clickInc)}/click</span>
		<span class="label label-2">{addcomma(game.autoInc)}/sec</span>
	</div>
</header>

<style>
	.label {
		@apply px-2 py-1 rounded-md leading-tight bg-white border-2 border-blue-600;
	}
	.label-1 {
		@apply text-xl font-medium;
	}
	.label-2 {
		@apply text-sm;
	}
</style>
