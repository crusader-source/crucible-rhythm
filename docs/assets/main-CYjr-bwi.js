import{t as e}from"./lib-BmqQS_1A.js";var t=document.querySelector(`#app`),n=new Map;async function r(t,n){await e.broadcast.sendMessage(`com.crucible-rhythm.entanglement`,{targetPlayerId:t,turnsRemaining:n,status:n===0?`ready`:`entangled`},{destination:`ALL`}),console.log(`Entanglement broadcast sent:`,t,n)}function i(e){t.innerHTML=`
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
  `;let a=document.querySelector(`#player-list`);for(let t of e){let o=n.get(t.id),s=document.createElement(`div`);s.className=`player`,s.style.marginBottom=`10px`;let c=document.createElement(`div`),l=document.createElement(`strong`);l.textContent=t.name;let u=document.createElement(`p`);u.textContent=o===void 0?`Ready`:o===0?`Rhythm trial ready`:`Entangled: ${o} turns remaining`,c.append(l,u),s.appendChild(c);let d=document.createElement(`button`);o===void 0?(d.textContent=`Entangle`,d.onclick=async()=>{n.set(t.id,3),i(e),await r(t.id,3)}):o>0?(d.textContent=`Advance Turn`,d.onclick=async()=>{let a=o-1;n.set(t.id,a),i(e),await r(t.id,a)}):(d.textContent=`Release`,d.onclick=()=>{n.delete(t.id),i(e)}),s.appendChild(d),a.appendChild(s)}}e.onReady(async()=>{if(await e.player.getRole()===`GM`){i(await e.party.getPlayers()),e.party.onChange(i);return}t.innerHTML=`
    <div class="crucible">
      <h1>The Crucible</h1>
      <p class="subtitle">Awaiting the Crucible...</p>
      <div id="player-status">
        <p>You are not entangled.</p>
      </div>
    </div>
  `;let n=await e.player.getId();e.broadcast.onMessage(`com.crucible-rhythm.entanglement`,e=>{let t=e.data;if(t.targetPlayerId!==n)return;let r=document.querySelector(`#player-status`);r.textContent=t.turnsRemaining===0?`Trial Begins`:`You are entangled! ${t.turnsRemaining} turns remaining.`})});