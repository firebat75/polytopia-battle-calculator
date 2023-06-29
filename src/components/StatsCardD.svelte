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
    }
    h3 {
        text-align: center;
        margin: 0;
        text-shadow: 1px 1px 0px #000000;
    }

    .defender-icon {
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
