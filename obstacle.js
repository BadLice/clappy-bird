class Obstacle
{
  constructor()
  {
    this.w = 100;
    this.h = 130;
    this.x = width + this.w;
    this.y = random(this.h, height - this.h);
    this.speed = 3;
    this.counted = false;

    this.color = color(0, 255, 0)
  }

  draw()
  {
    push();
    fill(this.color);
    stroke(0);
    rect(this.x, -1, this.w, height - (height - this.y));
    rect(this.x, height - (height - this.y) + this.h + 1, this.w, (height - this.h - this.y));
    pop();
  }

  update()
  {
    for (var i = 0; i < this.speed; i++)
    {
      this.x--;
    }
  }
}