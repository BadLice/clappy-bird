var game;

function setup()
{
  game = new Game();
}

function draw()
{
  game.update();
  game.draw();

}