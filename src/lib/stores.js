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

export const dStats = writable({
    maxHealth: 10,
    health: 10,
    attack: 2,
    defence: 2,
    movement: 1,
    range: 1
})