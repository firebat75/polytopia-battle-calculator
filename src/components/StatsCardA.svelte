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
    <img class="unit-img" src={$aImg.icon} alt="attacker-img" />
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
        outline: 3px solid blue;
    }
    h3 {
        text-align: center;
        margin: 0;
    }

    .unit-img {
        outline: 4px dotted black;
    }

    .display-stats {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
