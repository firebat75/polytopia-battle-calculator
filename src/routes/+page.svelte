<script>
    import AttackerCard from "../components/AttackerCard.svelte";
    import DefenderCard from "../components/DefenderCard.svelte";
    import Results from "../components/Results.svelte";
</script>

<svelte:head>
    <title>Battle Calculator</title>

    <link rel="stylesheet" href="src\lib\global.css" />
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
    <Results />
</div>

<style>
    #calculator {
        margin: 5px;
        min-height: 85vh;
    }

    .units {
        margin: 5px;
        display: flex;
        justify-content: center;
    }

    .unit-card {
        display: inline-block;
        margin: 1rem;
    }
</style>
