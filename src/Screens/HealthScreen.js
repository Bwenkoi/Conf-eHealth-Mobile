import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import {
  baseGray,
  darkGray,
  iceWhite,
  errorRed,
  liveGreen,
  cleanWhite,
  premiumGold,
  brightOrange,
} from "../Styles/ColorScheme";

export default function HealthScreen(props) {
  const [graphData, setData] = useState({
    datasets: [
      {
        data: [0],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Batimentos por Minuto"],
  });

  const [dataExtract, setDataExtract] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [displayStatus, setDisplayStatus] = useState("normal");

  const [nome, setNome] = useState("");
  const [idade, setidade] = useState("");
  const [genero, setGenero] = useState("");
  const [foto, setFoto] = useState("Male");

  const printData = (data) => {
    console.log(data);
  };

  useEffect(() => {
    var data = props.route.params.item;
    setPatientData(data);
    getHealthData(0);
  }, []);

  function setPatientData(patientData) {
    setNome(patientData.name);
    setidade(patientData.age);
    setGenero(patientData.gender);
    setFoto(patientData.photo);
  }

  function getHealthData(iteration) {
    var healthData = props.route.params.item.patientData;
    var arrayAux = graphData.datasets[0].data;

    setTimeout(() => {
      if (arrayAux.length < 15) {
        arrayAux.push(healthData[iteration]);

        setData({
          datasets: [
            {
              data: arrayAux,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
          ],
          legend: ["Batimentos por Minuto"],
        });

        setCurrentValue(healthData[iteration]);

        var dataExtractAux = dataExtract;
        var dateAux = new Date();
        var dateformatted = formatDate(dateAux) + " - " + formatHour(dateAux);

        if (healthData[iteration] >= 70 && healthData[iteration] <= 150) {
          var situation = "normal";
        } else if (
          healthData[iteration] >= 40 &&
          healthData[iteration] <= 200
        ) {
          var situation = "alerta";
        } else {
          var situation = "perigo";
        }

        dataExtractAux.push({
          timeStamp: dateformatted,
          value: healthData[iteration],
          situation: situation,
        });

        setDataExtract(dataExtractAux);

        if (iteration < healthData.length - 1) {
          var aux = iteration + 1;
          getHealthData(aux);
        } else {
          printData(dataExtract);
        }
      } else {
        arrayAux.reverse();
        arrayAux.pop();
        arrayAux.reverse();
        arrayAux.push(healthData[iteration]);

        setData({
          datasets: [
            {
              data: arrayAux,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
          ],
          legend: ["Batimentos por Minuto"],
        });

        setCurrentValue(healthData[iteration]);

        var dataExtractAux = dataExtract;
        var dateAux = new Date();
        var dateformatted = formatDate(dateAux) + " - " + formatHour(dateAux);
        var situation = "normal";

        if (healthData[iteration] >= 70 && healthData[iteration] <= 150) {
          var situation = "normal";
        } else if (
          healthData[iteration] >= 40 &&
          healthData[iteration] <= 200
        ) {
          var situation = "alerta";
        } else {
          var situation = "perigo";
        }

        dataExtractAux.push({
          timeStamp: dateformatted,
          value: healthData[iteration],
          situation: situation,
        });

        setDataExtract(dataExtractAux);

        if (iteration < healthData.length - 1) {
          var aux = iteration + 1;
          getHealthData(aux);
        } else {
          printData(dataExtract);
        }
      }
    }, 1000);
  }

  const formatDate = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    var dateNew = day + "/" + month + "/" + year;

    return dateNew;
  };

  const formatHour = (date) => {
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    var hourNew = hour + ":" + minute + ":" + second;

    return hourNew;
  };

  const renderListItem = (item) => {
    if (item.situation === "normal") {
      var situation = (
        <View
          style={{
            width: 80,
            backgroundColor: liveGreen,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: cleanWhite, fontWeight: "bold" }}>
            Saudável
          </Text>
        </View>
      );
    } else if (item.situation === "alerta") {
      var situation = (
        <View
          style={{
            width: 80,
            backgroundColor: premiumGold,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: darkGray, fontWeight: "bold" }}>Atenção</Text>
        </View>
      );
    } else {
      var situation = (
        <View
          style={{
            width: 80,
            backgroundColor: errorRed,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: cleanWhite, fontWeight: "bold" }}>Perigo</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("window").width - 10,
          justifyContent: "space-around",
          marginBottom: 5,
        }}
      >
        <Text>{item.timeStamp}</Text>
        <Text>{item.value}</Text>
        {situation}
      </View>
    );
  };

  function returnReverseArray(array) {
    var arrayAux = array;
    arrayAux.reverse();
    return arrayAux;
  }

  const returnImage = () => {
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

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.patientHeader}>
        <View style={styles.headerLeft}>
          <Image source={returnImage()} style={styles.headerImage} />
        </View>
        <View style={styles.headerMiddle}>
          <Text style={{ color: darkGray, fontWeight: "bold" }}>{nome}</Text>
          <Text style={{ color: baseGray, fontWeight: "bold" }}>
            Idade: {idade}
          </Text>
          <Text style={{ color: baseGray, fontWeight: "bold" }}>{genero}</Text>
        </View>
        <View style={styles.headerRight}>
          <Image
            source={require("../../assets/Heart.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ color: errorRed, fontWeight: "bold" }}>
            {currentValue}
          </Text>
        </View>
      </View>
      <View style={styles.notificationArea}>
        <Text>Notificações</Text>
      </View>
      <LineChart
        data={graphData}
        width={Dimensions.get("window").width - 10}
        height={250}
        fromZero={true}
        withVerticalLabels={false}
        chartConfig={{
          backgroundColor: "#117864",
          backgroundGradientFrom: "#148F77",
          backgroundGradientTo: "#17A589",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => cleanWhite,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: brightOrange,
          },
        }}
        bezier
        style={styles.graphStyle}
      />
      <View style={styles.dataExtractArea}>
        <FlatList
          //data={returnReverseArray(dataExtract)}
          data={dataExtract}
          renderItem={({ item }) => renderListItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: cleanWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  patientHeader: {
    marginTop: 5,
    height: 100,
    width: Dimensions.get("window").width - 10,
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: iceWhite,
  },
  headerLeft: {
    height: "100%",
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 80,
    height: 80,
  },
  headerMiddle: {
    height: "100%",
    width: "40%",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  headerRight: {
    height: "100%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationArea: {
    marginTop: 5,
    height: 30,
    width: Dimensions.get("window").width - 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
  },
  graphStyle: {
    marginVertical: 5,
    borderRadius: 15,
  },
  dataExtractArea: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 5,
  },
});
