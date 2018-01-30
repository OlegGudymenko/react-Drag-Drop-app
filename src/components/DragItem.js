import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants';

const dragItemSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DragItem extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    const { id, name, description } = this.props.data;

      return connectDragSource(
        <div className='drag_item'>
          <Panel className={isDragging ? 'isDragging' : ''}>
            <Panel.Heading>
              <span>Id: {id}</span>
              <span>Card name: {name}</span>
            </Panel.Heading>
            <Panel.Body>{description}</Panel.Body>
          </Panel>
        </div>
      )
    }
}

DragItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

DragItem.defaultProps = {
  name: 'Some ticket',
  description: 'Test ticket description'
};

export default DragSource(ItemTypes.DRAG_ITEM, dragItemSource, collect)(DragItem);
