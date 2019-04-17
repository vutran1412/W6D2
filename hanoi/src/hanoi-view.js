const HanoiGame = require('./game.js');

class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.clickTower();
  }

  setupTowers() {
    const $ul = $('<ul>');
    for (let i = 0; i < 3; i++) {
      const $li = $('<li>');
      $li.attr("id", "stack");
      $li.addClass("stack");
      $li.data("idx", i);
      $ul.append($li);
    }

    this.$el.append($ul);
  }

  render() {
    const game = this.game;
    $('li').each( function(index) {
      $(this).children().remove();
      const currentTower = game.towers[index];
      currentTower.forEach( (diskSize) => {
        const $disk = $('<div>');
        $disk.addClass(`disk-${diskSize}`);
        $(this).append($disk);
      });
    });
  }

  clickTower() {
    let won = this.game.isWon();
    if (!won) {
      this.$el.on("click", "#stack", (e) => {
        const $stack = $(e.currentTarget);
  
        let $selectedStack = undefined;
        let selectedIdx = undefined;
        $('li').each( function(index) {
          if ($(this).attr("class").includes("selected")) {
            $selectedStack = $(this);
            selectedIdx = index;
          }
        })
  
        if (selectedIdx === undefined) {
          $stack.addClass("selected");
        } else {
          const status = this.game.move(selectedIdx, $stack.data("idx"));
  
          if (status) {
            this.render();
            if (this.game.isWon()) {
              alert("Congrats, you won!");
            }
          } else {
            alert("Invalid move.");
          }
        }
        if ($selectedStack !== undefined) {
          $selectedStack.removeClass("selected");
        }
      })
    }
  }
}

module.exports = HanoiView;