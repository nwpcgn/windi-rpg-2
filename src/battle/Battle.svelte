<script>
	import { onMount } from 'svelte'
  import { addToast } from '../lib/notes'
	const addLog = (
		message,
		type = 'info',
		timeout = 3000,
		dismisable = true
	) => {
		addToast(message, type, dismisable, timeout)
	}
	console.log('Engine init!')
	function throwDice(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	}

	let playerPoints = 'player_points'
	let playerHealthBar = 'player_bar'

	let enemys = [
		{
			name: '👾 Goblin Warrior',
			health: 12,
			maxHealth: 12,
			pointsId: 'enemy_points',
			healthbarId: 'enemy_bar',
			hardAttackDamage: 4,
			hardAttackDice: 8,
			weakAttackDamage: 2,
			weakAttackDice: 3
		}
	]
	let player = {
		name: '🧝‍♂️ Elf Knight',
		health: 30,
		maxHealth: 30,
		pointsId: 'player_points',
		healthbarId: 'player_bar',
		hardAttackDamage: 4,
		hardAttackDice: 8,
		weakAttackDamage: 2,
		weakAttackDice: 3,
		attacks: [
			[
				'Shield Bash',
				2,
				3,
				'🛡️ You are trying to bash the opponent away with your shield ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'Mace Attack',
				6,
				6,
				'🔨 You are trying hit the enemy with a huge mace ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'Magic Attack',
				1,
				4,
				'🌀 You are trying to cast a spell on your opponent ...',
				'💫 The enemy dodges your attack ...'
			]
		],
		attackLabel: ['Name', 'Damage', 'Dicer', 'Info', 'Failed']
	}

	let turn = 1

	let playerHealth = 30
	let playerHealthMax = 30
	let playerPercent = '100%'
	let playerName = ''
	let enemyName = ''
	let enemyHealth = 30
	let enemyHealthMax = 30
	let enemyPercent = '100%'

	let roundCount = '⌛ Turn'
	let locked

	function opponent(
		name,
		health,
		maxHealth,
		pointsId,
		healthbarId,
		hardAttackDamage,
		hardAttackDice,
		weakAttackDamage,
		weakAttackDice
	) {
		this.name = name
		this.health = health
		this.maxHealth = maxHealth
		this.pointsId = pointsId
		this.healthbarId = healthbarId
		this.attack = async function () {
			let x = throwDice(1, 10)
			let attackMessage = name + ' attempt to attack...'
			logText(attackMessage, 'info')
			await sleep(1000)
			if (x >= hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				playerHealth = playerHealth - hardAttackDamage
				healthBarUpdateA(
					playerHealth,
					playerHealthMax,
					playerPoints,
					playerHealthBar
				)
				// logText('The enemy waves his spear at you');
				let damageText =
					'⚔️ You take ' + hardAttackDamage + ' points of critical damage'
				logText(damageText, 'error')
				damageTaken('damages', 'playerBox')
			} else if (x > weakAttackDice && x < hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				playerHealth = playerHealth - weakAttackDamage
				healthBarUpdateA(
					playerHealth,
					playerHealthMax,
					playerPoints,
					playerHealthBar
				)
				// logText('The enemy charges at you with a spear');
				let damageText = '⚔️ You take ' + weakAttackDamage + ' points of damage'
				logText(damageText, 'error')
				damageTaken('damages', 'playerBox')
			} else {
				logText('💫 The opponent stumbles over his own feet', 'success')
				damageTaken('attacke', 'enemyBox')
				damageTaken('playermiss', 'playerBox')
			}
		}
	}

	//Enemies
	let goblin = new opponent(
		'👾 Goblin Warrior',
		12,
		12,
		'enemy_points',
		'enemy_bar',
		4,
		8,
		2,
		3
	)

	let playerAttacks = player.attacks

	function logText(string, type = 'error', timeout = 3000) {
		addLog({ message: string, type, dismissible: true, timeout })
	}

	function turnCounterUpdate(turn) {
		roundCount = '⌛ Turn ' + turn
		logText(roundCount, 'info', 60000)
	}

	async function damageTaken(animationClass, targetId) {
		// console.log("Animate Damage Player", animationClass, targetId);
		await sleep(500)
		console.error('Animate class: ', animationClass, targetId)
	}

	function lockActionButtons(condition) {
		locked = condition
	}

	function healthBarUpdateA(
		objectHealth,
		objectHealthMax,
		pointsClass,
		healthBar
	) {
		let x = (objectHealth / objectHealthMax) * 100
		playerPercent = x.toFixed() + '%'
	}

	function healthBarUpdateB(
		objectHealth,
		objectHealthMax,
		pointsClass,
		healthBar
	) {
		let x = (objectHealth / objectHealthMax) * 100 // x = 10 * objectHealth;
		enemyPercent = x.toFixed() + '%'
		enemyHealth = objectHealth
	}

	function resetHealth() {
		turn = 0
		logText('-------------------')
		logText('RESET')
		logText('-------------------')
		goblin.health = goblin.maxHealth
		healthBarUpdateB(
			goblin.health,
			goblin.maxHealth,
			goblin.pointsId,
			goblin.healthbarId
		)
		playerHealth = playerHealthMax
		healthBarUpdateA(
			playerHealth,
			playerHealthMax,
			playerPoints,
			playerHealthBar
		)
	}

	function sleep(ms = 10) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	async function weaponAttack(
		attackDescription,
		successDice,
		damage,
		missDescription
	) {
		// console.log('weaponAttack(successDice, damage)', successDice, damage)

		lockActionButtons(true)
		turn = turn + 1
		let x = throwDice(1, 10)
		let _del = throwDice(100, 900)
		await sleep(1000 + _del)

		if (goblin.health > 0) {
			logText(attackDescription, 'info')
			await sleep(1000)
			damageTaken('swing', 'playerBox')
			if (x > successDice) {
				goblin.health = goblin.health - damage
				damageTaken('damages', 'enemyBox')
				healthBarUpdateB(
					goblin.health,
					goblin.maxHealth,
					goblin.pointsId,
					goblin.healthbarId
				)
				let damagedeal =
					'⚔️ You successfully deal ' +
					damage +
					' points of damage to the opponent'
				logText(damagedeal, 'success')
			} else {
				logText(missDescription, 'error')
				damageTaken('enemymiss', 'enemyBox')
			}
			await sleep(1000)
			if (goblin.health > 0) {
				goblin.attack()
			} else {
				logText('☠️ Creatura is dead', 'error', 60000)
			}
			await sleep(1000)
			turnCounterUpdate(turn)
			lockActionButtons(false)
		} else {
			logText('☠️ Creatura is dead', 'error', 60000)
			lockActionButtons(false)
		}

		await sleep(1000)
		lockActionButtons(false)
	}

	const attacFuncA = () =>
		weaponAttack(
			playerAttacks[0][3],
			playerAttacks[0][2],
			playerAttacks[0][1],
			playerAttacks[0][4]
		)

	const attacFuncB = () =>
		weaponAttack(
			playerAttacks[1][3],
			playerAttacks[1][2],
			playerAttacks[1][1],
			playerAttacks[1][4]
		)

	const attacFuncC = () =>
		weaponAttack(
			playerAttacks[2][3],
			playerAttacks[2][2],
			playerAttacks[2][1],
			playerAttacks[2][4]
		)

	const attackCtrs = [
		['🛡️ Shield Bash', attacFuncA],
		['🔨 Mace Attack', attacFuncB],
		['🌀 Magic Attack', attacFuncC]
	]
	const initPlayers = (id = 0) => {
		enemyHealth = goblin.health
		enemyHealthMax = goblin.maxHealth
		enemyPercent = '100%'
		enemyName = goblin.name
		playerHealth = player.health
		playerHealthMax = player.maxHealth
		playerName = player.name
		playerPercent = '100%'
		playerAttacks = player.attacks
	}
	onMount(() => {
		console.log('Engine mounted!')
		initPlayers()
		turnCounterUpdate(turn)
	})
</script>

<main class="main">
	<section class="absolute inset-0 z-10 overflow-hidden flex flex-col">
		<div class="w-full max-w-2xl mx-auto my-auto rounded shadow">
			<header class="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
				<div>
					<header class="d-flex align-items-center">
						<div class="flex-grow-1 ms-3 text-truncate">
							<span class="fs-2">{playerName}</span>
						</div>
					</header>
					<article>
						<span class="fs-6 text-muted">Player {playerHealth}</span>
					</article>
					<footer class="py-1">
						<div class="progress">
							<div
								class="progress-bar"
								role="progressbar"
								style="width: {playerPercent}"
								min="0"
								max="100">
								{playerPercent}
							</div>
						</div>
					</footer>
				</div>

				<div>
					<header class="d-flex align-items-center">
						<!-- 		<aside class="flex-shrink-0">
                              <div class="fs-1">🧝‍♂️</div>
                          </aside> -->
						<div class="flex-grow-1 ms-3 text-truncate">
							<span class="fs-2">{enemyName}</span>
						</div>
					</header>
					<article>
						<span class="fs-6 text-muted">Enemy ({enemyHealth})</span>
					</article>
					<footer class="py-1">
						<div class="progress">
							<div
								class="progress-bar"
								role="progressbar"
								style="width: {enemyPercent}"
								min="0"
								max="100">
								{enemyPercent}
							</div>
						</div>
					</footer>
				</div>
			</header>
			<footer class="py-4 text-center">
				<div class="btn-group btn-group-lg" role="group">
					{#each attackCtrs as [label, func]}
						<button
							on:click={func}
							type="button"
							class="btn btn-outline-secondary"
							disabled={locked}>{label}</button>
					{/each}
				</div>
			</footer>
		</div>
	</section>
</main>
