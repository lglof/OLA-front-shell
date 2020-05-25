import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: null,
    inputValue: '',
    numberValue: 0,
    queryName: 'Lars',
    queryDue: '',
    queryId: '',
    queryResponse: ''
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  //backend querying
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  postData = async () => {
    console.log('sending!');
    var bod = {
      name: this.state.inputValue,
    }
    await fetch(`/insert_entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bod)
    });
  };
  deleteData = async () => {
    console.log('sending!');
    var bod = {
      id: this.state.numberValue
    }
    await fetch(`/delete_entry`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bod)
    });
  };
  queryData = async () => {
    const data = new Map([
      ['name', this.state.queryName],
      ['due', this.state.queryDue],
      ['id', this.state.queryId]
    ]);
    let url = `/query/?`;
    for (const [key, variable] of data) {
      url += variable.length ? `&${key}=${variable}` : '';
    };
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          queryResponse: JSON.stringify(data)
        });
      });

  }

  // component updating
  updateInputValue = async (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };
  updateNumberValue = async (event) => {
    this.setState({
      numberValue: event.target.value
    });
  };
  updateNameQueryData = async (event) => {
    this.setState({
      queryName: event.target.value
    });
  };
  updateDueQueryData = async (event) => {
    this.setState({
      queryDue: event.target.value
    });
  };
  updateIdQueryData = async (event) => {
    this.setState({
      queryId: event.target.value
    });
  };
  render() {
    return (
      <div className="App">
        <p className="app-intro">{this.state.data || "turn the server on"}</p>
        <h2>Adding a record</h2>
        <input value={this.state.inputValue} onChange={this.updateInputValue} />
        <button onClick={this.postData}>CLICK TO ADD A RECORD FOR {this.state.inputValue}</button>
        <br /> <br />
        <h2>Deleting a record</h2>
        <input value={this.state.numberValue} onChange={this.updateNumberValue} type="number" />
        <button onClick={this.deleteData}>CLICK TO DELETE RECORD NUMBER {this.state.numberValue}!</button>
        <br /> <br />
        <h2>Querying Records</h2>
        <label >Name:</label>
        <input id="name" value={this.state.queryName} onChange={this.updateNameQueryData} />
        <br />
        <label >Due Date:</label>
        <input id="due" value={this.state.queryDue} onChange={this.updateDueQueryData} type="date" />
        <br />
        <label>Id:</label>
        <input id="id" value={this.state.queryId} onChange={this.updateIdQueryData} type="number" />
        <br />
        <button onClick={this.queryData}>Click here to query</button>
        <h3>Query Response</h3>
        <p>{this.state.queryResponse}</p>
      </div>
    );
  }
}

export default App;
