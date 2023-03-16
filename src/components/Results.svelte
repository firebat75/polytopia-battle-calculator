<script>
    import { aStats, dStats, dFields, aFields } from "../lib/stores";
</script>

<div class="main">
    <p>{JSON.stringify($aStats)}</p>
    <p>{JSON.stringify($aFields)}</p>
    <p>{JSON.stringify($dStats)}</p>
    <p>{JSON.stringify($dFields)}</p>
    <button>calculate</button>
</div>

<style>
    .main {
        margin: 10px;
        padding: 10px;
        border: solid green 2px;
    }
</style>
