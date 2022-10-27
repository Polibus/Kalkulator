import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonStyle from './ButtonStyle';

const buttons = [
  ['AC', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false,
    };
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <ButtonStyle
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this, buttonItems)}
            key={'btn-' + buttonIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={'row-' + index}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  }

  handleInput = input => {
    const {displayValue, operator, firstValue, secondValue, nextValue} =
      this.state;

    switch (input) {
      case 'AC':
        this.setState(this.initialState);
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;
      case '.':
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;

      case '=':
        let formatOperator =
          operator === '*' ? '*' : operator === '/' ? '/' : operator;
        // eslint-disable-next-line no-eval
        let result = eval(firstValue + formatOperator + secondValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(3),
          firstValue: result % 1 === 0 ? result : result.toFixed(3),
          secondValue: '',
          operator: null,
          nextValue: false,
        });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
        </View>

        <View style={styles.inputContainer}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  result: {
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'white',
  },
  inputContainer: {
    backgroundColor: 'red',
    flex: 8,
  },
  resultText: {
    padding: 10,
    fontSize: 100,
    color: 'red',
    textAlign: 'right',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
