import React from 'react';
import Buttons from './Buttons';
import Grid from './Grid';

class Main extends React.Component{

    constructor(){
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        this.state = {
            generation:0,
            gridFull: Array(this.rows).fill().map( () => Array(this.cols).fill(false) )
        }
        this.selectBox = this.selectBox.bind(this);
        this.play = this.play.bind(this);
    }
    
    selectBox(row, col){
        let gridCopy = [...this.state.gridFull];
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
            gridFull: gridCopy
        });
    }

    componentDidMount(){
        this.seed();
        this.playButton();
    }
    
    seed = () => {
        let gridCopy = [...this.state.gridFull];

        for( let i=0; i< this.rows; i++){
            for( let j=0; j< this.cols; j++){
                let rand = Math.floor(Math.random()*4)+1;
                if( rand === 1 ){
                    gridCopy[i][j] = true;
                }
            }
        }

        this.setState({
            gridFull: gridCopy
        });
    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    pause = () => {
        clearInterval(this.intervalId);
    }

    clear = () => {
        clearInterval(this.intervalId);
       
        this.setState({
            generation:0,
            gridFull: Array(this.rows).fill().map( () => Array(this.cols).fill(false) )            
        });
    }

    slow = () => {
        this.speed = this.speed + 50;
        this.playButton();
    }

    fast = () => {
        this.speed = this.speed - 50;
        this.playButton();
    }

    play(){
        let g = this.state.gridFull;
        let g2 = [...g];

        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;

                if (g[i][j] && (count < 2 || count > 3)) 
                    g2[i][j] = false;
                if (!g[i][j] && count === 3) 
                    g2[i][j] = true;
            }
        }

        this.setState({
            generation: this.state.generation+1,
            gridFull: g2
        })
    }

    gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
			break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();
	}


    render(){
        return (
            <div>
                <h1> Game-Of-Life </h1>
                <Buttons
                    play={this.playButton}
                    pause={this.pause}
                    clear={this.clear}
                    slow={this.slow}
                    fast={this.fast}
                    seed={this.seed}
                    gridSize={this.gridSize}
                >
                </Buttons>
                <Grid 
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h3> Generation: {this.state.generation}</h3>
            </div>
        );
    }
}


export default Main;