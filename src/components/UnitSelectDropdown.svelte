<script>
    import { aUnit } from "../lib/stores";
    import data from "../lib/units.json";
    let units = [];
    for (const unit in data) {
        units.push(unit)
    }
    let selected = "warrior";
    $: console.log(selected);

</script>

<div>
    <select name="unit" bind:value={selected}>
        {#each units as unit}
            <option value={unit}>{unit}</option>
        {/each}
    </select>
</div>