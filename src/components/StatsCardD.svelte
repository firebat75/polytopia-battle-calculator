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
</div>

<style>
    .card {
        padding: 5px;
    }
    h3 {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.2rem;
        text-shadow: 1px 1px 0px #000000;
    }

    .defender-icon {
        min-height: 10rem;
        min-width: 15rem;
        display: block;
        background-size: 10rem;
        background-position: bottom center;
        background-repeat: no-repeat;
    }
</style>
