import { writable } from 'svelte/store';

export const aUnit = "warrior";

export const aStats = writable({
    maxHealth: 10,
    health: 10,
    attack: 2,
    defence: 2,
    movement: 1,
    range: 1
})

export const aFields = writable({
    unit: "warrior",
    veteran: false,
    boosted: false,
    health: 10,
    naval: false,
    carrying: "warrior"
});

export const aImg = writable({
    icon: "https://static.wikia.nocookie.net/supertribes/images/1/11/WarriorX.png"
})

export const dStats = writable({
    maxHealth: 10,
    health: 10,
    attack: 2,
    defence: 2,
    movement: 1,
    range: 1
})

export const dFields = writable({
    unit: "warrior",
    veteran: false,
    poisoned: false,
    dBonus: 1,
    health: 10,
});

export const dImg = writable({
    icon: "https://static.wikia.nocookie.net/supertribes/images/1/11/WarriorX.png"
})