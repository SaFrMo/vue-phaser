# PhaserGame

`phaser-game` wraps one or more Phaser scenes. It should be the root component of any Phaser game.

```html
<phaser-game
    :options="/* optional - object defining game options */"
>
    ...
</phaser-game>
```

## Props

| Name    | Type   | Default   | Required | Description                                                                                                                              |
| ------- | ------ | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | See below |          | Object defining game options. Passed directly to [Phaser.Game](https://photonstorm.github.io/phaser3-docs/Phaser.Game.html) constructor. |

### Options

Default game options are:

```js
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: null,
}
```

These are overwritten by any values you provide in the `options` object.

## Events

| Name      | Arguments                                             |
| --------- | ----------------------------------------------------- |
| `created` | `{ game, target }`, both referencing the created game |