<script>
    let fields = {
        unit: "warrior",
        veteran: false,
        boosted: false,
        health: 10,
    };

    // $: console.log(fields);

    let unit = fields.unit;
    $: unit = fields.unit;
    // $: console.log(unit);

    // import data from "../lib/units.json";
    // console.log(data);
    // for (const unit in data) {
    //     console.log(unit);
    // }
</script>

<div class="unit-card">
    <div id="attacker-input-div">
        <form id="attacker-input-form">
            <h2>attacker</h2>

            <div class="inline">
            <label for="attacker-unit-choice">Unit</label>
            <input
                type="text"
                class="unit-choice"
                name="attacker-unit-choice"
                bind:value={fields.unit}
            />
            </div>

            <div class="inline">
                <label for="veteran">Veteran</label>
                <input
                    type="checkbox"
                    id="veteran"
                    name="veteran"
                    bind:checked={fields.veteran}
            />
            </div>

            <div class="inline">
                <label for="boosted">Combat Boost</label>
                <input
                    type="checkbox"
                    id="boosted"
                    name="boosted"
                    bind:checked={fields.boosted}
                />
            </div>

            <div class="inline">
                <label for="attacker-health">Health</label>
                <input
                    type="text"
                    class="health"
                    name="attacker-health"
                    bind:value={fields.health}
                />
            </div>
        </form>
    </div>

    <div class="unit-stats">
        <div>
            <h3>Health: {fields.health}</h3>
        </div>
        <div>
            <img
                src="https://www.w3schools.com/images/colorpicker2000.png"
                alt="unit placeholder"
            />
        </div>
        <div>
            <p>jfekje</p>
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
</style>
