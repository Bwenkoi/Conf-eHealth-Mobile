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

import { LineChart } from "react-native-chart-kit";

import {
  baseGray,
  darkGray,
  iceWhite,
  errorRed,
  liveGreen,
  darkYellow,
  cleanWhite,
  premiumGold,
  cleanRed,
  graphBackground,
  graphGradientFrom,
  graphGradientTo,
} from "../Styles/ColorScheme";

import AlertModal from "./AlertModal";

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
  const [invertDataExtract, setInvertDataExtract] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [displayNotification, setDisplayNotification] = useState(0);

  const [nome, setNome] = useState("");
  const [idade, setidade] = useState("");
  const [genero, setGenero] = useState("");
  const [foto, setFoto] = useState("Male");
  const [address, setAddress] = useState("");
  const [cec, setCec] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isHelpSent, setisHelpSent] = useState(false);

  const extractData = (data) => {
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
    setAddress(patientData.address);
    setCec(patientData.cec);
    setZipcode(patientData.zipcode);
  }

  function getHealthData(iteration) {
    setTimeout(() => {
      var healthData = props.route.params.item.patientData;
      var arrayAux = graphData.datasets[0].data;

      if (arrayAux.length < 15) {
        arrayAux.push(healthData[iteration]);
      } else {
        arrayAux.reverse();
        arrayAux.pop();
        arrayAux.reverse();
        arrayAux.push(healthData[iteration]);
      }

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

      var situation = checkSituationRule01(healthData[iteration]);

      if (situation === "Atenção") setDisplayNotification(1);
      if (situation === "Perigo") {
        setShowModal(true);
        setDisplayNotification(2);
      }

      var dataExtractAux = dataExtract;
      var dateAux = new Date();
      var dateformatted = formatDate(dateAux) + " - " + formatHour(dateAux);

      dataExtractAux.push({
        timeStamp: dateformatted,
        value: healthData[iteration],
        situation: situation,
      });

      setDataExtract(dataExtractAux);

      var dataInvExtractAux = invertDataExtract;

      dataInvExtractAux.reverse();
      dataInvExtractAux.push({
        timeStamp: dateformatted,
        value: healthData[iteration],
        situation: situation,
      });
      dataInvExtractAux.reverse();

      setInvertDataExtract(dataInvExtractAux);

      if (iteration < healthData.length - 1) {
        var aux = iteration + 1;
        getHealthData(aux);
      } else {
        extractData(dataExtract);
      }
    }, 1000);
  }

  function checkSituationRule01(healthData) {
    if (healthData >= 60 && healthData <= 119) return "Normal";
    else if (healthData >= 40 && healthData <= 180) return "Atenção";
    else return "Perigo";
  }

  function checkSituationRule02(healthData) {
    if (healthData >= 60 && healthData <= 119) return "Normal";
    else if (healthData >= 40 && healthData <= 180) return "Atenção";
    else return "Perigo";
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
    if (item.situation === "Normal") {
      var situation = (
        <View style={[styles.listMarker, { backgroundColor: liveGreen }]}>
          <Text style={styles.clearText}>Normal</Text>
        </View>
      );
    } else if (item.situation === "Atenção") {
      var situation = (
        <View style={[styles.listMarker, { backgroundColor: premiumGold }]}>
          <Text style={styles.darkText}>Atenção</Text>
        </View>
      );
    } else {
      var situation = (
        <View style={[styles.listMarker, { backgroundColor: errorRed }]}>
          <Text style={styles.clearText}>Perigo</Text>
        </View>
      );
    }

    return (
      <View style={styles.listItem}>
        <Text style={styles.darkText}>{item.timeStamp}</Text>
        <Text style={styles.darkText}>{item.value}</Text>
        {situation}
      </View>
    );
  };

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

  const openModal = () => {
    setShowModal(true);
  };

  const returnNotification = () => {
    if (displayNotification === 0) {
      var visualNotification = (
        <View style={styles.notificationView}>
          <Image
            source={require("../../assets/Correct.png")}
            style={styles.notificationIcon}
          />
          <Text style={[styles.notificationText, { color: liveGreen }]}>
            Normal
          </Text>
        </View>
      );
    } else if (displayNotification === 1) {
      var visualNotification = (
        <View style={styles.notificationView}>
          <Image
            source={require("../../assets/Warning.png")}
            style={styles.notificationIcon}
          />
          <Text style={[styles.notificationText, { color: darkYellow }]}>
            Atenção
          </Text>
        </View>
      );
    } else {
      if (isHelpSent) {
        var notificationStatus = (
          <>
            <Text style={[styles.notificationText, { color: errorRed }]}>
              Ajuda Enviada
            </Text>
          </>
        );
      } else {
        var notificationStatus = (
          <>
            <Text style={[styles.notificationText, { color: errorRed }]}>
              Enviar Ajuda
            </Text>
            <Image
              source={require("../../assets/Seguir.png")}
              style={[styles.notificationIcon, { marginLeft: 5 }]}
            />
          </>
        );
      }

      var visualNotification = (
        <View style={styles.notificationView}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/Incorrect.png")}
              style={styles.notificationIcon}
            />
            <Text style={[styles.notificationText, { color: errorRed }]}>
              Perigo
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              position: "absolute",
              right: 10,
            }}
            onPress={openModal}
          >
            {notificationStatus}
          </TouchableOpacity>
        </View>
      );
    }

    return visualNotification;
  };

  const onCancelPremiumModal = () => {
    setShowModal(false);
  };

  const onConfirmPremiumModal = () => {
    setShowModal(false);
    setisHelpSent(true);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <AlertModal
        isVisible={showModal}
        nome={nome}
        idade={idade}
        genero={genero}
        address={address}
        cec={cec}
        zipcode={zipcode}
        foto={foto}
        onCancel={() => onCancelPremiumModal()}
        onConfirm={() => onConfirmPremiumModal()}
      />

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
      <View
        style={[
          styles.notificationArea,
          displayNotification === 2
            ? { backgroundColor: cleanRed }
            : { backgroundColor: iceWhite },
        ]}
      >
        {returnNotification()}
        <LineChart
          data={graphData}
          width={Dimensions.get("window").width - 20}
          height={250}
          fromZero={true}
          withVerticalLabels={false}
          chartConfig={{
            backgroundColor: graphBackground,
            backgroundGradientFrom: graphGradientFrom,
            backgroundGradientTo: graphGradientTo,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: { r: "5" },
          }}
          bezier
          style={styles.graphStyle}
        />
      </View>
      <View style={styles.dataExtractArea}>
        <FlatList
          data={invertDataExtract}
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
  notificationView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationArea: {
    marginTop: 5,
    height: 350,
    width: Dimensions.get("window").width - 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
  },
  notificationIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  notificationText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  graphStyle: {
    marginVertical: 5,
    borderRadius: 15,
  },
  dataExtractArea: {
    flex: 1,
    marginVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 10,
    justifyContent: "space-around",
    marginBottom: 5,
  },
  listMarker: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  darkText: {
    color: darkGray,
    fontWeight: "bold",
    fontSize: 14,
  },
  clearText: {
    color: cleanWhite,
    fontWeight: "bold",
    fontSize: 14,
  },
});
