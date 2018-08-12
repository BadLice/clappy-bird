class Game
{
  constructor()
  {
    createCanvas(800, 800);
    this.player = new Player();
    this.obs = [];
    this.cycles = 0;
    this.obstacleRate = 150;
    this.score = 0;

    this.triggerSlider = createSlider(1, 100, 30);
    this.triggerSlider.position(10, height - 20);
  }

  reset()
  {
    this.player = new Player();
    this.obs = [];
    this.cycles = 0;
    this.obstacleRate = 150;
    this.score = 0;
  }

  draw()
  {
    background(0, 237, 255);

    this.player.draw();
    for (var o of this.obs)
    {
      o.draw();
    }
    fill(255);

    if (this.player.dead)
    {
      this.drawScore();
    }
    else
    {
      textSize(36);
      textFont('Helvetica');
      text(this.score, width / 2, height / 2 - height / 4);
      if (!this.player.started)
      {
        text("Space, mouse or clap your hands to jump", width / 2 - 345, height / 2 - height / 4 + 35);
      }
    }
    this.player.drawMicLevel();
  }

  drawScore()
  {
    text("YOUR SCORE: " + this.score, width / 2 - 120, height / 2 - 50);
    text("Press a key or clap your hands to restart ", width / 2 - 300, height / 2 - 50 + 35);
  }

  update()
  {
    this.updateTriggerLevel();
    if (!this.player.dead)
    {
      this.player.update();
      for (var o of this.obs)
      {
        o.update();
      }

      if (this.player.started)
        this.manageObstacles();

      this.collision();

      this.updateScore();

    }
    else
    {
      if (keyIsPressed || mouseIsPressed || this.player.micTriggered())
        this.reset();
    }
  }

  updateScore()
  {
    for (var o of this.obs)
    {
      if (!o.counted)
      {
        if (o.x < this.player.position.x)
        {
          this.score++;
          o.counted = true;
        }
      }
    }
  }

  updateTriggerLevel()
  {
    this.player.triggerLevel = this.triggerSlider.value();
  }

  manageObstacles()
  {
    if (this.obs.length <= 0)
    {
      this.obs.push(new Obstacle());
    }
    else
    {

      this.cycles++;

      var newObs = [];
      for (var o of this.obs)
      {
        if (o.x + o.w > 0)
        {
          newObs.push(o);
        }
      }

      if ((this.cycles % this.obstacleRate) == 0)
        newObs.push(new Obstacle());

      this.obs = newObs;
    }
  }

  collision()
  {
    for (var o of this.obs)
    {
      if (this.player.position.x >= o.x && this.player.position.x <= o.x + o.w)
        if (this.player.position.y <= o.y || this.player.position.y >= o.y + o.h)
          this.player.dead = true;
    }
  }
}