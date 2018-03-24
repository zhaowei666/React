import React from 'react';
import {MyHeader} from '../header/header';
import 'bootstrap/dist/css/bootstrap.css';
import './gameTool.css';
import {API_KEY} from '../const';


export default class CardDistributor extends React.Component{

  componentWillMount() {
    document.title = 'Card Game Tool from Zhaowei';
    document.body.style.backgroundColor = "#e6ecf0";
  };

  render() {
    return (
      <div>
        <MyHeader />
        <CharacterCheck />
        <RoomCreater />
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
    const characters = this.state.characters;
    let isNumber = true;
    const reg = /^\d$/;
    for (let key in characters) {
      if (! reg.test(characters[key])) {
        isNumber = false;
        break;
      }
    }
    if (!isNumber) {
      this.setState({
        error: 'Incorrect input format'
      });
      return
    }
    const charactersJson = JSON.stringify(characters);
    const url = "http://ec2-18-219-184-27.us-east-2.compute.amazonaws.com/game_tool/create_room?api_key="
      + API_KEY + "&characters=" + charactersJson;
    //const url = "http://127.0.0.1:8000/game_tool/create_room?characters=" + charactersJson;
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
    if (this.state.error) {
      roomMessage = this.state.error;
    } else {
      if (room) {
        roomMessage = "You room has been created successfully. The room number is " + room + ".";
      } else {
        roomMessage = <div>Create a room: <small>Type number of each character and create room.</small></div>
      }
    }
    return (
      <div className="container mt-4">
        <div><h5>{roomMessage}</h5></div>
        <div className="card">
          <div className="card-body">
            <h5 className="ml-4 mt-2 font-weight-bold">Werewolf</h5>
            <div className="form-inline">
              {this.renderCharacterInput('Moderator')}
              {this.renderCharacterInput('Seer')}
              {this.renderCharacterInput('Witch')}
              {this.renderCharacterInput('Hunter')}
              {this.renderCharacterInput('Savior')}
              {this.renderCharacterInput('Idiot')}
              {this.renderCharacterInput('Werewolf King')}
              {this.renderCharacterInput('Villager')}
              {this.renderCharacterInput('Werewolf')}
            </div>
            <h5 className="ml-4 mt-2 font-weight-bold">Avalon</h5>
            <div className="form-inline">
              {this.renderCharacterInput('Merlin')}
              {this.renderCharacterInput('Morgana')}
              {this.renderCharacterInput('Percival')}
              {this.renderCharacterInput('Assassin')}
              {this.renderCharacterInput('Oberon')}
              {this.renderCharacterInput('Mordred')}
              {this.renderCharacterInput('Loyal Servant of Arthur')}
              {this.renderCharacterInput('Minion of Mordred')}
            </div>
            <input type="button" className="btn btn-block btn-lg btn-my text-white mt-2" value="Create Room" onClick={() => this.submitForm()} />
          </div>
        </div>
      </div>
    )
  }
}

function CharacterInput(props) {
  return (
    /*
    <label class="m-2">{props.value}
      <input type="queryText" class="col-3" name={props.value} onChange={props.onChange} />
    </label>
    */
    <label className="form-control m-1">
      <a className="mr-1">{props.value}</a>
      <select name={props.value} onChange={props.onChange}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
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
    if (! name) {
      this.setState({
        error: 'Name cannot be empty'
      });
      return;
    }
    //const url = "http://127.0.0.1:8000/game_tool/draw_character?name=" + name + "&room=" + room;
    const url = "http://ec2-18-219-184-27.us-east-2.compute.amazonaws.com/game_tool/draw_character?api_key="
      + API_KEY + "&name=" + name + "&room=" + room;
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
        if (this.state.status === 202 && res.error) {
          this.setState({
            error: res.error
          });
        }
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
    let cardMessage = <div>Instructions: <small>If your friend has already created a room. Enter the room number and your nickname to draw a car.If you have drew a card, you can also enter the room number and nickname to track it.</small></div>;
    if (this.state.error) {
      cardMessage = this.state.error;
    }
    if (status === 201) {
      if (card) {
        cardMessage = <div><a>You are </a><a className="text-danger">{card}</a><a> in this game! Good Luck!</a></div>;
      }
    } else if (status === 200) {
      if (card) {
        cardMessage = <div>You drew a card before. You are <a className="text-danger">{card}</a>.</div>;
      }
    }
    let cardImage;
    if (card) {
      const cardImgUrl = "https://s3.us-east-2.amazonaws.com/zhaowei-storage/Werewolf/" + card + ".jpg";
      //document.write(cardImgUrl);
      cardImage = <div><img src={cardImgUrl} alt="Good Luck" className="img-thumbnail" /></div>;
    }
    return (
      <div className="container mt-4">
        <div>
          <h5>{cardMessage}</h5>
          {cardImage}
        </div>
        <div className="card">
          <div className="card-body">
          <div className="input-group m-1">
            <div className="input-group-prepend">
              <div className="input-group-text font-weight-bold">Nick Name</div>
            </div>
            <input type="text" placeholder="Enter your nickname" onChange={(target) => this.nameOnChange(target)} />
          </div>
          <div className="input-group m-1">
            <div className="input-group-prepend">
              <div className="input-group-text font-weight-bold">Room Number</div>
            </div>
            <input type="text" placeholder="Enter room number" onChange={(target) => this.roomOnChane(target)} />
          </div>
          <input type="button" className="btn btn-block btn-lg m-2 btn-my text-white" value="See your card" onClick={this.submitCheck} />
          </div>
        </div>
      </div>
    )
  }
}
