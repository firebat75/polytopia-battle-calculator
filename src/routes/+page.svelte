<script>
    import AttackerCard from "../components/AttackerCard.svelte";
    import DefenderCard from "../components/DefenderCard.svelte";
</script>

<svelte:head>
    <title>Battle Calculator</title>
</svelte:head>

<div id="calculator">
    <div class="units">
        <div class="unit-card">
            <AttackerCard />
        </div>

        <div class="unit-card">
            <DefenderCard />
        </div>
    </div>
    <button>calculate</button>
</div>

<style>
    #calculator {
        margin: 5px;
        border: solid red;
    }

    .units {
        margin: 5px;
        border: solid orange;
    }

    .unit-card {
        border: solid black;
        display: inline-block;
        margin: 3px;
    }
</style>
