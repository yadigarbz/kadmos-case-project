import create from "zustand";
import { getUser, getUsers, User } from "@services";
import produce from "immer";

type UserStore = {
  userIds: number[];
  users: { [key: number]: User };

  page: number;
  isUsersLoading: boolean;
  isUsersEndReached: boolean;
  isUserDetailFetching: boolean;

  fetchUsers: (isFresh?: boolean) => Promise<void>;
  fetchUserDetail: (userId?: number) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => {
  return {
    userIds: [],
    users: {},

    page: 0,
    isUsersLoading: false,
    isUsersEndReached: false,

    fetchUsers: async (isFresh: boolean = false) => {
      const currentState = get();
      if (
        (currentState.isUsersLoading || currentState.isUsersEndReached) &&
        !isFresh
      ) {
        return;
      }
      set({ isUsersLoading: true });

      const page = isFresh ? 0 : currentState.page + 1;
      const users = await getUsers(page);
      if (!users.data?.length) {
        return set({ isUsersLoading: false, isUsersEndReached: true });
      }

      return set(
        produce((draft) => {
          const userIds = isFresh ? [] : draft.userIds;

          users.data?.forEach((user) => {
            draft.users[user.id] = user;
            if (!userIds.includes(user.id)) {
              userIds.push(user.id);
            }
          });

          draft.userIds = userIds;
          draft.page = users.page;
          draft.isUsersLoading = false;
        })
      );
    },

    isUserDetailFetching: false,
    fetchUserDetail: async (userId?: number) => {
      try {
        set({ isUserDetailFetching: true });
        if (!userId) {
          return;
        }

        const userData = await getUser(userId);
        if (!userData) {
          return;
        }

        set(
          produce((state) => {
            state.users[userId] = userData;
          })
        );
      } catch (e) {
        console.error(e);
      } finally {
        set({ isUserDetailFetching: false });
      }
    },
  };
});

export const userStoreUserSelector = (id: number) => (state: UserStore) =>
  state.users[id];
