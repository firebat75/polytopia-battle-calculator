<script>
    import AttackerCard from "../components/AttackerCard.svelte";
    import DefenderCard from "../components/DefenderCard.svelte";
    import Results from "../components/Results.svelte";
</script>

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

    @media (min-width: 1200px) {
        .units {
            display: flex;
        }
    }

    @media (max-width: 1200px) {
        .units {
            display: grid;
        }
    }

    .units {
        margin: 5px;
        justify-content: center;
    }

    .unit-card {
        display: inline-block;
        margin: 1rem;
    }
</style>
