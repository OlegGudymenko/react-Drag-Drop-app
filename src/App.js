import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Row, Col, Grid } from 'react-bootstrap';
import DragItem from './components/DragItem';
import DragContainer from './components/DragContainer';
import CardForm from './components/CardForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);

    this.state = {
      ticketsData: [
        {
          column: 1,
          list: [
            {
              id: 1,
              name: 'ticket 1',
              description: 'lalalal',
              position: 1,
            },
            {
              id: 2,
              name: 'ticket 2',
              description: 'lalalal 222',
              position: 0,
            },
            {
              id: 3,
              name: 'ticket 4',
              description: 'lalalal 4',
              position: 3,
            }
          ]
        },
        {
          column: 3,
          list: [
            {
              id: 33,
              name: 'ticket 1222',
              description: 'lalalal',
              position: 2,
            },
            {
              id: 34,
              name: 'ticket 2',
              description: 'lalalal 222',
              position: 1,
            },
            {
              id: 99,
              name: 'ticket 4',
              description: 'lalalal 4',
              position: 4,
            },
            {
              id: 345,
              name: 'ticket 4',
              description: 'position 5',
              position: 5,
            }
          ]
        }
      ]
    };

    this.renderColumn = this.renderColumn.bind(this);
    this.changeCardColumn = this.changeCardColumn.bind(this);
  }

  renderColumn(ticketsData) {

    return ticketsData.map((dataItem) => (
      <DragContainer key={dataItem.column}
                     ticketsData={dataItem.list.sort((a, b) => a.position - b.position )}
                     columnNumber={dataItem.column}/>
    )).sort((a, b) => a.column - b.column )
  }

  changeCardColumn(cardId, targetColumn, position) {
    let newState = [...this.state.ticketsData];
    let selectedItem = {};

    newState = newState.map((item) => {
      let newList = item.list.filter((listItem) => {
        if(listItem.id !== cardId) {
          return listItem
        } else {
          selectedItem = { ...listItem }
        }
      })
      item.list = [...newList]
      return item;
    })

    newState = newState.map((item) => {
      if(item.column === targetColumn) {
        selectedItem.position = position;
        item.list.push(selectedItem)
      }
      return item;
    })

    this.setState({
      ticketsData: [...newState]
    })
  }

  render() {
  const { ticketsData } = this.state;
    console.log(this.state, 'state updated')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React Drag and Drop task manager</h1>
        </header>
        <Grid fluid>
          <CardForm changeCardColumn={this.changeCardColumn}/>
          <div className='column_container'>
            {
              ticketsData.length
              ? this.renderColumn(ticketsData)
              : <DragContainer columnNumber={1}/>
            }
          </div>
        </Grid>
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
// export default App;
