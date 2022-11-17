import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import ButtonStyle from './ButtonStyle';
import SplashScreen from 'react-native-splash-screen';

const buttonsVertical = [
  ['AC', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const buttonsHorizontal = [
  ['sqrt', 'x!', 'AC', ' ', ' ', '/'],
  ['e^x', '10^x', '7', '8', '9', '*'],
  ['ln', 'log10', '4', '5', '6', '-'],
  ['e', 'x^2', '1', '2', '3', '+'],
  ['pi', 'x^3', '0', ' ', '.', '='],
];

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: '0',
      operator: null,
      orientation: 'portrait',
    };
    this.state = this.initialState;

    Dimensions.addEventListener('change', () => {
      const {width, height} = Dimensions.get('window');
      let orientation = width > height ? 'horizontal' : 'portrait';
      this.setState({orientation: orientation});
    });
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  renderButtonsVertical() {
    return buttonsVertical.map((buttonRows, index) => {
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
  }

  renderButtonsHorizontal() {
    return buttonsHorizontal.map((buttonRows, index) => {
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
  }

  handleInput = input => {
    const {displayValue, operator} = this.state;

    switch (input) {
      case 'AC':
        this.setState({
          displayValue: '0',
          operator: null,
        });
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
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length)
              : displayValue) + input,
        });
        break;
      case '.':
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        });
        break;
      case 'sqrt':
        this.setState({
          displayValue: displayValue + 'sqrt',
        });
        break;
      case 'x!':
        let res = 1;
        for (let i = 1; i <= displayValue; i++) {
          res = res * i;
        }
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + '!',
        });
        break;
      case 'e^x':
        let resEp = Math.pow(2.71, displayValue).toFixed(3);
        this.setState({
          displayValue: displayValue === '0' ? input : resEp,
        });
        break;
      case '10^x':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + '^10',
        });
        break;
      case 'ln':
        this.setState({
          displayValue: displayValue + 'ln',
        });
        break;
      case 'log10':
        this.setState({
          displayValue: displayValue + 'log10',
        });
        break;
      case 'e':
        input = 2.71;
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        break;
      case 'x^2':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + '^2',
        });
        break;
      case 'pi':
        input = 3.14;
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        break;
      case 'x^3':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + '^3',
        });
        break;
      case '=':
        // eslint-disable-next-line no-eval
        const result = eval(displayValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(3),
        });
        break;
    }
  };

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}>
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.displayValue}</Text>
          </View>
          <View style={styles.inputContainer}>
            {this.renderButtonsVertical()}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.displayValue}</Text>
          </View>
          <View style={styles.inputContainer}>
            {this.renderButtonsHorizontal()}
          </View>
        </View>
      );
    }
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
