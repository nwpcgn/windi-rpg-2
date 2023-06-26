<script>
	
	let canW = 400
	let canH = 400
	let cube = 50
	let top = 0
	let left = 0

	let ratio = 1 / 1
	let height = getHeight(400, ratio)
	let width = getWidth(height, ratio)
	let maxX = canW - cube
	let maxY = canH - cube

	$: shipStyle = 'rotate-0'

	// up = 38
	// down = 40
	// right = 39
	// left = 37

	function handleAction(id = 0) {
		alert('Action ' + id)
	}
	function onKeyDown(e) {
		switch (e.keyCode) {
			case 65:
				if (actStat1) {
					handleAction(1)
				} else if (actStat2) {
					handleAction(2)
				} else if (actStat3) {
					handleAction(3)
				} else if (actStat4) {
					handleAction(4)
				} else {
					console.log('NO ACTION')
				}
				break
			case 38:
				top -= 50
				shipStyle = 'rotate-180'
				if (top < 0) {
					top = 0
				}
				break
			case 40:
				top += 50
				shipStyle = 'rotate-0'
				if (top > maxX) {
					top = maxX
				}
				break
			case 37:
				left -= 50
				shipStyle = 'rotate-90'
				if (left < 0) {
					left = 0
				}
				break
			case 39:
			case ' ':
				left += 50
				shipStyle = '-rotate-90'
				if (left > maxY) {
					left = maxY
				}
				break
		}
	}

	function getHeight(length, ratio) {
		var height = length / Math.sqrt(Math.pow(ratio, 2) + 1)
		return Math.round(height)
	}
	function getWidth(length, ratio) {
		var width = length / Math.sqrt(1 / (Math.pow(ratio, 2) + 1))
		return Math.round(width)
	}

	console.log('height', height)
	console.log('width', width)

	let actStat1 = false
	let actStat2 = false
	let actStat3 = false
	let actStat4 = false

	$: if (left >= 150 && left < 350 && top >= 300 && top < 400) {
		actStat1 = true
	} else {
		actStat1 = false
	}

	$: if (left >= 50 && left < 100 && top >= 300 && top < 350) {
		actStat2 = true
	} else {
		actStat2 = false
	}
	$: if (left >= 300 && left < 350 && top >= 0 && top < 100) {
		actStat3 = true
	} else {
		actStat3 = false
	}
	$: if (left >= 100 && left < 200 && top >= 0 && top < 100) {
		actStat4 = true
	} else {
		actStat4 = false
	}
</script>

<header class="sticky inset-x-0 top-0 z-10 text-center">
	<span class="text-sm">X: {left}/{maxX} | Y: {top}/{maxY}</span>
</header>
<section class="absolute inset-0 z-10 overflow-auto flex flex-col">
	<article
		class="canvas"
		style="width: {canW}px; height: {canH}px;"
		bind:clientWidth={width}
		bind:clientHeight={height}>
		<div
			class="cube transform transition-all duration-200 {shipStyle} rounded-full ease-in-out {actStat4 || actStat1 || actStat3 || actStat2
				? 'bg-red-600 bg-opacity-90'
				: 'bg-white bg-opacity-40'}"
			style="left: {left}px; top: {top}px" />
	</article>
</section>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
	.canvas {
		background-image: url(./img/sf/n09.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		@apply border border-blue-500 relative my-auto mx-auto;
	}
	.cube {
		width: 50px;
		height: 50px;
		position: absolute;
		background-image: url(./img/sf/s1.png);
	}
</style>
