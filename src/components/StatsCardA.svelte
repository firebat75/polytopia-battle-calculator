<script>
    import {
        aStats,
        dStats,
        dFields,
        aFields,
        aImg,
        dImg,
    } from "../lib/stores";
    import Healthbar from "./Healthbar.svelte";
</script>

<div>
    <h3>{$aFields.unit}</h3>
    <Healthbar maxHealth={$aStats.maxHealth} health={$aStats.health} />
    <img class="unit-img" src={$aImg.icon} alt="attacker-img" />
</div>

<style>
    h3 {
        text-align: center;
        margin: 0;
    }

    .unit-img {
        outline: 4px dotted black;
    }
</style>
