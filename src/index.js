import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { NativeBaseProvider, HStack } from "native-base";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Checkins from './screens/CheckIns';
import Submit from './screens/Submit';

const SubmitRoute = () => <Submit />;

const CheckinsRoute = () => <Checkins />;

const renderScene = SceneMap({
  first: SubmitRoute,
  second: CheckinsRoute,
});

export default function Root() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Submit" },
    { key: "second", title: "Check-ins" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      activeColor={'#63677d'}
      style={styles.tabbar}
      labelStyle={styles.label}
    />
  );

  return (
    <>
      <StatusBar />
      <HStack
        px="1"
        py="4"
        style={styles.headerStyle}
      >
        <Text style={styles.headerTitle}>{"Checkins"}</Text>
      </HStack>
      <TabView
        navigationState={{ index, routes }}
        inactiveColor={"#fff"}
        activeColor={"#fff"}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{backgroundColor : '#fff'}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle:{
    alignItems: "center", justifyContent: "center", marginTop: 20
  },
  headerTitle:{
    fontWeight: "bold", fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabbar: {
    backgroundColor: '#FFF',
    width: '100%'
  },
  indicator: {
    backgroundColor: '#000',
  },
  label: {
    fontWeight: 'bold',
    color: '#000'
  },
});
