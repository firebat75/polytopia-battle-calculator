<script>
    export let maxHealth;
    export let health;
    export let veteran;
</script>

<div class="hbody">
    <div class="bar">
        <div
            class="health"
            style="width: {Math.floor((100 / maxHealth) * health)}%"
        >
            <p class="health-fraction">
                ❤️{health}/{maxHealth}{#if veteran}(+5){/if}
            </p>
        </div>
    </div>
</div>

<style>
    .hbody {
        text-align: center;
        margin: 0 4px 0 4px;
    }

    .bar {
        width: 100%;
        background-color: rgba(255, 0, 0, 0.404);
        outline: 3px solid black;
    }

    .health {
        background-color: rgb(0, 255, 0);
    }

    .health-fraction {
        margin: 0;
    }
</style>
