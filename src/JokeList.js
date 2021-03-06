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
            jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]"), //Data shows even after refresh
            loading : false
        }

        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if(this.state.jokes.length === 0) {
            this.getJokes();
        }
    }

    async getJokes() {

        try{
            let jokes = [];

            while(jokes.length < this.props.numJokes) {
                let response = await axios.get(API_URL, {headers : header});
                
                let newJoke = response.data.joke; // to avoid duplication of jokes from API
                if(!this.seenJokes.has(newJoke)) {
                    jokes.push({ text : response.data.joke, id : response.data.id, votes : 0});
                }
            }
    
            this.setState(st => ({loading : false, jokes : [...st.jokes, ...jokes]}),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
        } 
        catch(err) {
            alert(err);
            this.setState({loading : false});
        }
    } 


    handleVote(id, delta) {
        this.setState(st => ({
            jokes : this.state.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes+delta} : j)
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    handleClick() {
        this.setState({loading : true}, this.getJokes);
    }

    render() {

        if(this.state.loading) {
            return (
                <div className = "JokeList-spinner">
                    <i className = "fas fa-8x fa-laugh fa-spin" />
                    <h1 className = "Jokelist-title">Loading...</h1>
                </div>
            )
        }

        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes); //sorting jokes by votes
        return (
            <div className = "JokeList">

                <div className = "JokeList-sidebar">
                    <h1 className = "JokeList-title"><span>Dad</span> Jokes!</h1>
                    <img src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/face-with-tears-of-joy_1f602.png"></img>
                    <button className = "JokeList-getMore" onClick = {this.handleClick}>New Jokes</button>
                </div>

                <div className = "JokeList-jokes">
                    {jokes.map(j => (
                    <Joke text = {j.text} 
                          key = {j.id} 
                          votes = {j.votes}
                          upVote = {() => this.handleVote(j.id, 1)}
                          downVote = {() => this.handleVote(j.id, -1)}
                    />))}
                </div>

            </div>


        )
    }
}

export default JokeList;