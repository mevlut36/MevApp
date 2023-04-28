import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as math from 'mathjs';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousResult, setPreviousResult] = useState('');

  const handleButtonPress = (value) => {
    if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleEqualsPress = () => {
    try {
      const result = math.evaluate(displayValue);
      setPreviousResult(displayValue + ' = ' + result.toString());
      setDisplayValue(result.toString());
    } catch (error) {
      setPreviousResult('');
      setDisplayValue('error');
    }
  };

  const handleClearPress = () => {
    setDisplayValue('0');
  };

  return (
    <View style={styles.container}>
        <View style={styles.result}>
            <Text style={styles.displayText}>{previousResult}</Text>
        </View>
        <View style={styles.display}>
            <Text style={styles.displayText}>{displayValue}</Text>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('(')}>
                <Text style={styles.buttonText}>(</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(')')}>
                <Text style={styles.buttonText}>)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('^')}>
                <Text style={styles.buttonText}>^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleClearPress()}>
                <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
                <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
                <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
                <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleButtonPress('*')}>
                <Text style={styles.buttonTextOperator}>*</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
                <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
                <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
                <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleButtonPress('/')}>
                <Text style={styles.buttonTextOperator}>/</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
                <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
                <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
                <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleButtonPress('+')}>
                <Text style={styles.buttonTextOperator}>+</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
                <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleButtonPress('.')}>
                <Text style={styles.buttonTextOperator}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleEqualsPress()}>
                <Text style={styles.buttonTextOperator}>=</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => handleButtonPress('-')}>
                <Text style={styles.buttonTextOperator}>-</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'flex-end',
    },
    display: {
      alignItems: 'flex-end',
      padding: 20,
    },
    displayText: {
      fontSize: 30,
      padding: 20,
    },
    resultText: {
        padding: 20,
    },
    row: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EFEFEF',
      paddingVertical: 25,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
      margin: 5,
    },
    buttonOperator: {
        backgroundColor: '#4b5dfe',
    },
    buttonText: {
      fontSize: 25,
    },
    buttonTextOperator: {
        fontSize: 25,
        color: '#fff',
      },
  });
  