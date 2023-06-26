import { storage } from "./storage";
import { writable } from "svelte/store";
const resetValues = {
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
export const _user = writable(null);
export const _profile = writable(null);
export const _settings = storage("nwp_settings", {
  name: "Savage Submarine Legend",
  user_name: "User",
  op: {
    volume: 0.2,
    auto_save: false,
  },
});
export const _game = storage("nwp_game", resetValues);


export const sleep = (milliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const addcomma = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
