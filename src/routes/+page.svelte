<svelte:head>
    <title>Battle Calculator</title>
</svelte:head>

<h3>Welcome to SvelteKit</h3>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
frwefesfsdfsfsdfesfsdfsdfdsfsdfwefwgwesfgsdfds

<div id="calculator">
    <div id="units">
        <div class="unit">
            <div class="unit-card">
                <h2>attacker</h2>

                <form id="attacker-input">
                    <label for="attacker-unit-choice">Unit</label>
                    <input
                        type="text"
                        class="unit-choice"
                        name="attacker-unit-choice"
                    />

                    <label for="veteran">Veteran</label>
                    <input type="checkbox" id="veteran" name="veteran" />

                    <label for="boosted">Combat Boost</label>
                    <input type="checkbox" id="boosted" name="boosted" />

                    <label for="attacker-health">Health</label>
                    <input type="text" class="health" name="attacker-health" />
                </form>
            </div>
            <div class="unit-stats">
                <span class="circle1" />
            </div>
        </div>
        <div class="unit">
            <div class="unit-card">
                <h2>defender</h2>

                <form id="defender-input">
                    <label for="defender-unit-choice">Unit</label>
                    <input
                        type="text"
                        class="unit-choice"
                        name="defender-unit-choice"
                    />

                    <label for="veteran">Veteran</label>
                    <input type="checkbox" id="veteran" name="veteran" />

                    <label for="boosted">Combat Boost</label>
                    <input type="checkbox" id="boosted" name="boosted" />

                    <label for="defender-health">Health</label>
                    <input type="text" class="health" name="defender-health" />
                </form>
            </div>
            <div class="unit-stats">
                <span class="circle2" />
            </div>
        </div>
    </div>
    <button>calculate</button>
</div>

<style>
    #calculator {
        margin: 5px;
        border: solid red;
    }

    #units {
        margin: 5px;
        border: solid orange;
    }

    .unit {
        border: solid lightgray;
        margin: 5px;
        display: inline-block;
    }

    .unit div {
        display: inline-block;
    }

    #attacker-input {
        display: flex;
        flex-direction: column;
    }

    #defender-input {
        display: flex;
        flex-direction: column;
    }

    .unit-stats {
        margin: 30px;
    }

    .circle1 {
        height: 50px;
        width: 50px;
        background-color: blue;
        border-radius: 50%;
        display: inline-block;
    }

    .circle2 {
        height: 50px;
        width: 50px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }
</style>
