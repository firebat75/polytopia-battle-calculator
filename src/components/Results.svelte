<script>
    import {
        aStats,
        dStats,
        dFields,
        aFields,
        aImg,
        dImg,
    } from "../lib/stores";
    import Modal from "./Modal.svelte";
    import Healthbar from "./Healthbar.svelte";
    let showModal = false;

    function calcAttackForce() {
        return $aStats.attack * ($aStats.health / $aStats.maxHealth);
    }

    function calcDBonus() {
        if ($dFields.poisoned) {
            return 1;
        } else {
            return $dFields.dBonus;
        }
    }

    // negate defence bonus if defender is poisoned
    function calcDefenceForce() {
        const dB = calcDBonus();
        return $dStats.defence * ($dStats.health / $dStats.maxHealth) * dB;
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

    <div class="unit-ui">
        <div class="unit-card">
            <div class="hbar">
                <Healthbar
                    maxHealth={$aStats.maxHealth}
                    health={$aStats.health - td[1]}
                />
            </div>
            <span
                class="attacker-icon"
                style="background-image: url('{$aImg.icon}')"
            />
        </div>
        <div class="unit-card">
            <div class="hbar">
                <Healthbar
                    maxHealth={$dStats.maxHealth}
                    health={$dStats.health - td[0]}
                />
            </div>
            <span
                class="defender-icon"
                style="background-image: url('{$dImg.icon}')"
            />
        </div>
    </div>
</Modal>

<style>
    .attacker-icon {
        height: 200px;
        width: 200px;
        display: block;
        background-size: contain;
        background-position: bottom;
        background-repeat: no-repeat;
    }

    .defender-icon {
        height: 200px;
        width: 200px;
        display: block;
        background-size: contain;
        background-position: bottom;
        background-repeat: no-repeat;
        transform: scaleX(-1);
    }

    .main {
        margin: 10px;
        padding: 10px;
        border: solid green 2px;
    }

    .unit-ui {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .unit-card {
        margin: 5px;
        justify-content: center;
    }

    .hbar {
        padding-left: 30px;
        padding-right: 30px;
    }
</style>
