<script>
    import { aStats, aFields, aImg } from "../lib/stores";
    import Healthbar from "./Healthbar.svelte";
</script>

<div class="card">
    <h3>
        {$aFields.unit}
        {#if $aFields.naval}({$aFields.carrying}){/if}
    </h3>
    <Healthbar
        maxHealth={$aStats.maxHealth}
        health={$aStats.health}
        veteran={$aFields.veteran}
    />
    <span class="attacker-icon" style="background-image: url('{$aImg.icon}')" />
    <div class="display-stats">
        <p>
            🗡️ {$aStats.attack}{#if $aFields.boosted}(+0.5){/if}
        </p>
        <p>🛡️ {$aStats.defence}</p>
        <p>
            🐎 {$aStats.movement}{#if $aFields.boosted}(+1){/if}
        </p>
        <p>🏹 {$aStats.range}</p>
    </div>
</div>

<style>
    .card {
        padding: 5px;
    }
    h3 {
        text-align: center;
        margin: 0;
        text-shadow: 1px 1px 0px #000000;
    }
    .attacker-icon {
        min-height: 10rem;
        min-width: 15rem;
        display: block;
        background-size: auto;
        background-position: bottom center;
        background-repeat: no-repeat;
    }
    .display-stats {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
