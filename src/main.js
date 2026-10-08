
import './style.css'
import OBR from '@owlbear-rodeo/sdk'

const playerList = document.querySelector('#app')

const entangledPlayers = new Map()

async function broadcastEntanglement(playerId, turns) {
  await OBR.broadcast.sendMessage(
    'com.crucible-rhythm.entanglement',
    {
      targetPlayerId: playerId,
      turnsRemaining: turns,
      status: turns === 0 ? 'ready' : 'entangled'
    },
    { destination: 'ALL' }
  )

  console.log('Entanglement broadcast sent:', playerId, turns)
}


function renderPlayers(players) {
  playerList.innerHTML = `
    <div class="crucible">
      <h1>The Crucible</h1>
      <p class="subtitle">Boss Encounter Controller</p>
      <div class="status">
        <span class="status-light"></span>
        Extension Online
      </div>
      <hr>
      <h2>Entanglement</h2>
      <div id="player-list"></div>
    </div>
  `

  const container = document.querySelector('#player-list')

  for (const player of players) {
    const turns = entangledPlayers.get(player.id)

    const card = document.createElement('div')
    card.className = 'player'
    card.style.marginBottom = '10px'

    const details = document.createElement('div')
    const name = document.createElement('strong')
    name.textContent = player.name

    const status = document.createElement('p')
    status.textContent = turns === undefined
      ? 'Ready'
      : turns === 0
        ? 'Rhythm trial ready'
        : `Entangled: ${turns} turns remaining`

    details.append(name, status)
    card.appendChild(details)

    const button = document.createElement('button')

    if (turns === undefined) {
      button.textContent = 'Entangle'
        button.onclick = async () => {
          entangledPlayers.set(player.id, 3)
          renderPlayers(players)

  await broadcastEntanglement(player.id, 3)
}

    } else if (turns > 0) {
      button.textContent = 'Advance Turn'
      
    button.onclick = async () => {
      const remaining = turns - 1

      entangledPlayers.set(player.id, remaining)
      renderPlayers(players)

      await broadcastEntanglement(player.id, remaining)
    }

    } else {
      button.textContent = 'Release'
      button.onclick = () => {
        entangledPlayers.delete(player.id)
        renderPlayers(players)
      }
    }

    card.appendChild(button)
    container.appendChild(card)
  }
}


OBR.onReady(async () => {
  const role = await OBR.player.getRole()

  if (role === 'GM') {
    const players = await OBR.party.getPlayers()
    renderPlayers(players)

    OBR.party.onChange(renderPlayers)
    return
  }

  // Player interface
  playerList.innerHTML = `
    <div class="crucible">
      <h1>The Crucible</h1>
      <p class="subtitle">Awaiting the Crucible...</p>
      <div id="player-status">
        <p>You are not entangled.</p>
      </div>
    </div>
  `

  const myId = await OBR.player.getId()

  OBR.broadcast.onMessage(
    'com.crucible-rhythm.entanglement',
    (event) => {
      const message = event.data

      // Ignore messages targeting other players
      if (message.targetPlayerId !== myId) {
        return
      }

      const status = document.querySelector('#player-status')

      if (message.turnsRemaining === 0) {
        status.textContent = 'The rhythm trial is ready!'
      } else {
        status.textContent =
          `You are entangled! ${message.turnsRemaining} turns remaining.`
      }
    }
  )
})
