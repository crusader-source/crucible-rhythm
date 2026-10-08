
import OBR from '@owlbear-rodeo/sdk'

const CHANNEL = 'com.crucible-rhythm.entanglement'
const MODAL_ID = 'com.crucible-rhythm/entangled'

let modalOpen = false

OBR.onReady(async () => {
  const myId = await OBR.player.getId()
  const role = await OBR.player.getRole()

  if (role !== 'PLAYER') return

  OBR.broadcast.onMessage(CHANNEL, async (event) => {
    const message = event.data

    if (message.targetPlayerId !== myId) return

    if (message.status === 'released') {
      if (modalOpen) {
        await OBR.modal.close(MODAL_ID)
        modalOpen = false
      }
      return
    }

    // The open modal receives countdown updates itself.
    if (modalOpen) return

    try {
      await OBR.modal.open({
        id: MODAL_ID,
        url: `https://crusader-source.github.io/crucible-rhythm/entangled.html?turns=${message.turnsRemaining}`,
        width: 450,
        height: 350,
        hidePaper: true,
        hideBackdrop: true
      })

      modalOpen = true
    } catch (error) {
      console.error('Could not open Crucible terminal:', error)
    }
  })
})
