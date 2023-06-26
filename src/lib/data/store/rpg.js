import { storage } from "./storage";
import { writable } from "svelte/store";

export const _running = writable(false);
export const _user = writable(null);
// export const _set1 = storage("nwp-set1", false);
export const _set1 = writable(false);
export const _set2 = writable(false);
export const resetValues = {
  names: {
    town: "",
    mayor: "",
  },
  wood: {
    name: "wood",
    amount: 0,
    increment: 0,
    max: 100,
    storage: 0,
    storageCost: {
      wood: 50,
      stone: 50,
    },
  },
  stone: {
    name: "stone",
    amount: 0,
    increment: 0,
    max: 100,
    storage: 0,
    storageCost: {
      wood: 50,
      stone: 50,
    },
  },
  iron: {
    name: "iron",
    amount: 0,
    increment: 0,
    max: 100,
    storage: 0,
    storageCost: {
      wood: 100,
      stone: 100,
    },
  },
  food: {
    name: "food",
    amount: 0,
    increment: 0,
    max: 100,
    storage: 0,
    storageCost: {
      wood: 50,
      stone: 50,
    },
  },
  worker: {
    name: "worker",
    amount: 0,
    lumberjack: {
      name: "Lumberjack",
      increment: 1,
      amount: 0,
      cost: 10,
    },
    miner: {
      name: "Miner",
      increment: 1,
      amount: 0,
      cost: 10,
    },
    scraper: {
      name: "Scraper",
      increment: 1,
      amount: 0,
      cost: 10,
    },
    hunter: {
      name: "Hunter",
      increment: 1,
      amount: 0,
      cost: 10,
    },
  }, // Buildings
  tent: {
    amount: 0,
    residents: 1,
    cost: {
      wood: 30,
    },
  },
  house: {
    amount: 0,
    residents: 4,
    cost: {
      wood: 75,
      stone: 25,
    },
  },
  improvedhouse: {
    amount: 0,
    residents: 8,
    cost: {
      wood: 200,
      stone: 70,
      iron: 500,
    },
  },
  hostel: {
    amount: 0,
    residents: 10,
    cost: {
      wood: 200,
      stone: 215,
    },
  },
};
export const _settings = storage("nwp_settings", {
  titel: null,
  app_name: "Savage Submarine Legend",
  user_name: null,
  op: {
    auto_save: false,
    delay: 4000,
    volume: 0.2,
  },
});
export const _game = storage("nwp_game", resetValues);

export const sleep = (milliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// export const addcomma = (x) =>
//   x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
