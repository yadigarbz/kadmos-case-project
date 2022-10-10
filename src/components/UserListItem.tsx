import React, { FC } from "react";
import { userStoreUserSelector, useUserStore } from "@store/userStore";
import { Pressable, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "@components/Themed";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

export const UserListItem: FC<{ id: number }> = ({ id }) => {
  const userSubscription = useUserStore(userStoreUserSelector(id));
  const { navigate } = useNavigation();
  const onPress = () => {
    navigate("Modal", { id });
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <SharedElement id={`item.${id}.photo`} style={styles.avatarContainer}>
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 12,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 45,
    overflow: "hidden",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailLabel: {},
});
