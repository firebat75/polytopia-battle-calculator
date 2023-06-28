<script>
    import { aStats, dStats, dFields, aFields } from "../lib/stores";
    import Modal from "./Modal.svelte";
    let showModal = false;

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

    // calculates how much health the defender will take
    function calcAttackResult() {
        return Math.round(
            (calcAttackForce() / calcTotalDamage()) * $aStats.attack * 4.5
        );
    }

    // calculates how much health the attacker will take from defender retaliation
    function calcDefenceResult() {
        return Math.round(
            (calcDefenceForce() / calcTotalDamage()) * $dStats.defence * 4.5
        );
    }

    let td = [0, 0];
    function calculate() {
        showModal = true;
        td[0] = calcAttackResult();
        td[1] = calcDefenceResult();
    }
</script>

<div class="main">
    <p>{JSON.stringify($aStats)}</p>
    <p>{JSON.stringify($aFields)}</p>
    <p>{JSON.stringify($dStats)}</p>
    <p>{JSON.stringify($dFields)}</p>
    <h1>{td}</h1>
    <button on:click={calculate}>calculate</button>
</div>

<Modal bind:showModal>
    <h2 slot="header">Combat Results</h2>

    <ul>
        <li>defender takes {td[0]} of damage</li>
        <li>attacker takes {td[1]} of health in retaliation</li>
    </ul>

    <ul>
        <li>defender has {$dStats.health - td[0]} remaining health</li>
        <li>attacker has {$aStats.health - td[1]} remaining health</li>
    </ul>
</Modal>

<style>
    .main {
        margin: 10px;
        padding: 10px;
        border: solid green 2px;
    }
</style>
