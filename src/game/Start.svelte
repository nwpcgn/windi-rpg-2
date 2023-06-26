<script>
	export let isActive = false
	export let handleClick
</script>

<article
	class="absolute z-20 inset-0 flex flex-col items-center justify-center p-4">
	<div>
		<button
			on:click={handleClick}
			class="px-8 py-4 rounded shadow transform ease transition-transform duration-100 text-8xl font-mono font-bold {isActive
				? ''
				: 'tracking-wide'}"
			class:scale-90={isActive}
			on:mousedown={() => (isActive = true)}
			on:mouseup={() => (isActive = false)}>
			<span
				class="px-4 transition-all duration-100 ease"
				class:opacity-75={isActive}>SpaceBar</span
			></button>
	</div>
</article>

<style>
	button {
		background: rgba(255, 255, 255, 0.7);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		border: 8px solid;
	}
</style>
