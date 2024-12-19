export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.game.pause = !this.game.pause;
            if (this.game.energy > 0){
                if (e.key === 'Enter') this.game.energy--;
            }
        });

        window.addEventListener('keydown', e=> {
            if ((e.key === 'r' || e.key === 'к') && (this.game.lives === 0 || (this.game.score < this.game.winningScore && this.game.time > this.game.maxTime))) location.reload();
        });

        window.addEventListener('keydown', e => {
            if (e.key === ' ' && (this.game.lives > 0 && this.game.score >= this.game.winningScore && this.game.time > this.game.maxTime)) location.reload();
        });
    }
}