<svelte:head>
    <title>Battle Calculator</title>
</svelte:head>

<h3>Welcome to SvelteKit</h3>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
frwefesfsdfsfsdfesfsdfsdfdsfsdfwefwgwesfgsdfds

<div id="calculator">
    <div id="units">
        <div class="unit">
            <h2>attacker</h2>
            <div>
                <div>
                    <h3>unit select</h3>
                </div>
                <div>
                    <span class="circle1" />
                </div>
            </div>
        </div>
        <div class="unit">
            <h2>defender</h2>
            <div>
                <h3>unit select</h3>
            </div>
            <div>
                <span class="circle2" />
            </div>
        </div>
    </div>
    <button>calculate</button>
</div>

<style>
    #calculator {
        margin: 5px;
        border: solid red;
    }

    #units {
        margin: 5px;
        border: solid orange;
    }

    .unit {
        border: solid lightgray;
        margin: 5px;
        display: inline-block;
    }

    .circle1 {
        height: 25px;
        width: 25px;
        background-color: blue;
        border-radius: 50%;
        display: inline-block;
    }

    .circle2 {
        height: 25px;
        width: 25px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }
</style>
