import * as React from "react";
import {
  Text,
  View,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  baseGray,
  iceWhite,
  darkGray,
  errorRed,
  lightGray,
  cleanWhite,
  transparent,
} from "../Styles/ColorScheme";

//import AsyncStorage from "@react-native-async-storage/async-storage";

export default class emergencyModal extends React.Component {
  state = {
    showAvaliationModal: false,
  };

  closeModal() {
    this.props.onCancel();
  }

  returnImage = () => {
    switch (this.props.foto) {
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

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        statusBarTranslucent={true}
      >
        <View style={styles.modal}>
          <View style={styles.verticalSpaces} />
          <View style={styles.modalCenter}>
            <View style={styles.horizontalSpaces} />
            <View style={styles.modalCenterMiddle}>
              <View style={styles.menuOverItems}>
                <Text
                  style={{ color: errorRed, fontSize: 20, fontWeight: "bold" }}
                >
                  CONFIRMAR ENVIO DE AJUDA
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={this.returnImage()}
                    style={{ width: 60, height: 60 }}
                  />
                  <View
                    style={{
                      paddingLeft: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.text}>{this.props.nome}</Text>
                    <Text style={styles.text}>Idade: {this.props.idade}</Text>
                    <Text style={styles.text}>{this.props.genero}</Text>
                  </View>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={require("../../assets/Location.png")}
                    style={{ width: 205, height: 75, marginBottom: 20 }}
                  />

                  <Text style={styles.text}>{this.props.address}</Text>
                  <Text style={styles.text}>{this.props.cec}</Text>
                  <Text style={styles.text}>CEP: {this.props.zipcode}</Text>
                </View>
              </View>
              <View style={styles.menuOverButton}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.closeModal()}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: baseGray,
                    }}
                  >
                    Voltar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => this.closeModal()}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                  <Image
                    source={require("../../assets/SeguirWhite.png")}
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 20,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.horizontalSpaces} />
          </View>
          <View style={styles.verticalSpaces} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  //Estilos do modal
  modal: {
    flex: 1,
    backgroundColor: transparent,
  },
  verticalSpaces: {
    height: "25%",
  },
  horizontalSpaces: {
    width: "10%",
  },
  modalCenter: {
    flexDirection: "row",
    height: "50%",
  },
  modalCenterMiddle: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cleanWhite,
    borderRadius: 10,
  },
  menuOverItems: {
    flex: 1,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: iceWhite,
    borderRadius: 10,
  },
  menuOverButton: {
    height: 60,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: darkGray,
    fontSize: 17,
  },
  confirmButton: {
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 10,
    backgroundColor: errorRed,
  },
  confirmButtonText: {
    fontSize: 20,
    color: cleanWhite,
  },
});
