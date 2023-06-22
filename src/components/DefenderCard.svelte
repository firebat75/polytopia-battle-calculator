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

    // updates stores field variables every time they are updated
    $: {
        fields;
        dFields.update((n) => fields);
        console.log("DEFENDER FIELDS HAVE BEEN UPDATED");
    }

    // keeps health input a valid integer
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

    // updates stores stats variables every time they are updated
    $: {
        stats;
        dStats.update((n) => stats);
        console.log("DEFENDER STATS HAVE BEEN UPDATED");
    }

    let naval = false;
    let selectedNaval = "";
    let vetAble = true;
    let carrying = "";

    // changes max health according to fields.veteran
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

    // changes stats.defence according to fields.poison
    function poisoned() {
        fields.poisoned = !fields.poisoned;
        if (fields.poisoned == true) {
            stats.defence = stats.defence * 0.8;
        } else {
            stats.defence = stats.defence / 0.8;
        }
        console.log(fields);
    }

    function dBonus0() {
        fields.dBonus = 1;
    }

    function dBonus1() {
        fields.dBonus = 1.5;
    }

    function dBonus2() {
        fields.dBonus = 3;
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

            <div class="field-div">
                <label for="attacker-unit-choice">Unit</label>
                <UnitSelectDropdown on:selection={selection} />
            </div>

            {#if naval}
                <div class="field-div">
                    <label for="attacker-naval-carry">Carrying</label>
                    <UnitSelectDropdown on:selection={selectionNaval} />
                </div>
            {/if}

            {#if vetAble}
                <div class="field-div">
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

            <div class="field-div">
                <label for="poisoned">Poisoned</label>
                <input
                    type="checkbox"
                    id="poisoned"
                    name="poisoned"
                    bind:checked={fields.poisoned}
                    on:click={poisoned}
                />
            </div>

            <div class="field-div">
                <label for="attacker-health">Health</label>
                <input
                    type="text"
                    class="health"
                    name="attacker-health"
                    bind:value={stats.health}
                    on:change={checkHealth}
                />
            </div>

            <div class="field-div">
                <p>Defence Bonus</p>
                <div class="dbonus-radio">
                    <input
                        type="radio"
                        name="option"
                        value="option1"
                        id="option1"
                        on:click={dBonus0}
                        checked
                    />
                    <label for="option1">None</label><br />

                    <input
                        type="radio"
                        name="option"
                        value="option2"
                        id="option2"
                        on:click={dBonus1}
                    />
                    <label for="option2">x1.5</label><br />

                    <input
                        type="radio"
                        name="option"
                        value="option3"
                        id="option3"
                        on:click={dBonus2}
                    />
                    <label for="option3">x4</label><br />
                </div>
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

    .field-div {
        outline: 1px solid black;
        display: inline-flex;
    }

    .dbonus-radio {
        display: block !important;
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
