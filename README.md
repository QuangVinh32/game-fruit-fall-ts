## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory.

To start the local development server use `npm run dev`.

## Deploying to Production

To create a production build use the command `npm run build`.

This will take your game code and build it into a single bundle, ready for deployment. This bundle is saved to the `dist` folder. Please note that some templates save to the `build` folder instead. The deployment script will also copy any assets your project imported, or stored in the public assets folder.

To deploy your game, upload *all* of the contents of the `dist` folder to a public-facing web server.

**Note:** In some templates, the `dist` folder has been renamed to `build` to remain within that framework's conventions.

### Asset Pack

Phaser has the ability to load what are known as 'asset packs'. These are JSON files that describe all of the content that your game needs to load, such as images, audio, and fonts. Phaser Editor will generate and use asset packs intensively and tools such as the Scene Editor depend upon the information stored in the asset pack files.

You can have multiple asset packs per project, which is the recommended practice for larger games, allowing you to load only the pack of assets the game requires at that specific point.

In this template, we have pre-configured two types of asset packs: `boot-asset-pack.json` and `preload-asset-pack.json`.

The `boot-asset-pack.json` file is used to load assets when the game first boots. Typically, you would store a small selection of initial assets in here, such as a loading screen image and progress bar.

The `preload-asset-pack.json` in this template contains the rest of the assets the game needs. You are free to create additional packs as required, but for the sake of simplicity, this template has been configured with just these two packs.

[Learn more about Asset Pack loading in Phaser](https://newdocs.phaser.io/docs/3.80.0/Phaser.Loader.LoaderPlugin#pack)
