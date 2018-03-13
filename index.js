const G = 6.67408e-11

class Entity {
  constructor (x, y, vx, vy, mass) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.mass = mass
  }

  accelerate (dt, fx, fy) {
    const ax = fx / this.mass
    const ay = fy / this.mass

    this.vx += ax * dt
    this.vy += ay * dt
  }

  step (dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt
  }
}

class World {
  constructor (entities) {
    this.entities = entities || []
  }

  step (dt) {
    for (let i = 0; i < this.entities.length; i++) {
      const e1 = this.entities[i]

      for (let j = 0; j < i; j++) {
        const e2 = this.entities[j]

        const dx = e1.x - e2.x
        const dy = e1.y - e2.y
        const d2 = dx * dx + dy * dy
        const d = Math.sqrt(d2)
        const f = G * e1.mass * e2.mass / d2
        const fx = f * (dx / d)
        const fy = f * (dy / d)

        e1.accelerate(dt, -fx,  -fy)
        e2.accelerate(dt, fx,  fy)
      }
    }

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].step(dt)
    }
  }
}

const world = new World([
  new Entity(0, 0, 0, 0, 1.98855e30),           // Sun
  new Entity(7375.9e9, 0, 0, 4.7e3, 0.0146e24), // Pluto
  new Entity(4545.7e9, 0, 0, 5.4e3, 102e24),    // Neptune
  new Entity(3003.6e9, 0, 0, 6.8e3, 86.8e24),   // Uranus
  new Entity(1514.5e9, 0, 0, 9.7e3, 568e24),    // Saturn
  new Entity(816.6e9, 0, 0, 13.1e3, 1898e24),   // Jupiter
  new Entity(249.2e9, 0, 0, 24.1e3, 0.642e24),  // Mars
  new Entity(152.10e9, 0, 0, 29.8e3, 5.97e24),  // Tellus
  new Entity(69.8e9, 0, 0, 47.4e3, 0.333e24),   // Mercury
  new Entity(108.9e9, 0, 0, 35e3, 4.87e24)      // Venus
])

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth - 4
canvas.height = window.innerHeight - 4

document.body.appendChild(canvas)

const context = canvas.getContext('2d')
context.setTransform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2)
context.fillStyle = 'rgba(0, 0, 0, 0.1'

var lastT = +new Date()
const step = () => {
  const t = +new Date()
  const dt = (t - lastT) * 10000
  world.step(dt)
  lastT = t
}

var scale = Math.min(canvas.width, canvas.height) / (world.entities[1].x) / 2
var centerX = 0
var centerY = 0

const render = () => {
  context.setTransform(1, 0, 0, 1, 0, 0)
//  context.clearRect(0, 0, canvas.width, canvas.height);

  centerX = world.entities[0].x
  centerY = world.entities[0].y

  context.setTransform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2)
  for (let i = 0; i < world.entities.length; i++) {
    const e = world.entities[i]
    const vx = (e.x - centerX) * scale
    const vy = (e.y - centerY) * scale

    context.fillRect(vx, vy, 1, 1)
  }

  requestAnimationFrame(render)
}

setInterval(step, 0)
requestAnimationFrame(render)
