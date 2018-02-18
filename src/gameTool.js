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
      .then(res => {
        return res.json()
        }
      )
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
      roomMessage = "You room has been created successfully. The room number is" + room + ".";
    }
    const characters = JSON.stringify(this.state.characters);
    return (
      <div>
        <p>haha</p>
        <div>{room}</div>
        <div>{characters}</div>
        <p>hehe</p>
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
  render() {
    return (
      <div>

      </div>
    )
  }
}
