import { system } from "@minecraft/server";

export class FXSequence {
    constructor(identifier) {
        this.identifier = identifier;
        this.particles = {};
        this.sounds = {};
    }
    addParticle(time, identifier) {
        if (this.particles[time] === undefined) {
            this.particles[time] = [];
        }
        this.particles[time].push({particle: identifier});
    }
    addParticles(time, identifiers) {
        if (this.particles[time] === undefined) {
            this.particles[time] = [];
        }
        for (let identifier of identifiers) {
            this.particles[time].push({particle: identifier});
        }
    }
    addSound(time, identifier, volume=1, pitch=1) {
        if (this.sounds[time] === undefined) {
            this.sounds[time] = [];
        }
        this.sounds[time].push({sound: identifier, volume: volume, pitch: pitch});
    }
}

export class FXSequencer {
    static fxSequences = {};

    static register(identifier) {
        let fxSequence = new FXSequence(identifier);
        this.fxSequences[identifier] = fxSequence;
        return fxSequence;
    }

    static exists(identifier) {
        return this.fxSequences[identifier] !== undefined;
    }

    static play(fxSequenceIdentifier, dimension, location) {
        let fxSequence = this.fxSequences[fxSequenceIdentifier];
        for (let time of Object.keys(fxSequence.particles)) {
            let particleEffects = fxSequence.particles[time];
            system.runTimeout(function() {
                for (let particleEffect of particleEffects) {
                    dimension.runCommandAsync(`particle ${particleEffect.particle} ${location.x} ${location.y} ${location.z}`);
                }
            }, parseInt(time));
        }
        for (let time of Object.keys(fxSequence.sounds)) {
            let soundEffects = fxSequence.sounds[time];
            system.runTimeout(function() {
                for (let soundEffect of soundEffects) {
                    dimension.runCommandAsync(`playsound ${soundEffect.sound} @a
                    ${location.x} ${location.y} ${location.z}
                    ${soundEffect.volume} ${soundEffect.pitch}`);
                }
            }, parseInt(time));
        }
    }
}