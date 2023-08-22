import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  FlatList,
  Linking,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import * as TrainingPart2 from './TrainingPart2';
import Header from './Header';
import NavigationComponent from './NavigationTutorial';
import LoginScreenComponent from './LoginScreenTutorial'
import AppWithReduxSQLite from './screens/ReduxWithSQLite/AppWithReduxSQLite';

function App(): JSX.Element {
  const [name, setName] = useState("John")
  const [session, setSession] = useState({number: 1, title: "title(1)"})
  const [current, setCurrent] = useState(true)

  const onClickHandler = () => {
    setName("Nathan")
    setSession({number: (session.number + 1), title: ("new title(" + (session.number + 1) + ")") })
    setCurrent(false)
  }

  return (
    <View style={styles.body}>
      <View style={styles.inner_body}>
        <Text style={styles.text}>My Name is {name}</Text>
        <Text style={styles.text}>The session number is {session.number} and title is {session.title}</Text>
        <Text style={styles.text}>{current ? "current session" : "next session"}</Text>
        <View style={styles.button}>
          <Button title='Change Name Above' onPress={onClickHandler}></Button>
        </View>
        <View style={styles.button}>
          <Button title='Random Button' onPress={() => {Linking.openURL("https://www.google.com")}}></Button>
        </View>
      </View>
    </View>
  );
}

function ScrollListComponent(): JSX.Element {
  const [listItems, setItems] = useState([
    {key: 1, item: "Item 1"},
    {key: 2, item: "Item 2"},
    {key: 3, item: "Item 3"},
    {key: 4, item: "Item 4"},
    {key: 5, item: "Item 5"},
    {key: 6, item: "Item 6"},
    {key: 7, item: "Item 7"},
    {key: 8, item: "Item 8"},
  ])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setItems([...listItems, {key: (listItems.length + 1), item: "Item " + (listItems.length + 1)}])
    setRefreshing(false)
  }

  return (
    <ScrollView 
      horizontal={false} 
      style={scrollListViewStyles.body}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ff00ff"]}
        />
      }
    >
    {
      listItems.map((i) => {
        return (
          <View style={scrollListViewStyles.item}>
          <Text style={scrollListViewStyles.text}>{i.key} | {i.item}</Text>
          </View>
        )
      }) 
    }
  </ScrollView>
  );
}

function FlatListComponent(): JSX.Element {
  //flat list only access key as a string
  const [listItems, setItems] = useState([
    {name: "Item 1"},
    {name: "Item 2"},
    {name: "Item 3"},
    {name: "Item 4"},
    {name: "Item 5"},
    {name: "Item 6"},
    {name: "Item 7"},
    {name: "Item 8"},
  ])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setItems([...listItems, {name: "Item " + (listItems.length + 1)}])
    setRefreshing(false)
  }

  return (
    <FlatList
      horizontal={false}
      inverted={false}
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
      data={listItems}
      renderItem={ ({item}) => (
        <View style={flatListComponentStyles.item}>
          <Text style={flatListComponentStyles.text}>{item.name}</Text>
        </View>
      )}
      refreshControl = {
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  )
}

function SectionListComponent(): JSX.Element {
  const [DATA, setDATA] = useState(
    [
      {
        title: "Title 1",
        data: ["Item 1-1", "Item 1-2", "Item 1-3"],
      },
    ]
  )

  const [refreshing, setRefreshing] = useState(false)
  const [sectionNumber, setSectionNumber] = useState(2)

  const onRefresh = () => {
    setRefreshing(false)
    setSectionNumber(sectionNumber + 1)
    setDATA([...DATA, {title: "Title " + sectionNumber.toString(), data: [`Item ${sectionNumber.toString()}-1`, `Item ${sectionNumber.toString()}-2`, `Item ${sectionNumber.toString()}-3`]}])
  }

  return (
    <SectionList
      style={{margin: 8}}
      keyExtractor={(item, index) => index.toString()}
      sections={DATA}
      renderItem={({item}) => (
        <View>
          <View style={sectionListComponentStyles.childItem}>
            <Text style={sectionListComponentStyles.text}>{item}</Text>
            <View style={sectionListComponentStyles.divider}/>
          </View>
          <View style={sectionListComponentStyles.divider}/>
        </View>
      )}
      renderSectionHeader={({section}) => (
        <View style={sectionListComponentStyles.sectionItem}>
          <Text style={sectionListComponentStyles.sectionText}> {section.title}</Text>
        </View>
      )}
      refreshControl = {
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ff99ff"]}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  //For app function
  body: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner_body: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    color: Colors.black,
    fontStyle: 'italic',
    fontSize: 20,
    margin: 10,
  },
  button: {
    margin: 10,
  },
}); 

const scrollListViewStyles = StyleSheet.create({
  //For scroll view list function
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  item: {
    margin: 10,
    backgroundColor: "#4ae1fa",
    justifyContent: 'center',
    alignItems: "center",
  },
  text: {
    color: Colors.black,
    fontStyle: 'italic',
    fontSize: 35,
    margin: 10,
  },
})

const flatListComponentStyles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: "#4ae1fa",
    justifyContent: 'center',
    alignItems: "center",
  },
  text: {
    color: Colors.black,
    fontStyle: 'italic',
    fontSize: 35,
    margin: 10,
  },
})

const sectionListComponentStyles = StyleSheet.create({
  sectionItem: {
    backgroundColor: "#4ae1fa",
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 1,
  },
  childItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
  },
  divider: {
    borderBottomColor: "#808080",
    borderBottomWidth: 1,
  },
  sectionText: {
    color: Colors.black,
    fontStyle: 'italic',
    fontSize: 35,
    margin: 5,
  },
  text: {
    color: Colors.black,
    fontStyle: 'italic',
    fontSize: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: "center",
  },
})

export default AppWithReduxSQLite;
