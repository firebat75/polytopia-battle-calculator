<script>
    import UnitSelectDropdown from "../components/UnitSelectDropdown.svelte";
    import { dStats, dFields } from "../lib/stores";
    let fields = {
        unit: "warrior",
        veteran: false,
        poisoned: false,
        dBonus: 1,
        health: 10,
    };

    $: {
        fields;
        dFields.update((n) => fields);
        console.log("DEFENDER FIELDS HAVE BEEN UPDATED");
    }

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
    console.log(data);
    for (const unit in data) {
        units.push(unit);
    }
    console.log(units);

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
        dStats.update((n) => stats);
        console.log("DEFENDER STATS HAVE BEEN UPDATED");
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

    function poisoned() {
        fields.poisoned = !fields.poisoned;
        if (fields.poisoned == true) {
            stats.defence = stats.defence * 0.8;
        } else {
            stats.defence = stats.defence / 0.8;
        }
        console.log(fields);
    }

    function selection(e) {
        fields.veteran = false;
        fields.poisoned = false;
        console.log(e.detail.text);
        fields.unit = e.detail.text;
        console.log(data[fields.unit].health);
        stats = {
            maxHealth: data[fields.unit].health,
            health: data[fields.unit].health,
            attack: data[fields.unit].attack,
            defence: data[fields.unit].defence,
            movement: data[fields.unit].movement,
            range: data[fields.unit].range,
        };
        if (ships.includes(fields.unit)) {
            naval = true;
            selectedNaval = fields.unit;
            carrying = "warrior";
            stats.maxHealth = data["warrior"].health;
            stats.health = data["warrior"].health;
        } else {
            naval = false;
            selectedNaval = "";
        }
        if (nonVet.includes(fields.unit)) {
            vetAble = false;
        } else {
            vetAble = true;
        }
        console.log(stats);
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
            console.log("CARRYING " + e.detail.text);
            fields.unit = selectedNaval;
            stats.maxHealth = data[e.detail.text].health;
            stats.health = data[e.detail.text].health;
            carrying = e.detail.text;
        }
        console.log(stats);
    }
</script>

<div class="unit-card">
    <div id="attacker-input-div">
        <form id="attacker-input-form">
            <h2>defender</h2>

            <div class="inline">
                <label for="attacker-unit-choice">Unit</label>
                <UnitSelectDropdown on:selection={selection} />
            </div>

            {#if naval}
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
                <label for="poisoned">Poisoned</label>
                <input
                    type="checkbox"
                    id="poisoned"
                    name="poisoned"
                    bind:checked={fields.poisoned}
                    on:click={poisoned}
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
        <div class="stat-text">
            <h3>Unit: {fields.unit}</h3>
            {#if naval}
                <h5>Carrying: {carrying}</h5>
            {/if}
            <h3>Max Health: {stats.maxHealth}</h3>
            <h3>Health: {stats.health}</h3>
            <h3>Attack: {stats.attack}</h3>
            <h3>Defence: {stats.defence}</h3>
            <h3>Movement: {stats.movement}</h3>
            <h3>Range: {stats.range}</h3>
        </div>
        <div class="unit-image-container">
            <img
                class="unit-image"
                src={data[fields.unit].img}
                alt="unit placeholder"
            />
        </div>
        <div />
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

    .unit-stats {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .health {
        width: 20px;
    }

    .unit-choice {
        width: 68px;
    }

    .unit-image {
        max-width: 200px;
        max-height: 200px;
        margin: auto;
    }

    .unit-image-container {
        height: 200px;
        width: 200px;
    }
</style>
