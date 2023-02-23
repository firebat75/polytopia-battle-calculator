<script>
    import AttackerCard from "../components/AttackerCard.svelte";

    import { aStats } from "../lib/stores";

    function printStats() {
        console.log(aStats);
    }
</script>

<svelte:head>
    <title>Battle Calculator</title>
</svelte:head>

<h3>Welcome to SvelteKit</h3>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
frwefesfsdfsfsdfesfsdfsdfdsfsdfwefwgwesfgsdfds

<div id="calculator">
    <div class="units">
        <div class="unit-card">
            <AttackerCard />
        </div>

        <div class="unit-card">
            <AttackerCard />
        </div>
    </div>
    <button on:click={printStats}>calculate</button>
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
