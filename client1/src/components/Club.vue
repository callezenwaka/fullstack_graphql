<template>
<div class="Club">
    <div class="container mx-auto mt-5 bg-gray-700 text-gray-300">
      <h2 class="text-2xl p-3">UCL Clubs</h2>
      <div class="forms flex flex-col w-full items-center">
        <div class="box flex flex-col w-1/2 mb-3">
          <label for="name" class="text-sm">Club Name</label>
          <input
            type="text"
            id="name"
            v-model="club.name"
            class="bg-gray-800 py-1 rounded focus outline-none px-2"
          />
        </div>
        <div class="box flex flex-col w-1/2 mb-3">
          <label for="league" class="text-sm">League</label>
          <input
            type="text"
            id="league"
            v-model="club.league"
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
          v-for="(club, i) in clubs"
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
            <p class="w-1/2">{{ club.name }}</p>
            <p class="w-1/2">{{ club.league }}</p>
          </div>
          <div class="buttons p-2">
            <button
              class="bg-red-600 py-2 px-2 rounded mr-2"
              v-on:click="(e) => deleteItemHandler(e, club.id)"
            >
              Delete
            </button>
            <button
              class="bg-blue-600 py-2 px-2 rounded mr-2"
              v-on:click="(e) => updateItemHandler(e, club.id)"
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
import { defineComponent, reactive, onMounted } from "vue";
import { getClubs } from "../graphql/queries";
import { addClub, deleteClub, updateClub } from "../graphql/mutations";
import Club from "../types/Club";
export default defineComponent({
  setup() {
    let club = reactive<Club>({
      id: 0,
      name: '',
      league: '',
    })
    let isLoading = true;
    let update = false;
    let clubs: Club[] = [];

    onMounted(async () => {
      clubs = await getClubs();
      // const allClubs = await getClubs(state);
      // console.log(allClubs);
      // state.clubList = allClubs;
      isLoading = false;
    });

    const submitItemHandler = async (e: Event) => {
      // const target = event.target as HTMLElement;
      e.preventDefault();
      // console.log(state.club.name);
      // ADDING NEW CLUB

      if (update === true) {
        // UPDATE EXISTING CLUB
        await updateClub(club, club.id);
      } else {
        await addClub(club);
      }

      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      clubs = await getClubs();
      // const allClubs = await getClubs(state);
      // console.log(allClubs);
      // state.clubList = allClubs;
      club = { id: 0, name: '', league: '' };
      update = false;
    };

    const deleteItemHandler = async (e: Event, id: number) => {
      e.preventDefault();
      // console.log(itemID);
      // const deletedClubs = await deleteClub(id);
      await deleteClub(id);
      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      // const allClubs = await getClubs(state);
      clubs = await getClubs();
      // console.log(allClubs);
      // state.clubList = allClubs;
    };

    const updateItemHandler = async (e: Event, id: number) => {
      e.preventDefault();
      const selectedClub = clubs.filter(
        (club) => club.id === id
      )[0];

      club.name = selectedClub.name;
      club.league = selectedClub.league;
      club.id = selectedClub.id;
      // console.log(state);
      // state.update = true;
    };

    return {
      clubs,
      club,
      isLoading,
      updateItemHandler,
      submitItemHandler,
      deleteItemHandler,
    };
  },
});
</script>

<style scoped>
.list-item {
  min-width: 20em;
  min-height: 6em;
  padding: 0;
  margin: 0;
}
</style>
