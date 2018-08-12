class Player
{
  constructor()
  {
    this.w = 20;
    this.canJump = true;
    this.started = false;
    this.dead = false;
    this.maxSpeed = 10;
    this.position = createVector(200, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.gravity = createVector(0, this.maxSpeed / 10);
    this.angle = radians(0);

    //microphone control
    this.mic = new p5.AudioIn();
    this.mic.start();
    this.triggerLevel = 30;

    this.color = color(255, 242, 0);

  }

  draw()
  {
    push();
    stroke(0);
    fill(this.color);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    beginShape(TRIANGLES);
    vertex(this.w, 0);
    vertex(-this.w, this.w);
    vertex(-this.w, -this.w);
    endShape(CLOSE);
    pop();

  }

  drawMicLevel()
  {
    //draw mic level
    fill(0);
    noStroke()
    rect(width - 50, height - this.getMicLevel(), 50, this.getMicLevel());
    stroke(255, 0, 0);
    line(width - 50, height - this.triggerLevel, width, height - this.triggerLevel)
  }

  update()
  {
    this.move();
    this.die();
  }

  die()
  {
    if (this.position.y >= height + this.w)
    {
      this.dead = true;
    }
  }

  getMicLevel()
  {
    return constrain(this.mic.getLevel() * 1000, 0, 100);
  }

  micTriggered()
  {
    return (this.getMicLevel() > this.triggerLevel);
  }

  move()
  {
    if (keyIsPressed || mouseIsPressed || this.micTriggered())
    {
      if (this.canJump)
      {
        if (keyCode == 32 || mouseIsPressed || this.micTriggered())
        {
          this.started = true;
          this.canJump = false;
          this.jump();
        }
      }
    }
    else
    {
      this.canJump = true;
    }

    if (this.started)
    {
      this.acceleration.add(this.gravity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(7);
      this.position.add(this.velocity);

      this.angle = map(this.velocity.y, -7, 7, radians(-45), radians(45));

      //limit the player at the top of the screen
      if (this.position.y < -this.w * 2)
      {
        this.position.y = -this.w * 2;
      }
    }
  }

  jump()
  {
    this.jumped = true;
    this.acceleration = createVector(0, -this.maxSpeed);
  }


}