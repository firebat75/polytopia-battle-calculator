<script>
    import UnitSelectDropdown from "../components/UnitSelectDropdown.svelte";
    import StatsCardA from "./StatsCardA.svelte";
    import { aStats, aFields, aImg } from "../lib/stores";

    // set fields to default (warrior) on load
    $aFields = {
        unit: "warrior",
        veteran: false,
        boosted: false,
        health: 10,
        naval: false,
        carrying: "warrior",
    };

    // set stats to default (warrior) on load
    $aStats = {
        maxHealth: 10,
        health: 10,
        attack: 2,
        defence: 2,
        movement: 1,
        range: 1,
    };

    // checks and ensures health field is a valid integer
    // replaces invalid inputs with a valid one
    function checkHealth() {
        if ($aStats.health == "") {
            $aStats.health = 0;
        } else if (!isNaN($aStats.health)) {
            $aStats.health = parseInt($aStats.health);
        } else {
            $aStats.health = $aStats.maxHealth;
        }
    }
    // runs checkHealth() whenever health input field is updated
    $: {
        $aStats.health;
        checkHealth();
    }

    // create array of each unit stats to pull from
    import data from "../lib/units.json";
    let units = [];
    for (const unit in data) {
        units.push(unit);
    }

    // units that can carry other units (ships)
    const ships = ["boat", "ship", "battleship"];
    let selectedNaval = "";

    // units that can't have veteran toggled on
    let vetAble = true;
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
    // changes health based on veteran attribute, inverses veteran attribute
    function vetted() {
        $aFields.veteran = !$aFields.veteran;
        if ($aFields.veteran == true) {
            $aStats.maxHealth += 5;
            $aStats.health += 5;
        } else {
            $aStats.maxHealth -= 5;
            $aStats.health -= 5;
        }
    }

    // changes attack and range based on combat boost attribute, inverses combat boost attribute
    function boosted() {
        $aFields.boosted = !$aFields.boosted;
        if ($aFields.boosted == true) {
            $aStats.attack += 0.5;
            $aStats.movement += 1;
        } else {
            $aStats.attack -= 0.5;
            $aStats.movement -= 1;
        }
    }

    // changes fields and stats in stores based on form input
    // if naval is selected, default to carrying warrior
    function selection(e) {
        $aFields.veteran = false;
        $aFields.boosted = false;
        $aFields.unit = e.detail.text;
        $aImg.icon = data[$aFields.unit].img;
        $aStats = {
            maxHealth: data[$aFields.unit].health,
            health: data[$aFields.unit].health,
            attack: data[$aFields.unit].attack,
            defence: data[$aFields.unit].defence,
            movement: data[$aFields.unit].movement,
            range: data[$aFields.unit].range,
        };
        if (ships.includes($aFields.unit)) {
            $aFields.naval = true;
            selectedNaval = $aFields.unit;
            $aFields.carrying = "warrior";
            $aStats.maxHealth = data["warrior"].health;
            $aStats.health = data["warrior"].health;
        } else {
            $aFields.naval = false;
            selectedNaval = "";
        }
        if (nonVet.includes($aFields.unit)) {
            vetAble = false;
        } else {
            vetAble = true;
        }
    }

    // updates fields and stats based on naval selection
    function selectionNaval(e) {
        if (e.detail.text == "cloak") {
            $aFields.unit = "dinghy";
            $aStats = {
                maxHealth: data[$aFields.unit].health,
                health: data[$aFields.unit].health,
                attack: data[$aFields.unit].attack,
                defence: data[$aFields.unit].defence,
                movement: data[$aFields.unit].movement,
                range: data[$aFields.unit].range,
            };
            $aFields.carrying = "cloak";
        } else if (e.detail.text == "dagger") {
            $aFields.unit = "pirate";
            $aStats = {
                maxHealth: data[$aFields.unit].health,
                health: data[$aFields.unit].health,
                attack: data[$aFields.unit].attack,
                defence: data[$aFields.unit].defence,
                movement: data[$aFields.unit].movement,
                range: data[$aFields.unit].range,
            };
            $aFields.carrying = "dagger";
        } else {
            $aStats.maxHealth = data[e.detail.text].health;
            $aStats.health = data[e.detail.text].health;
            $aFields.carrying = e.detail.text;
        }
        $aImg.icon = data[$aFields.unit].img;
    }
</script>

<div class="unit-card">
    <h2>Attacker</h2>
    <div class="toprow">
        <div id="attacker-input-div">
            <form id="attacker-input-form">
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
                            class="checkbox"
                            type="checkbox"
                            id="veteran"
                            name="veteran"
                            bind:checked={$aFields.veteran}
                            on:click={vetted}
                        />
                    </div>
                {/if}

                <div class="inline">
                    <label for="boosted">Combat Boost</label>
                    <input
                        type="checkbox"
                        class="checkbox"
                        id="boosted"
                        name="boosted"
                        bind:checked={$aFields.boosted}
                        on:click={boosted}
                    />
                </div>

                <div class="inline">
                    <label for="attacker-health">Health</label>
                    <span
                        class="increment lt"
                        on:click={() => {
                            $aStats.health -= 1;
                        }}>-</span
                    >
                    <input
                        type="text"
                        class="health"
                        name="attacker-health"
                        bind:value={$aStats.health}
                        on:change={checkHealth}
                    />
                    <span
                        class="increment gt"
                        on:click={() => {
                            $aStats.health += 1;
                        }}>+</span
                    >
                </div>
            </form>
        </div>

        <div class="unit-stats">
            <div class="unit-image-container">
                <StatsCardA />
            </div>
        </div>
    </div>
    <div class="display-stats">
        <p class="stat">
            🗡️ {$aStats.attack}{#if $aFields.boosted}(+0.5){/if}
        </p>
        <p class="stat">🛡️ {$aStats.defence}</p>
        <p class="stat">
            🐎 {$aStats.movement}{#if $aFields.boosted}(+1){/if}
        </p>
        <p class="stat">🏹 {$aStats.range}</p>
    </div>
</div>

<style>
    .stat {
        background-color: black;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    .increment {
        background-color: rgb(0, 116, 116);
        padding: 5px;
        cursor: pointer;
    }

    .increment:hover {
        background-color: rgb(0, 171, 171);
    }

    .unit-card {
        background-color: rgba(0, 0, 0, 0.309);
        padding: 1rem;
        border-radius: 1rem;
        text-align: center;
    }

    .toprow {
        display: flex;
        width: max-content;
    }

    label {
        padding: 5px;
    }

    input {
        padding: 3px;
    }

    .unit-card div {
        display: inline-flex;
        min-width: 12rem;
        margin-bottom: 0.5rem;
    }

    #attacker-input-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .health {
        width: 1rem;
    }
    .display-stats {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
