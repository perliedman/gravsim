import App from './components/App.html'
import initialWorld from './initial-world.json'
import {World, Entity} from './simulator'

const world = new World(initialWorld.entities.map(def =>
  new Entity(def.name, def.x, def.y, def.vx, def.vy, def.mass)))

;(function () {
  return new App({
    target: document.querySelector('main'),
    data: {
      world
    }
  })
})()
