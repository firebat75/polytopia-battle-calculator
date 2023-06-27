<script>
    export let maxHealth;
    export let health;
</script>

<body>
    <div class="bar">
        <div
            class="health"
            style="width: {Math.floor((100 / maxHealth) * health)}%"
        >
            <p>{health}/{maxHealth}</p>
        </div>
    </div>
</body>

<style>
    body {
        margin: 1em;
    }

    .bar {
        width: 100%;
        background-color: rgba(255, 0, 0, 0.303);
        outline: 3px solid black;
    }

    .health {
        background-color: rgb(0, 255, 0);
    }

    p {
        text-align: center;
        margin: 0;
    }
</style>
