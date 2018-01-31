import React, { Component } from 'react';
import DragItem from './DragItem';
import DragCell from './DragCell';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DragContainer extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyRows = this.renderEmptyRows.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  renderItem(data) {
    return  <DragItem key={data.id}
                      selectCard={this.props.selectCard}
                      data={data}/>
  }
  handleDrag(position, targetColumn){
    this.props.changeCardColumn(position, targetColumn)
  }

  renderEmptyRows() {
    const containerRows = [];

    containerRows.push(<DragCell positionY={0}
                                 key={0}
                                 column={this.props.columnNumber}
                                 handleDrag={this.handleDrag}/>)
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
          return containerRows.push(
            <DragCell positionY={i}
                      key={i}
                      column={this.props.columnNumber}
                      handleDrag={this.handleDrag}>
              {this.renderItem(data)}
            </DragCell>
          )
        }

      })

    }
      containerRows.push(<DragCell positionY={listLength + 1}
                                   isAdding
                                   key={listLength + 1}
                                   column={this.props.columnNumber}
                                   handleDrag={this.handleDrag}/>)
    return containerRows;
  }

  render() {
    const { ticketsData, columnNumber } = this.props;

    return (
      <div className="DragContainer">
        <h3>{`column № ${columnNumber + 1}`}</h3>
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
