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
    <img class="unit-img" src={$dImg.icon} alt="attacker-img" />
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

    .unit-img {
        outline: 4px dotted black;
    }

    .display-stats {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
