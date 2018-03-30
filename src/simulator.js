const G = 6.67408e-11

export class Entity {
  constructor (name, x, y, vx, vy, mass) {
    this.name = name
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

export class World {
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

        e1.accelerate(dt, -fx, -fy)
        e2.accelerate(dt, fx, fy)
      }
    }

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].step(dt)
    }
  }
}
