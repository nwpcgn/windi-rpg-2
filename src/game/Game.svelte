<script>
	import { _game, sleep, clickOutside, elapsed } from '../lib/data'
	import { Toasts, addToast } from '../lib/notes'
	import UpgradeSingle from './UpgradeSingle.svelte'
	import FooBar from './FooBar.svelte'
	import TopBar from './TopBar.svelte'
	import Start from './Start.svelte'
	import { Route, router } from 'tinro'
	import Upgrade from './Upgrade.svelte'
	import Settings from './Settings.svelte'
	import Background from './Background.svelte'
	import { onDestroy, onMount } from 'svelte'
	const log = (message, type = 'info', timeout = 3000, dismisable = true) => {
		addToast({ message, type, dismisable, timeout })
	}
	const formatCurr = (number) =>
		new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR'
		}).format(number)

	const addcomma = (number) => new Intl.NumberFormat('de-DE').format(number)
	let isActive = false
	let intId1,
		intId2,
		intId3,
		intCount = 0,
		intTimer = 30
	let game = {
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
			autosave: true,
			auto_duration: 30000
		},
		runtime: 0
	}
	const resetStore = () => {
		const resetObj = {
			total: 0,
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
			runtime: 0
		}
		game = { ...game, ...resetObj }
		log(`Game Store resetted!`, `success`)
	}
	const saveStore = () => {
		// game.runtime += $elapsed
		$_game = { ...$_game, ...game }
		log(`Game Store saved!`, `success`)
	}
	const loadStore = () => {
		game = { ...game, ...$_game }
		log(`Game Store loaded!`, `success`)
	}

	function upgrade(slug) {
		if (slug === 'cats') {
			// console.log('UP Cats')
			if (
				game.total >= game.upgrades[slug].cost &&
				game.upgrades[slug].total < 50
			) {
				if (game.upgrades[slug].total <= 13) {
					game.autoInc += game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 1
				} else if (game.upgrades[slug].total == 14) {
					game.autoInc += game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 200
				} else if (game.upgrades[slug].total <= 23) {
					game.autoInc += 200 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 200
				} else if (game.upgrades[slug].total == 24) {
					game.autoInc += 200 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 5000
				} else if (game.upgrades[slug].total <= 48) {
					game.autoInc += 5000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 5000
				} else if (game.upgrades[slug].total == 49) {
					game.autoInc += 5000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 15000
				} else {
					game.autoInc += 15000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 15000
				}
				game.upgrades[slug].total += 1
				game.total -= game.upgrades[slug].cost
				game.upgrades[slug].cost = game.upgrades[slug].cost * 2
				game.upgrades[slug].effect =
					game.upgrades[slug].autoInc * game.upgrades[slug].boost

				//   document.getElementById("cat").innerHTML =
				//     game.upgrades[slug].total + "-clicker cat: " + addcomma(game.upgrades[slug].cost) + " | +" + addcomma(game.upgrades[slug].autoInc * game.upgrades[slug].boost) + "/sec";
			} else if (game.upgrades[slug].total == 50) {
				//   document.getElementById("cat").innerHTML =
				//     game.upgrades[slug].total + "-clicker cat: MAX | +15% click/sec";
			}

			log(
				`<span class="capitalize">Upgrade ${game.upgrades[slug].name} to ${game.upgrades[slug].total} !</span>`,
				`success`
			)
		}

		if (slug === 'worker') {
			// console.log('UP Worker')
			if (
				game.total >= game.upgrades[slug].cost &&
				game.upgrades[slug].total < 50
			) {
				if (game.upgrades[slug].total <= 13) {
					game.autoInc += game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 1
				} else if (game.upgrades[slug].total == 14) {
					game.autoInc += game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 200
				} else if (game.upgrades[slug].total <= 23) {
					game.autoInc += 200 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 200
				} else if (game.upgrades[slug].total == 24) {
					game.autoInc += 200 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 5000
				} else if (game.upgrades[slug].total <= 48) {
					game.autoInc += 5000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 5000
				} else if (game.upgrades[slug].total == 49) {
					game.autoInc += 5000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 15000
				} else {
					game.autoInc += 15000 * game.upgrades[slug].autoInc
					game.upgrades[slug].autoInc++
					game.upgrades[slug].boost = 15000
				}
				game.upgrades[slug].total += 1
				game.total -= game.upgrades[slug].cost
				game.upgrades[slug].cost = game.upgrades[slug].cost * 3
				game.upgrades[slug].effect =
					game.upgrades[slug].autoInc * game.upgrades[slug].boost
				log(
					`<span class="capitalize">Upgrade ${game.upgrades[slug].name} to ${game.upgrades[slug].total} !</span>`,
					`success`
				)

				//   document.getElementById("worker").innerHTML =
				//     game.upgrades[slug].total + "-worker: " + addcomma(game.upgrades[slug].cost) + " | +" + addcomma(game.upgrades[slug].autoInc * game.upgrades[slug].boost) + "/sec";
			} else if (game.upgrades[slug].total == 50) {
				//   document.getElementById("worker").innerHTML =
				//     game.upgrades[slug].total + "-worker: MAX | +35% click/sec";
			}
		}

		if (slug === 'clicker') {
			if (game.total >= game.upgrades[slug].cost) {
				// game.clickInc += game.upgrades[slug].cost / 15
				game.clickInc += Math.floor(game.clickInc * 1.1)
				// console.log("A", game.clickInc, Math.floor(game.clickInc * 0.2))
				game.total -= game.upgrades[slug].cost
				game.upgrades[slug].total += 1
				game.upgrades[slug].cost = game.upgrades[slug].cost * 3
				// game.upgrades[slug].clickInc = game.upgrades[slug].cost / 15
				// game.upgrades[slug].effect = game.upgrades[slug].cost / 15
				game.upgrades[slug].effect = Math.floor(game.clickInc * 1.1)

				if (game.upgrades.cats.total == 50) {
					game.autoInc -= game.upgrades.cats.max
					game.upgrades.cats.max = Math.floor(game.clickInc * 0.15)
					game.autoInc += game.upgrades.cats.max
				}
				if (game.upgrades.worker.total == 50) {
					game.autoInc -= game.upgrades.worker.max
					game.upgrades.worker.max = Math.floor(game.clickInc * 0.35)
					game.autoInc += game.upgrades.worker.max
				}

				log(
					`<span class="capitalize">Upgrade ${game.upgrades[slug].name} to ${game.upgrades[slug].total} !</span>`,
					`success`
				)
			}
		}
	}

	function autoUpgrade() {
		game.total += game.autoInc
	}

	function autoSave() {
		if (!game.meta.autosave) return

		saveStore()
	}
	function autoStep() {
		intCount += 1

		if (intTimer > 0) {
			intTimer -= 1
		} else {
			intTimer = 30
			autoSave()
		}
	}

	function tick() {
		intId1 = setInterval(autoUpgrade, 1000)
		intId3 = setInterval(autoStep, 1000)
	}

	function handleClick() {
		game.total += game.clickInc
	}
	function onKeyDown(e) {
		switch (e.keyCode) {
			case 32:
				isActive = true
				break
		}
	}

	function onKeyUp(e) {
		switch (e.keyCode) {
			case 32:
				isActive = false
				handleClick()
				break
		}
	}

	onMount(() => {
		loadStore()
		tick()
	})
	onDestroy(() => {
		
		saveStore()
		clearInterval(intId1)
		clearInterval(intId2)
		clearInterval(intId3)
	})
</script>



<div class="absolute inset-0 overflow-hidden z-10 flex flex-col main-bg">
	<TopBar bind:game bind:intTimer bind:intCount {addcomma} {formatCurr} />
	<div class="flex-1 relative shadow overflow-hidden">
		<Background set={1} />
		<Route path="/">
			<Start {handleClick} bind:isActive />
		</Route>
		<Route path="/1/*">
			<Route path="/">
				<Upgrade bind:game {addcomma} {upgrade} />
			</Route>
			<Route path="/:slug" let:params>
				<UpgradeSingle bind:game actTab={params.slug} {addcomma} {upgrade} />
			</Route>
		</Route>
		<Route path="/2">
			<Settings bind:game {saveStore} {loadStore} {resetStore} {log} />
		</Route>
	</div>
	<FooBar bind:game />
</div>

<svelte:window
	on:keydown|preventDefault={onKeyDown}
	on:keyup|preventDefault={onKeyUp} />
