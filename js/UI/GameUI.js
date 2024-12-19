export class GameUI {
    constructor() {
        this.gameStarted = false;
        this.elements = {};
    }

    // Функция для изменения display у кнопок
    changeButtonDisplay(buttonId, display) {
       const element = this.elements[buttonId] ?? document.getElementById(buttonId);
       if(element)
       {
         element.style.display = display;
       }
       this.elements[buttonId] = element;
    }

    // Функция начала игры при нажатии на кнопку Начать игру
    start(startGame, soundPlay) {
       if (!this.gameStarted) {
           this.gameStarted = true;
           startGame();
           soundPlay();
            const elementsToHide = ['startButton', 'theHead', 'controls', 'author', 'controlsBtn', 'authorBtn'];
            elementsToHide.forEach(elementId => {
                this.changeButtonDisplay(elementId, "none");
            });
          this.changeButtonDisplay("main", "block");
       }
    }

    // Функция отображения управления при нажатии на кнопку Управление
    showControls() {
        const elementsToHide = ['theHead', 'controlsBtn', 'startButton', 'authorBtn','author'];
        elementsToHide.forEach(elementId => {
            this.changeButtonDisplay(elementId, "none");
        });
        this.changeButtonDisplay("controls", "block");
        this.changeButtonDisplay("backBtn", "block");
    }

    // Функция отображения описания автора при нажатии на кнопку Об авторе
    showAuthor() {
        const elementsToHide = ['theHead', 'controlsBtn', 'startButton', 'authorBtn'];
        elementsToHide.forEach(elementId => {
            this.changeButtonDisplay(elementId, "none");
        });
        this.changeButtonDisplay("author", "block");
        this.changeButtonDisplay("backBtn", "block");
    }

    // Функция возвращения из вкладки с управлением в главное меню по нажатию на кнопку Назад
    goBack() {
        const elementsToHide = ['backBtn', 'controls', 'author'];
        elementsToHide.forEach(elementId => {
            this.changeButtonDisplay(elementId, "none");
        });

        const elementsToShow = ['theHead', 'startButton', 'controlsBtn', 'authorBtn'];
        elementsToShow.forEach(elementId => {
            this.changeButtonDisplay(elementId, "block");
        });
    }
}