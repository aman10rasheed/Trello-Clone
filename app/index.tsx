import { Colors } from "@/constants/Colors";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as WebBrowser from "expo-web-browser";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { ModalType } from "@/types/enums";

import AuthModal from "@/components/AuthModal";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://galaxies.dev");
  };

  const openActionSheet = async () => {
    const options = ["View Support Docs", "Contact Us", "Cancel"];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Can't log in or sign in",
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingTop: top + 30 }]}>
        <Image
          source={require("@/assets/images/login/trello.png")}
          style={styles.image}
        />
        <Text style={styles.introText}>
          Move teamwork forward - even on the go
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "white" }]}
            onPress={() => ModalType.Login}
          >
            <Text style={[styles.btnText, { color: Colors.primary }]}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => ModalType.SignUp}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            By signing up, you agree to the{" "}
            <Text style={styles.link} onPress={openLink}>
              User Notice
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
            .
          </Text>

          <Text onPress={openActionSheet} style={styles.link}>
            Can't log in our sign up?
          </Text>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  introText: {
    fontWeight: "700",
    color: "white",
    fontSize: 20,
    padding: 30,
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 40,
    gap: 10,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  btnText: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 60,
  },
  link: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
