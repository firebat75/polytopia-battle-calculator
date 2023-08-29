<script>
    import gate from "$lib/gate.png";
    export const prerender = true;
</script>

<svelte:head>
    <title>Battle Calculator</title>

    <link rel="stylesheet" href="static\global.css" />
</svelte:head>
<header>
    <div class="gate-container">
        <img class="gate" src={gate} alt="yaddak gate of power" />
    </div>
    <div>
        <div class="polytopia">
            <hr class="line" />
            <h2>POLYTOPIA</h2>
            <hr class="line" />
        </div>
        <h1 class="title">BATTLE CALCULATOR</h1>
    </div>
</header>

<main>
    <slot />
</main>

<footer>
    <hr />
    <p>Jack Lowry 2022</p>
</footer>

<style>
    .line {
        border: 0;
        width: 100%;
        border-top: 1.5px solid white;
    }

    header {
        display: grid;
        justify-content: center;
    }

    .polytopia {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .polytopia h2 {
        margin: 0;
        margin-left: 0.5rem;
        margin-right: 0.4rem;
        font-weight: 300;
        font-size: 2.2rem;
        position: relative;
        bottom: -5px;
    }

    .title {
        margin: 0rem;
        font-weight: 300;
        font-size: 3rem;
        margin-top: 0.4rem;
    }

    header div {
        display: inline-block;
    }

    .gate-container {
        display: grid;
    }

    .gate {
        justify-self: center;
        height: 6rem;
    }

    footer p {
        text-align: center;
        color: black;
    }

    hr {
        border-top: 1px solid black;
        border-bottom: none;
    }
</style>
