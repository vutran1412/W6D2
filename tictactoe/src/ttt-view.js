class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "#square", (e) => {
      const $square = $(e.currentTarget);
      if (!this.game.isOver()) {
        if ($square.attr("class").includes("unmarked")){
          this.makeMove($square);
        } else {
          alert('Invalid move!');
        }
  
        if (this.game.isOver()) {
          const $h1 = $('<h1>');
          const winner = this.game.winner();
          if (winner) {
            $h1.text(`You win, ${winner}!`);
            $('li').each( function(index){
              const owner = $(this).data("player");
              if (owner === winner) {
                $(this).addClass("winner");
              } else if ($(this).attr("class").includes("unmarked")){
                $(this).addClass("white");
                $(this).removeClass("unmarked");
              } else {
              $(this).addClass("loser");
              }
            });
          } else {
            $h1.text("It's a draw!");
            $(".mark").css("color", "red");
          }
          this.$el.append($h1);
        }
      }
    })
  }

  makeMove($square) {
    const pos = $square.data("pos");
    $square.addClass("white");
    $square.removeClass("unmarked");

    const $p = $("<p>");
    const player = this.game.currentPlayer;
    $p.text(player);
    $p.addClass("mark");
    $square.data("player", player);
    $square.append($p);

    this.game.playMove(pos);
  }

  setupBoard() {
    const $ul = $('<ul>');
    for (let i = 0; i < 9; i++) {
      const $square = $('<li>');
      $square.attr("id", "square");
      $square.addClass("unmarked");
      $square.data("pos", [Math.floor(i / 3), i % 3]);
      $ul.append($square);
    }
    this.$el.append($ul);
  }
}



module.exports = View;
