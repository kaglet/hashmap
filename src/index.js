import Hashmap from "./hashmap.js";

let map = new Hashmap();

map.set("kago", "lizards");
map.set("lizzie", "alligators");
map.set("ogak", "wizards");
map.set("kago", "rats");

console.log(map.get("lizzie"));
map.remove("kago");

console.log(map);