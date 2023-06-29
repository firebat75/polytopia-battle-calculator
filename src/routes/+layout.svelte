<script>
    import gate from "$lib/gate.png";
</script>

<header>
    <div>
        <img class="gate" src={gate} alt="yaddak gate of power" />
    </div>
    <div>
        <h1 class="title">Polytopia Battle Calculator</h1>
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
    header {
        display: flex;
        justify-content: center;
    }

    .title {
        margin: 1rem;
        font-weight: 300;
        font-size: xx-large;
    }
    header div {
        display: inline-block;
    }

    .gate {
        height: 4rem;
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
