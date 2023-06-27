<script>
	export let formatCurr
	export let addcomma
	export let intTimer = 30
	export let intCount = 0
	export let game
</script>

<header
	class="flex items-end flex-col md:flex-row gap-1 py-2 px-3 shadow-lg">
	<span class="label label-1">{addcomma(game.total)} €</span>

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
		@apply px-2 py-1 rounded-lg transform -skew-x-18 leading-tight border-3 border-r-20 text-blue-500 bg-blue-50 border-blue-500;
	}
	.label-1 {
		@apply text-xl font-medium -skew-x-20;
	}
	.label-2 {
		@apply text-sm;
	}
</style>
