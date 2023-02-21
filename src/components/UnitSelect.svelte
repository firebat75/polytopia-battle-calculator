<script>
    let input = "warrior";
    import data from "../lib/units.json";

    let units = [];
    for (const unit in data) {
        units.push(unit)
    }

</script>

<h1>TESTESTESTETS</h1>

<ul>
    {#each units as unit}
        <li class="unit-card">
            <img src={data[unit].img} alt="unit preview">
            <p>{unit}</p>
        </li>
    {/each}
</ul>


<style>
    ul {
        list-style-type: none;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        background-color: blanchedalmond;
        max-width: 700px;
    }
    img {
        max-width: 100px;
    }
    .unit-card {
        background-color: darkgoldenrod;
        border: solid black 1px;
        margin: 3px;
        text-align: center;
    }
    p {
        margin: 3px;
    }
</style>