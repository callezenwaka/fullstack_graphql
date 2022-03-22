<template><div class="Club">
    <div class="container mx-auto mt-5 bg-gray-700 text-gray-300">
      <h2 class="text-2xl p-3">UCL Clubs</h2>
      <div class="forms flex flex-col w-full items-center">
        <div class="box flex flex-col w-1/2 mb-3">
          <label for="name" class="text-sm">Club Name</label>
          <input
            type="text"
            id="name"
            v-model="state.club.name"
            class="bg-gray-800 py-1 rounded focus outline-none px-2"
          />
        </div>
        <div class="box flex flex-col w-1/2 mb-3">
          <label for="league" class="text-sm">League</label>
          <input
            type="text"
            id="league"
            v-model="state.club.league"
            class="bg-gray-800 py-1 rounded focus outline-none px-2"
          />
        </div>
        <button
          v-on:click="submitItemHandler"
          class="bg-gray-200 px-5 py-2 mb-5 rounded text-gray-900"
        >
          Submit
        </button>
      </div>
    </div>
    <br />
    <div class="all-clubs mt-4 container mx-auto">
      <ul
        class="list space-y-2 flex inline-flex flex-wrap justify-between w-full"
      >
        <li
          class="
            text-gray-300
            bg-gray-800
            list-item
            shadow
            hover:bg-gray-700
            transition-all transition-colors
          "
          v-for="(item, i) in state.clubList"
          v-bind:key="i"
        >
          <div
            class="
              inside-list
              flex
              justify-between
              flex-row
              border-b border-solid border-indigo-900
              mb-2
              p-2
            "
          >
            <p class="w-1/2">{{ item.name }}</p>
            <p class="w-1/2">{{ item.league }}</p>
          </div>
          <div class="buttons p-2">
            <button
              class="bg-red-600 py-2 px-2 rounded mr-2"
              v-on:click="(e) => deleteItemHandler(e, item.id)"
            >
              Delete
            </button>
            <button
              class="bg-blue-600 py-2 px-2 rounded mr-2"
              v-on:click="(e) => updateItemHandler(e, item.id)"
            >
              Update
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from "vue";
import { getClubs } from "../graphql/queries";
import { addClub, deleteClub, updateClub } from "../graphql/mutations";
export default {
  setup(props) {
    const state = reactive({
      club: {
        id: null,
        name: null,
        league: null,
      },
      clubList: [],
      update: false,
      isLoading: false,
    });

    onMounted(async () => {
      const allClubs = await getClubs(state);
      console.log(allClubs);
      state.clubList = allClubs;
    });

    const submitItemHandler = async (e: Event) => {
      e.preventDefault();
      // console.log(state.club.name);
      // ADDING NEW CLUB

      if (state.update === true) {
        // UPDATE EXISTING CLUB
        const updatedClub = await updateClub(state, state.club.id);
      } else {
        const newClub = await addClub(state);
      }

      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      const allClubs = await getClubs(state);
      // console.log(allClubs);
      state.clubList = allClubs;
      state.club = { id: null, name: null, league: null };
      state.update = false;
    };

    const deleteItemHandler = async (e, id) => {
      e.preventDefault();
      // console.log(itemID);
      const deletedClubs = await deleteClub(state, id);
      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      const allClubs = await getClubs(state);
      // console.log(allClubs);
      state.clubList = allClubs;
    };

    const updateItemHandler = async (e, id) => {
      e.preventDefault();
      const selectedClub = state.clubList.filter(
        (club, i) => club.id === id
      )[0];
      state.club.name = selectedClub.name;
      state.club.league = selectedClub.league;
      state.club.id = selectedClub.id;
      // console.log(state);
      state.update = true;
    };

    return {
      updateItemHandler,
      submitItemHandler,
      deleteItemHandler,
      state,
    };
  },
};
</script>

<style scoped>
.list-item {
  min-width: 20em;
  min-height: 6em;
  padding: 0;
  margin: 0;
}
</style>
