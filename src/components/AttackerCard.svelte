<script>
    import UnitSelectDropdown from "../components/UnitSelectDropdown.svelte";
    import { aStats, aFields, aImg } from "../lib/stores";
    import StatsCardA from "./StatsCardA.svelte";
    let fields = {
        unit: "warrior",
        veteran: false,
        boosted: false,
        health: 10,
        naval: false,
        carrying: "warrior",
    };

    $: {
        fields;
        aFields.update((n) => fields);
        console.log("DEFENDER FIELDS HAVE BEEN UPDATED");
    }

    // checks and ensures health field is a valid integer
    function checkHealth() {
        if (stats.health == "") {
            stats.health = 0;
        } else if (!isNaN(stats.health)) {
            stats.health = parseInt(stats.health);
        } else {
            stats.health = stats.maxHealth;
        }
    }
    $: {
        stats.health;
        checkHealth();
    }

    // units that can't have veteran toggled on
    const nonVet = [
        "cloak",
        "dagger",
        "polytaur",
        "navalon",
        "bunny",
        "bunta",
        "dinghy",
        "pirate",
    ];
    const ships = ["boat", "ship", "battleship"];

    let unit = fields.unit;
    $: unit = fields.unit;

    import data from "../lib/units.json";
    let units = [];
    for (const unit in data) {
        units.push(unit);
    }

    export let stats = {};
    stats = {
        maxHealth: 10,
        health: 10,
        attack: 2,
        defence: 2,
        movement: 1,
        range: 1,
    };

    $: {
        stats;
        aStats.update((n) => stats);
        console.log("ATTACKER STATS HAVE BEEN UPDATED");
    }

    let naval = false;
    let selectedNaval = "";
    let vetAble = true;
    let carrying = "";

    function vetted() {
        fields.veteran = !fields.veteran;
        if (fields.veteran == true) {
            stats.maxHealth += 5;
            stats.health += 5;
        } else {
            stats.maxHealth -= 5;
            stats.health -= 5;
        }
        console.log(fields);
    }

    function boosted() {
        fields.boosted = !fields.boosted;
        if (fields.boosted == true) {
            stats.attack += 0.5;
            stats.range += 1;
        } else {
            stats.attack -= 0.5;
            stats.range -= 1;
        }
        console.log(fields);
    }

    function selection(e) {
        fields.veteran = false;
        fields.boosted = false;
        fields.unit = e.detail.text;
        $aImg.icon = data[fields.unit].img;
        stats = {
            maxHealth: data[fields.unit].health,
            health: data[fields.unit].health,
            attack: data[fields.unit].attack,
            defence: data[fields.unit].defence,
            movement: data[fields.unit].movement,
            range: data[fields.unit].range,
        };
        if (ships.includes(fields.unit)) {
            $aFields.naval = true;
            selectedNaval = fields.unit;
            carrying = "warrior";
            stats.maxHealth = data["warrior"].health;
            stats.health = data["warrior"].health;
        } else {
            $aFields.naval = false;
            selectedNaval = "";
        }
        if (nonVet.includes(fields.unit)) {
            vetAble = false;
        } else {
            vetAble = true;
        }
    }

    function selectionNaval(e) {
        if (e.detail.text == "cloak") {
            fields.unit = "dinghy";
            stats = {
                maxHealth: data[fields.unit].health,
                health: data[fields.unit].health,
                attack: data[fields.unit].attack,
                defence: data[fields.unit].defence,
                movement: data[fields.unit].movement,
                range: data[fields.unit].range,
            };
            carrying = "cloak";
        } else if (e.detail.text == "dagger") {
            fields.unit = "pirate";
            stats = {
                maxHealth: data[fields.unit].health,
                health: data[fields.unit].health,
                attack: data[fields.unit].attack,
                defence: data[fields.unit].defence,
                movement: data[fields.unit].movement,
                range: data[fields.unit].range,
            };
            carrying = "dagger";
        } else {
            $aFields.carrying = e.detail.text;
            fields.unit = selectedNaval;
            stats.maxHealth = data[e.detail.text].health;
            stats.health = data[e.detail.text].health;
            carrying = e.detail.text;
        }
        $aImg.icon = data[fields.unit].img;
    }
</script>

<div class="unit-card">
    <div id="attacker-input-div">
        <form id="attacker-input-form">
            <h2>attacker</h2>

            <div class="inline">
                <label for="attacker-unit-choice">Unit</label>
                <UnitSelectDropdown on:selection={selection} />
            </div>

            {#if $aFields.naval}
                <div class="inline">
                    <label for="attacker-naval-carry">Carrying</label>
                    <UnitSelectDropdown on:selection={selectionNaval} />
                </div>
            {/if}

            {#if vetAble}
                <div class="inline">
                    <label for="veteran">Veteran</label>
                    <input
                        type="checkbox"
                        id="veteran"
                        name="veteran"
                        bind:checked={fields.veteran}
                        on:click={vetted}
                    />
                </div>
            {/if}

            <div class="inline">
                <label for="boosted">Combat Boost</label>
                <input
                    type="checkbox"
                    id="boosted"
                    name="boosted"
                    bind:checked={fields.boosted}
                    on:click={boosted}
                />
            </div>

            <div class="inline">
                <label for="attacker-health">Health</label>
                <input
                    type="text"
                    class="health"
                    name="attacker-health"
                    bind:value={stats.health}
                    on:change={checkHealth}
                />
            </div>
        </form>
    </div>

    <div class="unit-stats">
        <div class="unit-image-container">
            <StatsCardA />
        </div>
    </div>
</div>

<style>
    .stat-text {
        display: block !important;
    }
    label {
        padding: 5px;
    }

    input {
        padding: 3px;
    }

    .unit-card div {
        display: inline-flex;
    }

    #attacker-input-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .unit-stats {
        outline: solid blue 1px;
    }

    .health {
        width: 20px;
    }

    .unit-choice {
        width: 68px;
    }

    /* .unit-image {
        max-width: 200px;
        max-height: 200px;
        margin: auto;
    } */

    /* .unit-image-container {
        height: 200px;
        width: 200px;
        display: block !important;
    } */
</style>
