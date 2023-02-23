<script>
    import { createEventDispatcher } from "svelte";
    import { aUnit } from "../lib/stores";
    import data from "../lib/units.json";

    const dispatch = createEventDispatcher();

    let units = [];
    for (const unit in data) {
        units.push(unit)
    }
    let selected = "warrior";

    function update() {
		dispatch('selection', {
			text: selected
		});
    }
</script>

<div>
    <select name="unit" bind:value={selected} on:change={update}>
        {#each units as unit}
            <option value={unit}>{unit}</option>
        {/each}
    </select>
</div>