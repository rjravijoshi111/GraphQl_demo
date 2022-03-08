import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
} from "react-native";
import { Center, Input, Stack, Button } from "native-base";
import { useMutation } from "@apollo/client";
import { AddCheckIns } from "../graphql/mutation";
import moment from "moment";

export default function Submit() {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [addCheckIns, { loading, error, data }] = useMutation(AddCheckIns);

  const onPressButtton = async () => {
    if (name == "") {
      Alert.alert("Error", "Please enter name");
      return;
    }
    if (comment == "") {
      Alert.alert("Error", "Please enter comment");
      return;
    }
    if (imageUrl == "") {
      Alert.alert("Error", "Please enter image URL");
      return;
    }
    const addCheckInsResult = await addCheckIns({
      variables: {
        name: name,
        comment: comment,
        image_url: imageUrl,
        created_at: moment.utc().format(),
      },
    });
    console.log("addCheckInsResult->", addCheckInsResult);
    DeviceEventEmitter.emit("submiteData", {
      data: addCheckInsResult?.data?.insert_check_in_one,
    });
  };

  useEffect(() => {
    if (loading == false) {
      // Alert.alert('Success',"Data added successfully")
      setComment("");
      setName("");
      setImageUrl("");
    }
  }, [loading]);
  return (
    <>
      <View>
        <Center>
          <Stack mt={3} space={4} w="100%" style={{ alignItems: "center" }}>
            <Input
              size={"xl"}
              placeholder="Name"
              w="90%"
              variant={"outline"}
              value={name}
              onChangeText={(val) => setName(val)}
            />
            <Input
              size={"xl"}
              placeholder="Comment"
              w="90%"
              variant={"outline"}
              value={comment}
              onChangeText={(val) => setComment(val)}
            />
            <Input
              size={"xl"}
              placeholder="ImageUrl"
              w="90%"
              variant={"outline"}
              value={imageUrl}
              onChangeText={(val) => setImageUrl(val)}
            />
          </Stack>
          <Button primary style={styles.buttonStyle} onPress={onPressButtton}>
            {loading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={{ color: "#fff" }}>{"ADD"}</Text>
            )}
          </Button>
          {error ? (
            <Text style={styles.errorText}>{error.toString()}</Text>
          ) : null}
        </Center>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    margin: 15,
  },
  buttonStyle: {
    width: "90%",
    marginTop: 15,
    height: 45,
    backgroundColor: "blue",
  },
});
