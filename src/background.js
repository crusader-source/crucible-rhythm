
import OBR from '@owlbear-rodeo/sdk'

OBR.onReady(async () => {
  const myId = await OBR.player.getId()
  const role = await OBR.player.getRole()

  if (role !== 'PLAYER') return

  OBR.broadcast.onMessage(
    'com.crucible-rhythm.entanglement',
    async (event) => {
      const message = event.data

      if (message.targetPlayerId !== myId) return

      if (message.turnsRemaining === 0) {
        await OBR.notification.show(
          'THE CRUCIBLE: Your rhythm trial is ready!',
          'WARNING'
        )
      } else {
        await OBR.notification.show(
          `You have been entangled! ${message.turnsRemaining} turns remaining.`,
          'WARNING'
        )
      }
    }
  )
})
