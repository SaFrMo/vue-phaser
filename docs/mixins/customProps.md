# Custom Props

The `customProps` mixin is a way to manually change options on Phaser components. For example:

```html
<phaser-sprite 
    sprite-key="example" 
    :custom-props="{ alphaBottomLeft: 0, scrollFactorX: 0.2 }"  
/>
```

This will set the [alphaBottomLeft](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#alphaBottomLeft__anchor) and [scrollFactorX](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#scrollFactorX__anchor) of the created sprite to 0 and 0.2, respectively. These are just examples - you can set any Phaser-supported properties this way.

Specific vue-phaser props should be preferred when possible, since there's no guarantee that what you set here won't be overwritten by setup and maintenance functions, but in case that's not possible you can use `customProps`.

## Props

| Name          | Type   | Default | Required | Description                                     |
| ------------- | ------ | ------- | -------- | ----------------------------------------------- |
| `customProps` | Object | `{}`    |          | Object of properties to set on the created item |

## Methods

| Name                 | Arguments | Description                |
| -------------------- | --------- | -------------------------- |
| `refreshCustomProps` | none      | Refreshes the custom props |