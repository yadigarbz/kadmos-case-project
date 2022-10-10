import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@components/Themed";
import { RootStackScreenProps } from "@types";
import { userStoreUserSelector, useUserStore } from "@store/userStore";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";

export default function ModalScreen({ route }: RootStackScreenProps<"Modal">) {
  const params = route.params;
  const userSubscription = useUserStore(userStoreUserSelector(params.id));

  return (
    <View style={styles.container}>
      <SharedElement
        id={`item.${params.id}.photo`}
        style={styles.avatarContainer}
      >
        <FastImage
          source={{ uri: userSubscription.avatar }}
          style={styles.avatar}
        />
      </SharedElement>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel} numberOfLines={2}>
          {userSubscription.first_name} {userSubscription.last_name}
        </Text>
        <Text numberOfLines={1} style={styles.emailLabel}>
          {userSubscription.email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 60,
    overflow: "hidden",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailLabel: {},
});
