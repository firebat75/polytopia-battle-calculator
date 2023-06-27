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
    <button on:click={() => (showModal = true)}> show modal </button>
</div>

<Modal bind:showModal>
    <h2 slot="header">
        modal
        <small><em>adjective</em> mod·al \ˈmō-dəl\</small>
    </h2>

    <ol class="definition-list">
        <li>of or relating to modality in logic</li>
        <li>
            containing provisions as to the mode of procedure or the manner of
            taking effect —used of a contract or legacy
        </li>
        <li>of or relating to a musical mode</li>
        <li>of or relating to structure as opposed to substance</li>
        <li>
            of, relating to, or constituting a grammatical form or category
            characteristically indicating predication
        </li>
        <li>of or relating to a statistical mode</li>
    </ol>

    <a href="https://www.merriam-webster.com/dictionary/modal"
        >merriam-webster.com</a
    >
</Modal>

<style>
    .main {
        margin: 10px;
        padding: 10px;
        border: solid green 2px;
    }
</style>
