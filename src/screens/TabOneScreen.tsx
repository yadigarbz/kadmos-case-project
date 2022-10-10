import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import { View } from "@components/Themed";
import { RootTabScreenProps } from "@types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useUserStore } from "@store/userStore";
import shallow from "zustand/shallow";
import { UserListItem } from "@components/UserListItem";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [userIds, isUsersLoading] = useUserStore(
    (state) => [state.userIds, state.isUsersLoading],
    shallow
  );

  useFocusEffect(
    useCallback(() => {
      fetchUsers(true).catch(console.error);
    }, [])
  );

  const onEndReached = () => {
    fetchUsers().catch(console.error);
  };

  const renderItem = useCallback<ListRenderItem<number>>(({ item, index }) => {
    return <UserListItem id={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userIds}
        keyExtractor={(item) => `user_list_item_${item}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
  },
});
