import Phaser from "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import { version } from "../package.json";
import Boot from "./scenes/Boot";
import Game from "./scenes/Game";

array_at();


document.title = `${version}`;

const config = {
    type: Phaser.WEBGL,
    width: 1280,
    height:1240
    scale: {
        parent: "game-container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
        },
        render: {
            pixelArt: false,
        },
    },
    pixelArt: false,
    roundPixels: false,
    plugins: {
        scene: [
            {
                key: "SpinePlugin",
                plugin: window.SpinePlugin,
                mapping: "spine",
            },
        ],
    },
    scene: [Boot, Game ],
    canvasStyle: ``,
    callbacks: {
        postBoot: function (game: Phaser.Game) {},
    },
};


