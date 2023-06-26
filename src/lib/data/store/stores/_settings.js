import { storage } from "../../../util";

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
