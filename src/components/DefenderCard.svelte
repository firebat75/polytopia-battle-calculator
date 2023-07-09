<script>
    import UnitSelectDropdown from "../components/UnitSelectDropdown.svelte";
    import StatsCardD from "./StatsCardD.svelte";
    import { dStats, dFields, dImg } from "../lib/stores";

    // set fields to default (warrior) on load
    $dFields = {
        unit: "warrior",
        veteran: false,
        poisoned: false,
        dBonus: 1,
        health: 10,
        naval: false,
        carrying: "warrior",
    };

    // set stats to default (warrior) on load
    $dStats = {
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
        if ($dStats.health == "") {
            $dStats.health = 0;
        } else if (!isNaN($dStats.health)) {
            $dStats.health = parseInt($dStats.health);
        } else {
            $dStats.health = $dStats.maxHealth;
        }
    }
    // runs checkHealth() whenever health input field is updated
    $: {
        $dStats.health;
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
        $dFields.veteran = !$dFields.veteran;
        if ($dFields.veteran == true) {
            $dStats.maxHealth += 5;
            $dStats.health += 5;
        } else {
            $dStats.maxHealth -= 5;
            $dStats.health -= 5;
        }
    }

    // changes defence based on poisoned attribute, inverses poison attribute
    function poisoned() {
        $dFields.poisoned = !$dFields.poisoned;
        if ($dFields.poisoned == true) {
            $dStats.defence = $dStats.defence * 0.8;
        } else {
            $dStats.defence = $dStats.defence / 0.8;
        }
    }

    // set dBonus to 1
    function dBonus0() {
        $dFields.dBonus = 1;
    }

    // set dBonus to 1.5
    function dBonus1() {
        $dFields.dBonus = 1.5;
    }

    // set dBonus to 3
    function dBonus2() {
        $dFields.dBonus = 3;
    }

    // changes fields and stats in stores based on form input
    // if naval is selected, default to carrying warrior
    function selection(e) {
        $dFields.veteran = false;
        $dFields.poisoned = false;
        $dFields.unit = e.detail.text;
        $dImg.icon = data[$dFields.unit].img;
        $dStats = {
            maxHealth: data[$dFields.unit].health,
            health: data[$dFields.unit].health,
            attack: data[$dFields.unit].attack,
            defence: data[$dFields.unit].defence,
            movement: data[$dFields.unit].movement,
            range: data[$dFields.unit].range,
        };
        if (ships.includes($dFields.unit)) {
            $dFields.naval = true;
            selectedNaval = $dFields.unit;
            $dFields.carrying = "warrior";
            $dStats.maxHealth = data["warrior"].health;
            $dStats.health = data["warrior"].health;
        } else {
            $dFields.naval = false;
            selectedNaval = "";
        }
        if (nonVet.includes($dFields.unit)) {
            vetAble = false;
        } else {
            vetAble = true;
        }
    }

    // updates fields and stats based on naval selection
    function selectionNaval(e) {
        if (e.detail.text == "cloak") {
            $dFields.unit = "dinghy";
            $dStats = {
                maxHealth: data[$dFields.unit].health,
                health: data[$dFields.unit].health,
                attack: data[$dFields.unit].attack,
                defence: data[$dFields.unit].defence,
                movement: data[$dFields.unit].movement,
                range: data[$dFields.unit].range,
            };
            $dFields.carrying = "cloak";
        } else if (e.detail.text == "dagger") {
            $dFields.unit = "pirate";
            $dStats = {
                maxHealth: data[$dFields.unit].health,
                health: data[$dFields.unit].health,
                attack: data[$dFields.unit].attack,
                defence: data[$dFields.unit].defence,
                movement: data[$dFields.unit].movement,
                range: data[$dFields.unit].range,
            };
            $dFields.carrying = "dagger";
        } else {
            $dStats.maxHealth = data[e.detail.text].health;
            $dStats.health = data[e.detail.text].health;
            $dFields.carrying = e.detail.text;
        }
        $dImg.icon = data[$dFields.unit].img;
    }
</script>

<div class="unit-card">
    <h2>Defender</h2>
    <div class="toprow">
        <div id="defender-input-div">
            <form id="defender-input-form">
                <div class="field-div unitdd">
                    <label for="defender-unit-choice">Unit</label>
                    <UnitSelectDropdown on:selection={selection} />
                </div>

                {#if $dFields.naval}
                    <div class="field-div unitdd">
                        <label for="defender-naval-carry">Carrying</label>
                        <UnitSelectDropdown on:selection={selectionNaval} />
                    </div>
                {/if}

                {#if vetAble}
                    <div class="field-div">
                        <label for="veteran">Veteran</label>
                        <input
                            class="checkbox"
                            type="checkbox"
                            id="veteran"
                            name="veteran"
                            bind:checked={$dFields.veteran}
                            on:click={vetted}
                        />
                    </div>
                {/if}

                <div class="field-div">
                    <label for="poisoned">Poisoned</label>
                    <input
                        class="checkbox"
                        type="checkbox"
                        id="poisoned"
                        name="poisoned"
                        bind:checked={$dFields.poisoned}
                        on:click={poisoned}
                    />
                </div>

                <div class="field-div dradio">
                    <p>Defence Bonus</p>
                    <div class="dbonus-radio">
                        <div class="radio-selection">
                            <input
                                class="radio"
                                type="radio"
                                name="option"
                                value="option1"
                                id="option1"
                                on:click={dBonus0}
                                checked
                            />
                            <label for="option1">None</label><br />
                        </div>

                        <div class="radio-selection">
                            <input
                                class="radio"
                                type="radio"
                                name="option"
                                value="option2"
                                id="option2"
                                on:click={dBonus1}
                            />
                            <label for="option2">x1.5</label><br />
                        </div>

                        <div class="radio-selection">
                            <input
                                class="radio"
                                type="radio"
                                name="option"
                                value="option3"
                                id="option3"
                                on:click={dBonus2}
                            />
                            <label for="option3">x4</label><br />
                        </div>
                    </div>
                </div>

                <div class="field-div">
                    <label for="defender-health">Health</label>
                    <span
                        class="increment lt"
                        on:click={() => {
                            $dStats.health -= 1;
                        }}>-</span
                    >
                    <input
                        type="text"
                        class="health"
                        name="defender-health"
                        bind:value={$dStats.health}
                        on:change={checkHealth}
                    />
                    <span
                        class="increment gt"
                        on:click={() => {
                            $dStats.health += 1;
                        }}>+</span
                    >
                </div>
            </form>
        </div>

        <div class="unit-stats">
            <div class="unit-image-container">
                <StatsCardD />
            </div>
            <div />
        </div>
    </div>
    <div class="display-stats">
        <p>🗡️ {$dStats.attack}</p>
        <p>
            🛡️ {$dStats.defence}{#if $dFields.poisoned}(-30%){/if}
        </p>
        <p>🐎 {$dStats.movement}</p>
        <p>🏹 {$dStats.range}</p>
    </div>
</div>

<style>
    .unitdd {
        align-items: center;
        display: flex;
    }
    .field-div {
        padding: 0.5rem;
        margin-left: 0.5rem;
        border: 1px solid white;
        border-radius: 0.5rem;
    }

    .dradio {
        display: flex;
    }
    .radio-selection .radio {
        margin: 0;
        padding: 0;
        float: left;
    }

    .radio-selection label {
        margin: 0;
        padding: 0;
        float: left;
    }
    .dbonus-radio {
        align-items: center;
    }

    .increment {
        border-radius: 0.2rem;
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
        width: 40rem;
        align-items: center;
    }
    .toprow {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .unit-card div {
        margin-bottom: 0.5rem;
    }

    #defender-input-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #defender-input-div {
        width: 15rem;
        margin-right: 0.5rem;
        padding: 0.5rem;
        margin-left: 0.5rem;
        border: 1px solid white;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.309);
    }

    .health {
        width: 2rem;
        text-align: center;
        height: 1.5rem;
        border-radius: 0.5rem;
        border: none;
    }

    .unit-stats {
        margin-left: 0.5rem;
        border: 1px solid white;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.309);
    }

    .display-stats {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
