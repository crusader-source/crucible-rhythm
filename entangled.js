
import OBR from '@owlbear-rodeo/sdk'

const CHANNEL = 'com.crucible-rhythm.entanglement'

function updateTerminal(turns) {
  const display = document.querySelector('#turns')
  const label = document.querySelector('#countdown-label')
  const status = document.querySelector('#system-status')

  display.textContent = String(turns).padStart(2, '0')

  if (turns === 0) {
    document.querySelector('h1').textContent =
      '[ TRIAL INITIALIZED ]'

    label.textContent = 'AWAITING RHYTHM PROTOCOL'
    status.textContent = 'SYS.STATUS: CRITICAL'
  }
}

OBR.onReady(async () => {
  const myId = await OBR.player.getId()

  // Read initial countdown from the modal URL
  const params = new URLSearchParams(window.location.search)
  const initialTurns = Number(params.get('turns') ?? 3)

  updateTerminal(initialTurns)

  OBR.broadcast.onMessage(CHANNEL, (event) => {
    const message = event.data

    if (message.targetPlayerId !== myId) return

    if (message.status === 'released') {
      OBR.modal.close('com.crucible-rhythm/entangled')
      return
    }

    updateTerminal(message.turnsRemaining)
  })
})
