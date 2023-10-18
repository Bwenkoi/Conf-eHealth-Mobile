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
import { patientInfo, patientData } from "./database/Pacient01";

export default function App() {
  const [data, setData] = useState({
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

  useEffect(() => {
    //getDataFromAPI(0);
  }, []);

  function getDataFromAPI(iteration) {
    setTimeout(() => {
      var arrayAux = data.datasets[0].data;

      if (arrayAux.length < 15) {
        arrayAux.push(patientData[iteration]);
        console.log(arrayAux);

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

        var dataExtractAux = dataExtract;
        var dateAux = new Date();
        var dateformatted = formatDate(dateAux) + " - " + formatHour(dateAux);

        dataExtractAux.push({
          timeStamp: dateformatted,
          value: patientData[iteration],
          situation: "normal",
        });
        setDataExtract(dataExtractAux);

        if (iteration < patientData.length - 1) {
          var aux = iteration + 1;
          getDataFromAPI(aux);
        } else {
          //console.log(dataExtract);
        }
      } else {
        arrayAux.reverse();
        arrayAux.pop();
        arrayAux.reverse();
        arrayAux.push(patientData[iteration]);
        console.log(arrayAux);

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

        var dataExtractAux = dataExtract;
        var dateAux = new Date();
        var dateformatted = formatDate(dateAux) + " - " + formatHour(dateAux);

        dataExtractAux.push({
          timeStamp: dateformatted,
          value: patientData[iteration],
          situation: "normal",
        });
        setDataExtract(dataExtractAux);

        if (iteration < patientData.length - 1) {
          var aux = iteration + 1;
          getDataFromAPI(aux);
        } else {
          //console.log(dataExtract);
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
    return (
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("window").width - 10,
          justifyContent: "space-around",
        }}
      >
        <Text>{item.timeStamp}</Text>
        <Text>{item.value}</Text>
        <Text>{item.situation}</Text>
      </View>
    );
  };

  const returnReverseArray = () => {
    var arrayAux = dataExtract;
    arrayAux.reverse();
    return arrayAux;
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.patientHeader}>
        <View style={styles.headerLeft}>
          
        </View>
        <View style={styles.headerMiddle}>
          <Text>Dados do Paciente</Text>
        </View>
        <View style={styles.headerRight}>
          <Text>algum frufru</Text>
        </View>
      </View>
      <View style={styles.notificationArea}>
        <Text>Notificações</Text>
      </View>
      <LineChart
        data={data}
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
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={styles.graphStyle}
      />
      <View style={styles.dataExtractArea}>
        <FlatList
          data={returnReverseArray()}
          renderItem={({ item }) => renderListItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const cleanWhite = "#fff";

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
    borderWidth: 1,
    borderRadius: 15,
  },
  headerLeft: {
    height: "100%",
    width: "25%",
    backgroundColor: "green",
  },
  headerMiddle: {
    height: "100%",
    width: "40%",
    backgroundColor: "yellow",
  },
  headerRight: {
    height: "100%",
    width: "35%",
    backgroundColor: "blue",
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
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
  },
});
