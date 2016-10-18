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

 // Initialize Firebase
 const firebaseConfig = {
 };
 const firebaseApp = firebase.initializeApp(firebaseConfig);

class firebaseReactNativeLogin extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref('/items/');
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
          <ActionButton title="Add" onPress={this._addItem.bind(this)}/>
      </View>
    );
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {
        this.itemsRef.child(item._key).remove();
      } }/>
    );
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      ctr = 0;
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  _addItem() {
    this.itemsRef.push({ title:"Hiya2be"})
  }
}

AppRegistry.registerComponent('firebaseReactNativeLogin', () => firebaseReactNativeLogin);
