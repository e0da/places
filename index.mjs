import { Simulation } from "./lib/Simulation.mjs";
import { WebPageDriver } from "./lib/WebPageDriver.mjs";

const simulation = new Simulation();
const children = [simulation];
const loader = new WebPageDriver({ children });

loader.load();
loader.start();
