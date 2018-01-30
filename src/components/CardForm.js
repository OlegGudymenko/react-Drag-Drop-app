import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class CardForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        cardId: '',
        targetColumn: '',
        position: 0
    };

    this.selectCardId = this.selectCardId.bind(this);
    this.selectColumnNumber = this.selectColumnNumber.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.selectPosition = this.selectPosition.bind(this);
  }


  selectCardId(e) {
    this.setState({ cardId: e.target.value });
  }

  selectColumnNumber(e) {
    this.setState({ targetColumn: e.target.value });
  }
  selectPosition(e) {
    this.setState({ position: e.target.value });
  }

  submitForm(e){
    e.preventDefault();
    const { cardId, targetColumn, position } = this.state;

    this.props.changeCardColumn(parseInt(cardId), parseInt(targetColumn), parseInt(position));

    this.setState({
      cardId: '',
      targetColumn: '',
      position: 0
    })
  }
  render() {
    return (
      <form className='card_form'>
        <FormGroup
          controlId="formBasicId">
          <ControlLabel>Select a card Id</ControlLabel>
          <FormControl
            type="text"
            value={this.state.cardId}
            placeholder="card id"
            onChange={this.selectCardId}
          />
        </FormGroup>{' '}
        <FormGroup
          controlId="formBasicColumn">
          <ControlLabel>Target column</ControlLabel>
          <FormControl
            type="text"
            value={this.state.targetColumn}
            placeholder="column number"
            onChange={this.selectColumnNumber}
          />
        </FormGroup>{' '}
        <FormGroup
          controlId="formBasicColumn">
          <ControlLabel>Column position</ControlLabel>
          <FormControl
            type="text"
            value={this.state.position}
            placeholder="position"
            onChange={this.selectPosition}
          />
        </FormGroup>{' '}
        <Button type="submit" onClick={this.submitForm}>Move card</Button>
      </form>
    );
  }
}

export default CardForm;
