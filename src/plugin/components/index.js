// core
import PhaserContainer from './core/PhaserContainer'
import PhaserGame from './core/PhaserGame'
import PhaserScene from './core/PhaserScene'
import PhaserShape from './core/PhaserShape'
import PhaserSprite from './core/PhaserSprite'
import PhaserText from './core/PhaserText'
import PhaserVueWrap from './core/PhaserVueWrap'

// groups
import PhaserGroup from './groups/PhaserGroup'
import PhaserGroupChild from './groups/PhaserGroupChild'

// particles
import PhaserParticles from './particles/PhaserParticles'
import PhaserParticleEmitter from './particles/PhaserParticleEmitter'

// physics
import PhysicsGroup from './physics/PhysicsGroup'

export default [
    // core
    PhaserContainer,
    PhaserGame,
    PhaserScene,
    PhaserShape,
    PhaserSprite,
    PhaserText,
    PhaserVueWrap,

    // groups
    PhaserGroup,
    PhaserGroupChild,

    // particles
    PhaserParticles,
    PhaserParticleEmitter,

    // physics
    PhysicsGroup
]