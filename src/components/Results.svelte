<script>
    import { aStats, dStats, dFields, aFields } from "../lib/stores";

    let td = 0;

    function calcAttackForce() {
        return $aStats.attack * ($aStats.health / $aStats.maxHealth);
    }

    function calcDefenceForce() {
        return (
            $dStats.defence *
            ($dStats.health / $dStats.maxHealth) *
            $dFields.dBonus
        );
    }

    function calcTotalDamage() {
        return calcAttackForce() + calcDefenceForce();
    }

    function test() {
        td = calcTotalDamage();
    }
</script>

<div class="main">
    <p>{JSON.stringify($aStats)}</p>
    <p>{JSON.stringify($aFields)}</p>
    <p>{JSON.stringify($dStats)}</p>
    <p>{JSON.stringify($dFields)}</p>
    <h1>{td}</h1>
    <button on:click={test}>calculate</button>
</div>

<style>
    .main {
        margin: 10px;
        padding: 10px;
        border: solid green 2px;
    }
</style>
