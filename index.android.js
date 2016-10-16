/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, {Component} from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ListView
 } from 'react-native';
 import * as firebase from 'firebase';
 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const styles = require('./styles.js');


class firebaseReactNativeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview} />
        <ActionButton title="Add" onpress={() => { } } />
      </View>
    );
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onpress={() => { } }/>
    );
  }
}

AppRegistry.registerComponent('firebaseReactNativeLogin', () => firebaseReactNativeLogin);
