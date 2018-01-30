import React, { Component } from 'react';
import DragItem from './DragItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DragContainer extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyRows = this.renderEmptyRows.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  renderItem(data) {
    return  <DragItem key={data.id} data={data} />
  }

  renderEmptyRows() {
    let containerRows = [];
    for( let i = 0; i < 4; i++) {
      containerRows.push(<div className='drag_row' key={`empty_${i}`}></div>)
    }
    return containerRows;
  }

  renderRows(ticketsData) {
    let containerRows = [];

    const getListLength = () => (
      ticketsData.length > 1
        ? ticketsData.reduce((a, b) => a.position > b.position ? a.position : b.position )
        : ticketsData[0].position
    )
    const listLength = getListLength()

    for (let i = 0; i <= listLength ; i++) {
      let result = ticketsData.some((data, index) => {
        if(i === data.position) {
          return containerRows.push(this.renderItem(data))
        }
      })

      if (result) {
        continue
      } else {
        containerRows.push(<div className='drag_row' key={`empty_${i}`}></div>)
      }
    }
    return containerRows;
  }

  render() {
    const { ticketsData, columnNumber } = this.props;

    return (
      <div className="DragContainer">
        <h3>{`column № ${columnNumber}`}</h3>
        {
          ticketsData && ticketsData.length
          ? this.renderRows(ticketsData)
          : this.renderEmptyRows()
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DragContainer);
// export default DragContainer;
