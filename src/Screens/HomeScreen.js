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
import { cleanWhite, iceWhite } from "../Styles/ColorScheme";

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
      <View>
        <Text>header</Text>
      </View>
    );
  };

  const renderListItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get("window").width - 20,
          height: 80,
          backgroundColor: iceWhite,
          borderRadius: 10,
          marginVertical: 5,
        }}
        onPress={() => goToHealthScreen(item)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const goToHealthScreen = (item) => {
    props.navigation.navigate("HealthScreen", { item: item });
  };

  const footerComponent = () => {
    return (
      <View>
        <Text>Footer</Text>
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
