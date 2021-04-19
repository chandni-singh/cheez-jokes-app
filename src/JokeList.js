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
        // this.countVoteDown = this.countVoteDown.bind(this);
        // this.countVoteUp = this.countVoteUp.bind(this);
    }

    async componentDidMount() {
        let jokes = [];

        while(jokes.length < this.props.numJokes) {
            let response = await axios.get(API_URL, {headers : header});
            // if(response.data.id !== this.state.jokes[i-1].id) {
                jokes.push({ text : response.data.joke, votes : 0});
                // this.setState( st => (
                //     {jokes : [...st.jokes, {joke : response.data.joke, id : response.data.id, score : 0}]}
                // ))
            // }
        }
        this.setState({jokes : jokes})
    }

    // countVoteUp(id) {
    //     for(let i=0; i<10; i++) {
    //         if(this.state.jokes[i].id === id) {
    //             console.log(this.state.jokes[i]);
    //             this.setState( st => (
    //                 {jokes : [...st.jokes, {score : score++}]}
    //             ))
    //         }
    //     }

    // }

    // countVoteDown(id) {
    //     this.setState( st => {
    //         if(st.id === id) {
    //             st.score--;
    //         }
    //     });
    // }

    render() {
        // const jokeDisplay = this.state.jokes.map(j => 
        //     <List joke = {j.joke} key = {j.id} id = {j.id} voteUp = {this.countVoteUp} voteDown = {this.countVoteDown} />
        // )

        return(
            <div className = "JokeList">
                <div className = "JokeList-sidebar">
                    <h1 className = "JokeList-title"><span>Dad</span> Jokes!</h1>
                    <img src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/face-with-tears-of-joy_1f602.png"></img>
                    <button className = "JokeList-getMore">Get more Jokes!</button>
                </div>

                <div className = "JokeList-jokes">
                    {this.state.jokes.map(j => <Jokes text = {j.text} votes = {j.votes} />)}
                </div>
                {/* <ul>{jokeDisplay}</ul> */}
            </div>


        )
    }
}

export default JokeList;