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
});

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
    boosted: false,
    dBonus: 1,
    health: 10,
});