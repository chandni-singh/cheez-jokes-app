import React, {Component} from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);

        // this.handleClickUp = this.handleClickUp.bind(this);
        // this.handleClickDown = this.handleClickDown.bind(this);
        
    }

    // handleClickUp() {
    //     this.props.voteUp(this.props.id);
    // }

    // handleClickDown() {
    //     this.props.voteDown(this.props.id);
    // }
    
    render() {
        return (
            <div>
                <li className = "List">{this.props.joke}</li>
                    <button onClick = {this.handleClickUp}>Vote Up+</button>
                    <button onClick = {this.handleClickDown}>Vote Down-</button>
            </div>
            
        )
    }
}

export default Joke;