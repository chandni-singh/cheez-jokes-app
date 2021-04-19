import React, {Component} from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

const API_URL = "https://icanhazdadjoke.com/";
const header = {"Accept" : 'application/json'};

class JokeList extends Component {
    static defaultProps = {
        numJokes : 10
    }

    constructor(props) {
        super(props);
        this.state = {
            jokes : []
        }
    }

    async componentDidMount() {
        let jokes = [];

        while(jokes.length < this.props.numJokes) {
            let response = await axios.get(API_URL, {headers : header});
                
            jokes.push({ text : response.data.joke, id : response.data.id, votes : 0});
        }
        
        this.setState({jokes : jokes})
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes : this.state.jokes.map(j =>
                j.id === id ? {...j, votes: j.votes+delta} : j)
        }));
    }

    render() {

        return(
            <div className = "JokeList">

                <div className = "JokeList-sidebar">
                    <h1 className = "JokeList-title"><span>Dad</span> Jokes!</h1>
                    <img src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/face-with-tears-of-joy_1f602.png"></img>
                    <button className = "JokeList-getMore">Get more Jokes!</button>
                </div>

                <div className = "JokeList-jokes">
                    {this.state.jokes.map(j => 
                    <Joke text = {j.text} 
                          key = {j.id} 
                          votes = {j.votes}
                          upVote = {() => this.handleVote(j.id, 1)}
                          downVote = {() => this.handleVote(j.id, -1)}
                    />)}
                </div>

            </div>


        )
    }
}

export default JokeList;