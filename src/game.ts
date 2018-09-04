import "p2";
import "pixi";

import Phaser from "phaser-ce";

type GameCallback = (game: Phaser.Game) => void;
const noop: GameCallback = () => undefined;

export default class GameLauncher {
    readonly scope = {
        create: this.create.bind(this),
        preload: this.preload.bind(this),
        update: this.update.bind(this),
    };

    private game: Phaser.Game | undefined;
    private preloadCb = noop;
    private createCb = noop;
    private updateCb = noop;
    private el: HTMLElement | string | undefined;
    private width: number;
    private height: number;

    constructor(width: number, height: number, el?: HTMLElement | string) {
        this.width = width;
        this.height = height;
        this.el = el;
    }

    run(fn: () => void) {
        if (this.game) {
            this.stop();
        }
        fn();
        this.game = new Phaser.Game({
            height: this.height,
            parent: this.el,
            state: {
                create: () => this.createCb(this.game!),
                preload: () => this.preloadCb(this.game!),
                update: () => this.updateCb(this.game!),
            },
            width: this.width,
        });
    }

    stop() {
        if (this.game) {
            this.game.destroy();
            this.game = undefined;
            this.preloadCb = this.createCb = this.updateCb = noop;
        }
    }

    pause() {
        if (this.game) {
            this.game.paused = !this.game.paused;
        }
    }

    private preload(cb: GameCallback) {
        this.preloadCb = cb;
    }

    private create(cb: GameCallback) {
        this.createCb = cb;
    }

    private update(cb: GameCallback) {
        this.updateCb = cb;
    }

}
