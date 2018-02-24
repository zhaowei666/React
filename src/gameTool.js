import React from 'react';
import {MyHeader} from './base';
import 'bootstrap/dist/css/bootstrap.css';


export default class GameTool extends React.Component{

  componentWillMount() {
    document.title = 'Card Game Tool from Zhaowei'
  };

  render() {
    return (
      <div>
        <MyHeader />
        <RoomCreater />
        <CharacterCheck />
      </div>
    )
  }

}

class RoomCreater extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      characters: {},
      room: '',
      character: ''
    };
    this.formOnChange = this.formOnChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.render = this.render.bind(this);
  }
  submitForm() {
    const characters = JSON.stringify(this.state.characters);
    const url = "http://ec2-18-219-184-27.us-east-2.compute.amazonaws.com/game_tool/create_room?characters=" + characters;
    fetch((url), {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          room: res.room
        });
      })
      .catch((error) => {
        document.write(error);
      })

  }
  renderCharacterInput(character) {
    return (
      <CharacterInput
        value={character}
        onChange={(target) => this.formOnChange(target)}
      />
    )
  }
  formOnChange({target}) {
    let characters = this.state.characters;
    characters[target.name] = target.value;
    this.setState ({
      characters: characters
    });
  }

  render() {
    const room = this.state.room;
    let roomMessage;
    if (room) {
      roomMessage = "You room has been created successfully. The room number is " + room + ".";
    } else {
      roomMessage = "Type number of each character and create a room"
    }
    return (
      <div class="container">
        <div class="breadcrumb">
          <div><h4>{roomMessage}</h4></div>
          <div class="m-4">
            <h4>WereWolf</h4>
            <form>
              {this.renderCharacterInput('Moderator')}
              {this.renderCharacterInput('Seer')}
              {this.renderCharacterInput('Witch')}
              {this.renderCharacterInput('Hunter')}
              {this.renderCharacterInput('Savior')}
              {this.renderCharacterInput('Idiot')}
              {this.renderCharacterInput('Werewolf King')}
              {this.renderCharacterInput('Villager')}
              {this.renderCharacterInput('Werewolf')}
            </form>
          </div>
          <div class="m-4">
            <h4>Avalon</h4>
            <form>
              {this.renderCharacterInput('Merlin')}
              {this.renderCharacterInput('Morgana')}
              {this.renderCharacterInput('Percival')}
              {this.renderCharacterInput('Assassin')}
              {this.renderCharacterInput('Oberon')}
              {this.renderCharacterInput('Mordred')}
              {this.renderCharacterInput('Loyal Servant of Arthur')}
              {this.renderCharacterInput('Minion of Mordred')}
              <input type="button" class="btn btn-block btn-lg btn-primary" value="Create Room" onClick={() => this.submitForm()} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function CharacterInput(props) {
  return (
    <label class="m-2">{props.value}
      <input type="queryText" name={props.value} onChange={props.onChange} />
    </label>
  );
}


class CharacterCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      card: '',
      status: 0
    };
    this.roomOnChane = this.roomOnChane.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.submitCheck = this.submitCheck.bind(this);
  }

  nameOnChange({target}) {
    this.setState({
      name: target.value
    });
  }

  roomOnChane({target}) {
    this.setState({
      room: target.value
    });
  }
  submitCheck() {
    const room = this.state.room;
    const name = this.state.name;
    const url = "http://ec2-18-219-184-27.us-east-2.compute.amazonaws.com/game_tool/draw_character?name=" + name + "&room=" + room;
    fetch((url), {
      method: "GET"
    })
      .then(res => {
        this.setState({
          status: res.status
        });
        return res.json();
      })
      .then(res => {
        this.setState({
          card: res.character,
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    const card = this.state.card;
    const status = this.state.status;
    let cardMessage = "If your friend has already created a room. Enter the room number and your nickname to draw a car.If you have drew a card, you can also enter the room number and nickname to track it";
    if (status === 202) {
      cardMessage = "Sorry! No cards left in the pool";
    } else if (status === 201) {
      if (card) {
        cardMessage = "You are " + card + " in this game! Good Luck";
      }
    } else if (status === 200) {
      if (card) {
        cardMessage = "You drew a card before. You are " + card + ".";
      }
    }
    return (
      <div class="container">
        <div class="breadcrumb">
          <div>
            <h5>{cardMessage}</h5>
          </div>
          <div class="m-4">
            <label class="ml-4">Nick Name
              <input type="queryText" placeholder="Enter your nickname" onChange={(target) => this.nameOnChange(target)} />
            </label>
          </div>
          <div class="m-4">
            <label class="ml-4">Room Number
              <input type="queryText" placeholder="Enter room number" onChange={(target) => this.roomOnChane(target)} />
            </label>
          </div>
          <input type="button" class="btn btn-block btn-lg btn-primary" value="See your card" onClick={this.submitCheck} />
        </div>
      </div>
    )
  }
}
