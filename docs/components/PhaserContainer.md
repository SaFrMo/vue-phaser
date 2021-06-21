# PhaserContainer

`phaser-container` acts as a parent for other GameObjects. It corresponds directly with Phaser's [Container](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html) class.

You can use a `phaser-container` to place and move several sprites at once, for example. For a conceptual, Vue-only container rather than a literal in-game Phaser container, see [phaser-vue-wrap](/components/PhaserVueWrap).

```html
<!-- animate `x` to move all 5 child sprites at once -->
<phaser-container :x="x">
    <phaser-sprite 
        v-for="i in 5" 
        :key="i" 
        sprite-key="block" 
        :x="i * 20"
    />
</phaser-container>
```

## Props

Includes all props from the following mixins:

* [customProps](/mixins/customProps)
* [depth](/mixins/depth)
* [gameObject](/mixins/gameObject)
* [transform](mixins/transform)

## Events

| Name      | Arguments                                                       |
| --------- | --------------------------------------------------------------- |
| `created` | `{ container, target }`, both referencing the created Container |