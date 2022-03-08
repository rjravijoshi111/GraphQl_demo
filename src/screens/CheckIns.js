import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  ActivityIndicator,
  DeviceEventEmitter,
} from "react-native";
import { MuQuery } from "../graphql/Queries";
import { useQuery } from "@apollo/client";
import moment from "moment";

export default function Checkins() {
  const { data, loading, error } = useQuery(MuQuery);
  const [checkInsData, setCheckInsData] = React.useState([]);

  DeviceEventEmitter.addListener("submiteData", (props) => {
    let tempCheckInData = [...checkInsData];
    if (tempCheckInData.findIndex((x) => x.id == props?.data?.id) == -1) {
      tempCheckInData.unshift(props.data);
      setCheckInsData([...tempCheckInData]);
    }
  });

  useEffect(() => {
    if (data) {
      let formateData = data.check_in.sort((a, b) => {
        return b.id - a.id;
      });
      setCheckInsData([...formateData]);
    }
  }, [data]);
  
  return (
    <>
      <FlatList
        data={checkInsData}
        extraData={checkInsData}
        style={{ backgroundColor: "#f1f1f1" }}
        ListEmptyComponent={() => (
          <ActivityIndicator color={"#000"} style={{ marginTop: 25 }} />
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.rowContainer}>
              {item.image_url ? (
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.imageStyle}
                />
              ) : null}
              <View style={styles.userDetailView}>
                <Image
                  source={require("../assets/images/group_placeholder.png")}
                  style={styles.userImage}
                />
                <View style={styles.userData}>
                  <Text>{item.name}</Text>
                  <Text style={styles.dateText}>
                    {moment(item.created_at).format("Do[ of] MMMM YYYY")}
                  </Text>
                </View>
              </View>
              <Text>{item.comment}</Text>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  imageStyle: {
    height: 225,
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },
  userDetailView: {
    flexDirection: "row",
    marginBottom: 15,
  },
  userImage: {
    height: 50,
    width: 50,
  },
  userData: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  dateText: {
    color: "blue",
  },
});
