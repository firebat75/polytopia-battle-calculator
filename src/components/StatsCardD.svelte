<script>
    import { dStats, dFields, dImg } from "../lib/stores";
    import Healthbar from "./Healthbar.svelte";
</script>

<div class="card">
    <h3>
        {$dFields.unit}
        {#if $dFields.naval}({$dFields.carrying}){/if}
    </h3>
    <Healthbar
        maxHealth={$dStats.maxHealth}
        health={$dStats.health}
        veteran={$dFields.veteran}
    />
    <span class="defender-icon" style="background-image: url('{$dImg.icon}')" />
    <div class="display-stats">
        <p>🗡️ {$dStats.attack}</p>
        <p>
            🛡️ {$dStats.defence}{#if $dFields.poisoned}(-30%){/if}
        </p>
        <p>🐎 {$dStats.movement}</p>
        <p>🏹 {$dStats.range}</p>
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

    .defender-icon {
        height: 200px;
        width: 200px;
        display: block;
        background-size: contain;
        background-position: bottom;
        background-repeat: no-repeat;
    }

    .display-stats {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
