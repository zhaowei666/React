import React from 'react';


export default class GameTool extends React.Component{
  render() {
    return (
      <div>
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
    const url = "http://127.0.0.1:8000/game_tool/create_room?characters=" + characters;
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
    }
    return (
      <div>
        <div><p>{roomMessage}</p></div>
        <form>
          {this.renderCharacterInput('Merlin')}
          {this.renderCharacterInput('Morgana')}
          {this.renderCharacterInput('Percival')}
          {this.renderCharacterInput('Assassin')}
          {this.renderCharacterInput('Oberon')}
          {this.renderCharacterInput('Mordred')}
          {this.renderCharacterInput('Loyal Servant')}
          {this.renderCharacterInput('Minion of Mordred')}
          <input type="button" value="Create Room" onClick={() => this.submitForm()} />
        </form>
      </div>
    )
  }
}

function CharacterInput(props) {
  return (
    <label>{props.value}
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
    const url = "http://127.0.0.1:8000/game_tool/draw_character?name=" + name + "&room=" + room;
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
    let cardMessage;
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
      <div>
        <div>
          <p>{cardMessage}</p>
        </div>
        <div>
          <label>Nick Name
            <input type="queryText" placeholder="Enter your nickname" onChange={(target) => this.nameOnChange(target)} />
          </label>
        </div>
        <div>
          <label>Room Number
            <input type="queryText" placeholder="Enter room number" onChange={(target) => this.roomOnChane(target)} />
          </label>
        </div>
        <input type="button" value="See your card" onClick={this.submitCheck} />
      </div>
    )
  }
}
