import { world } from "@minecraft/server";

const DEBUG_LEVEL = 0;

class Debugger {
    constructor(level, prefix) {
        this.level = level;
        this.prefix = prefix;
        this.enabled = true;
    }
    send(message) {
        if (!this.enabled) return;
        if (DEBUG_LEVEL > this.level) return;
        world.sendMessage(this.prefix+"§7 >> "+message);
    }
    copy(prefix) {
        return new Debugger(this.level, "§b["+prefix+"] "+this.prefix);
    }
}

export const Debuggers = {
    debug: new Debugger(0, "§7DEBUG"),
    log: new Debugger(1, "§7LOG"),
    warn: new Debugger(1, "§eWARN"),
    error: new Debugger(1, "§cERROR")
};