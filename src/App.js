import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

//randomize legos
function shuffleGame(item){
  for(let i = item.length - 1; i>0; i--){
    let j = Math.floor(Math.random()*(i+1));
    [item[i], item[j]] = [item[j], item[i]];
  }
  return item;
}

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    userClicks: [],
    userScore: 0,
    userIncorrect: "",
  };

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };

  handleClick = id => {
    const { userClicks } = this.state;
    if (userClicks.includes(id)) {
      this.increaseScore();
      this.setState({ userClicks: userClicks.concat(id) })
    } else {
      this.handleReset();
    };
  };

increaseScore = () => {
  const {userScore} = this.state;
  const updateScore = userScore + 1;
  this.setState({userScore: updateScore})
  if (userScore === 11) {
    this.setState({userIncorrect: "You Win!"})
  }
  this.shuffle();
}

handleReset = () => {
  const {topScore} = this.state;
  this.setState({
    score: 0,
    topScore,
    incorrect: "Try again!!",
    clicked: []
  })
  this.shuffle();
}


shuffle = () => {
  let shuffled = shuffleGame(friends);
  this.setState({friends: shuffled});
}


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Game</Title>

        {this.state.friends.map(friend => (
          <FriendCard
            // removeFriend={this.removeFriend}
            id={friend.id}
            // key={friend.id}
            // name={friend.name}
            image={friend.image}
            // occupation={friend.occupation}
            // location={friend.location}
            handleClick={this.handleClick}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
