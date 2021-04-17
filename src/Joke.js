import React, {Component} from 'react';
import axios from 'axios';
import List from './List';

const API_URL = "https://icanhazdadjoke.com/";
const header = {"Accept" : 'application/json'};

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes : []
        }
        this.countVoteDown = this.countVoteDown.bind(this);
        this.countVoteUp = this.countVoteUp.bind(this);
    }

    async componentDidMount() {
        for(let i=0; i<10; i++) {
            let response = await axios.get(API_URL, {headers : header});
            // if(response.data.id !== this.state.jokes[i-1].id) {
                this.setState( st => (
                    {jokes : [...st.jokes, {joke : response.data.joke, id : response.data.id, score : 0}]}
                ))
            // }

        }
    }

    countVoteUp(id) {
        for(let i=0; i<10; i++) {
            if(this.state.jokes[i].id === id) {
                console.log(this.state.jokes[i]);
                // this.setState({ jokes : [...this.state.jokes, {this.state.jokes[i].score : score++}]});
            }
        }

    }

    countVoteDown(id) {
        this.setState( st => {
            if(st.id === id) {
                st.score--;
            }
        });
    }

    render() {
        const jokeDisplay = this.state.jokes.map(j => 
            <List joke = {j.joke} key = {j.id} id = {j.id} voteUp = {this.countVoteUp} voteDown = {this.countVoteDown} />
        )

        return(
            <div>
                <h1>Dad Jokes!</h1>
                <ul>{jokeDisplay}</ul>
            </div>


        )
    }
}

export default Joke;