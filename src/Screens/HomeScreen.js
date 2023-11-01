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
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Lista de Pacientes</Text>
      </View>
    );
  };

  const renderListItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => goToHealthScreen(item)}
      >
        <View style={styles.imageContainer}>
          <Image source={returnImage(item.photo)} style={styles.imageStyle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
        <View style={styles.seguirContainer}>
          <Image
            source={require("../../assets/Seguir.png")}
            style={styles.seguirImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const goToHealthScreen = (item) => {
    props.navigation.navigate("HealthScreen", { item: item });
  };

  const returnImage = (photo) => {
    switch (photo) {
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

  const footerComponent = () => {
    return (
      <View style={styles.footerStyle}>
        <Text style={styles.footerText}>@Conf-eHealth Mobile</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <FlatList
        data={dataArray}
        ListHeaderComponent={headerComponent}
        renderItem={({ item }) => renderListItem(item)}
        ListFooterComponent={footerComponent}
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
  headerStyle: {
    width: Dimensions.get("window").width - 20,
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  headerText: {
    color: baseGray,
    fontSize: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    height: 80,
    backgroundColor: iceWhite,
    borderRadius: 10,
    marginVertical: 5,
  },
  imageContainer: {
    height: 80,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textStyle: {
    color: baseGray,
    fontSize: 20,
  },
  seguirContainer: {
    height: 80,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  seguirImage: {
    width: 40,
    height: 40,
  },
  footerStyle: {
    width: Dimensions.get("window").width - 20,
    alignItems: "center",
    marginTop: 5,
  },
  footerText: {
    color: baseGray,
    fontSize: 15,
  },
});
