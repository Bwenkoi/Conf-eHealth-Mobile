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
                <Image
                  source={require("../../assets/Location.png")}
                  style={{ width: 40, height: 40 }}
                />
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
                    style={{ width: 40, height: 40 }}
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
    justifyContent: "space-between",
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
  //Estilos do menu
  confirmButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: baseGray,
    flexDirection: "row",
  },
  confirmButtonText: {
    fontSize: 20,
    color: cleanWhite,
  },
});
