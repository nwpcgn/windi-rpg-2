import { storage } from "./storage";
import { writable } from "svelte/store";
export const _set1 = writable(null);
export const _set2 = writable(null);
export const resetValues = {
  money: 0,
  moneyup: 1,
  msec: 0,
  base: {
    cost: 15,
    step: 0,
    boost: 1,
  },
  cats: {
    cost: 25,
    step: 0,
    boost: 1,
    add: 1,
    max: 0,
  },
  wizards: {
    cost: 250,
    step: 0,
    boost: 1,
    add: 15,
    max: 0,
  },
};
export const _settings = storage("nwp_settings", {
  titel: null,
  app_name: 'Savage Submarine Legend',
  user_name: null,
  op: {
    auto_save: false,
    delay: 4000,
    volume: 0.2
  }
});
export const _game = storage("nwp_game", resetValues);


export const sleep = (milliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const addcomma = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

