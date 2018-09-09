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
    private width: number;
    private height: number;
    private parent: HTMLElement | string | undefined;
    private canvasStyle: string | undefined;

    constructor(width: number, height: number, parent?: HTMLElement | string, canvasStyle?: string) {
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.canvasStyle = canvasStyle;
    }

    run(fn: () => void) {
        if (this.game) {
            this.stop();
        }
        fn();
        this.game = new Phaser.Game({
            canvasStyle: this.canvasStyle,
            height: this.height,
            parent: this.parent,
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
