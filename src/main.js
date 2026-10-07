import './style.css'
import OBR from '@owlbear-rodeo/sdk'

document.querySelector('#app').innerHTML = `
  <div class="crucible">
    <h1>The Crucible</h1>
    <p class="subtitle">Boss Encounter Controller</p>

    <div class="status">
      <span class="status-light"></span>
      Extension Online
    </div>

    <hr>

    <h2>Entanglement</h2>

    <div class="player">
      <div>
        <strong>Test Player</strong>
        <p>Ready</p>
      </div>

      <button id="entangle">
        Entangle
      </button>
    </div>
  </div>
`

OBR.onReady(() => {
  console.log("Crucible connected to Owlbear Rodeo")
})