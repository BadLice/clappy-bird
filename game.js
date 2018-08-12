class Game
{
  constructor()
  {
    createCanvas(800, 800);
    this.player = new Player();
    this.obs = [];
    // this.obs.push(new Obstacle());
    this.cycles = 0;
    this.obstacleRate = 150;
    this.score = 0;

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
    }
  }

  drawScore()
  {
    text("YOUR SCORE: " + this.score, width / 2 - 120, height / 2 - 50);
    text("Press a key to restart ", width / 2 - 150, height / 2 - 50 + 35);
  }

  update()
  {
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
      if (keyIsPressed || mouseIsPressed)
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