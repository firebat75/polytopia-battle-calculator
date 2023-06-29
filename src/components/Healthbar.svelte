<script>
    export let maxHealth;
    export let health;
    export let veteran;
</script>

<div class="hbody">
    <p class="health-fraction">
        ❤️{health}/{maxHealth}{#if veteran}(+5){/if}
    </p>
    <div class="bar">
        <div class="health">
            <div class="ticks">
                {#each Array(health) as _, i}
                    <p class="tick-a" style="width: {100 / maxHealth}%">
                        &nbsp;
                    </p>
                {/each}
                {#each Array(Math.max(maxHealth - health, 0)) as _, i}
                    <p class="tick-b" style="width: {100 / maxHealth}%">
                        &nbsp;
                    </p>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .health-fraction {
        color: white;
        margin: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        text-shadow: 1px 1px 0px #000000;
    }
    .ticks {
        display: flex;
    }

    .tick-a {
        color: rgb(0, 255, 0);
        margin: 0;
        height: 100;
        outline: solid black 1px;
        background: rgb(0, 100, 0);
        background: linear-gradient(
            0deg,
            rgba(0, 100, 0, 1) 0%,
            rgba(0, 255, 0, 1) 66%,
            rgba(0, 100, 0, 1) 100%
        );
    }
    .tick-b {
        color: rgb(177, 177, 177);
        margin: 0;
        height: 100;
        outline: solid black 1px;
        background-color: rgb(177, 177, 177);
    }

    .hbody {
        position: relative;
        align-items: center;
        margin: 0 4px 0 4px;
    }

    .bar {
        width: 100%;
        outline: 3px solid black;
    }
</style>
