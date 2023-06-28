<script>
    import UnitSelectDropdown from "../components/UnitSelectDropdown.svelte";
    import { aStats, aFields, aImg } from "../lib/stores";
    import StatsCardA from "./StatsCardA.svelte";

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

    // units that can carry other units (ships)
    const ships = ["boat", "ship", "battleship"];
    let selectedNaval = "";

    // create array of each unit stats to pull from
    import data from "../lib/units.json";
    let units = [];
    for (const unit in data) {
        units.push(unit);
    }

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
            $aStats.range += 1;
        } else {
            $aStats.attack -= 0.5;
            $aStats.range -= 1;
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
            $aFields.carrying = e.detail.text;
            $aStats.maxHealth = data[e.detail.text].health;
            $aStats.health = data[e.detail.text].health;
            $aFields.carrying = e.detail.text;
        }
        $aImg.icon = data[$aFields.unit].img;
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
                        bind:checked={$aFields.veteran}
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
                    bind:checked={$aFields.boosted}
                    on:click={boosted}
                />
            </div>

            <div class="inline">
                <label for="attacker-health">Health</label>
                <input
                    type="text"
                    class="health"
                    name="attacker-health"
                    bind:value={$aStats.health}
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
</style>
