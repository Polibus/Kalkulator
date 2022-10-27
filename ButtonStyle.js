import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class ButtonStyle extends Component {
  render() {
    const {value, handleOnPress} = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleOnPress(value)}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 26,
  },
});

export default ButtonStyle;
