import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragItem from './DragItem';
import { ItemTypes } from '../constants';
import { DropTarget } from 'react-dnd';

const dragTarget = {
  drop(props) {
    console.log(props, 'drag props')
    props.handleDrag(props.positionY, props.column);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isHover: monitor.isOver({ shallow: true })
  };
}

class DragCell extends Component {

  render(){
    const { i, handleDrag, isHover, connectDropTarget, isOver, isAdding } = this.props;
    const getClassName = () => {
      let name = isHover ? 'is_hover' : ''
        name = `${name} ${isAdding ? 'adding_block' : ''}`
      return name
    }
    return connectDropTarget(
      <div className={`drag_row ${getClassName()}`} key={`empty_${i}`}>
        {this.props.children}
      </div>
    )
  }
}

DragCell.propTypes = {
  column: PropTypes.number.isRequired,
  positionY: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.DRAG_ITEM, dragTarget, collect)(DragCell);
