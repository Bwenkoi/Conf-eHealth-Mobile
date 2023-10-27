import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { patientArray } from "../Database/Patients";
import { cleanWhite, iceWhite, baseGray } from "../Styles/ColorScheme";

export default function HomeScreen(props) {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    setDataArray(patientArray);
  };

  const headerComponent = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width - 20,
          alignItems: "center",
          marginBottom: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: baseGray, fontSize: 20 }}>
          Lista de Pacientes
        </Text>
      </View>
    );
  };

  const returnImage = (foto) => {
    switch (foto) {
      case "Male":
        return require("../../assets/Man.png");
      case "Female":
        return require("../../assets/Woman.png");
      case "ElderlyM":
        return require("../../assets/ElderlyMan.png");
      case "ElderlyF":
        return require("../../assets/ElderlyWoman.png");
    }
  };

  const renderListItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: Dimensions.get("window").width - 20,
          height: 80,
          backgroundColor: iceWhite,
          borderRadius: 10,
          marginVertical: 5,
        }}
        onPress={() => goToHealthScreen(item)}
      >
        <View
          style={{
            height: 80,
            width: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={returnImage(item.photo)}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: baseGray, fontSize: 20 }}>{item.name}</Text>
        </View>
        <View
          style={{
            height: 80,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/Seguir.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const goToHealthScreen = (item) => {
    props.navigation.navigate("HealthScreen", { item: item });
  };

  const footerComponent = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width - 20,
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Text style={{ color: baseGray, fontSize: 15 }}>
          @Conf-eHealth Mobile
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <FlatList
        data={dataArray}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        renderItem={({ item }) => renderListItem(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: cleanWhite,
  },
});
