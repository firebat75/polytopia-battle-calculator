<script></script>

<header>
    <div>
        <span class="circle" />
    </div>
    <div>
        <h1>Polytopia Battle Calculator</h1>
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
    main {
        border: solid rosybrown;
    }
    header div {
        display: inline-block;
    }

    .circle {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }

    footer p {
        text-align: center;
    }
</style>
