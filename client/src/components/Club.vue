<template>
<div class="Club">
    <div class="container mx-auto mt-5 bg-gray-700 text-gray-300">
      <h2 class="text-2xl p-3">UCL Clubs</h2>
      <div class="forms flex flex-col w-full items-center">
        <div class="box flex flex-col w-1/2 mb-3 text-left">
          <label for="name" class="text-sm">Club Name</label>
          <input
            type="text"
            id="name"
            v-model="input.name"
            class="bg-gray-800 py-1 rounded focus outline-none px-2"
          />
        </div>
        <div class="box flex flex-col w-1/2 mb-3 text-left">
          <label for="league" class="text-sm">League</label>
          <input
            type="text"
            id="league"
            v-model="input.league"
            class="bg-gray-800 py-1 rounded focus outline-none px-2"
          />
        </div>
        <button
          v-on:click="submitItemHandler($event, club)"
          class="bg-gray-200 px-5 py-2 mb-5 rounded text-gray-900"
        >
          Submit
        </button>
      </div>
    </div>
    <br />
    <div class="all-clubs mt-4 container mx-auto">
      <ul
        class="list"
      >
        <li
          class="list--item"
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
import { defineComponent, reactive, onMounted, computed } from "vue";
import { getClubs, singleClub } from "../graphql/queries";
import { addClub, deleteClub, updateClub } from "../graphql/mutations";
import Club from "../types/Club";
import { useStore } from "vuex";
export default defineComponent({
  name: 'ClubView',
  setup() {
    const store = useStore();
    let input = reactive({
      name: '',
      league: '',
    })
    let isLoading = true;
    let update = false;

    onMounted(async () => await getClubs());
    const clubs = computed((): Club[] => store.getters.clubs);
    const club = computed((): Club => store.getters.club);
    // Primeira Liga
    const submitItemHandler = async (e: Event, club: Club) => {
      e.preventDefault();
      if (update === true) {
        // UPDATE EXISTING CLUB
        await updateClub({id: club.id, ...input});
      } else {
        // ADDING NEW CLUB
        await addClub(input);
      }
      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      await getClubs();
      input.name = '';
      input.league = '' ;
      update = false;
    };

    const deleteItemHandler = async (e: Event, id: number) => {
      e.preventDefault();
      await deleteClub(id);
      // FETCHING ONCE AGAIN TO UPDATE CLIB LIST
      await getClubs();
    };

    const singleItemHandler= async (e: Event, id: number) => {
      e.preventDefault();
      await singleClub(id);
    };

    const updateItemHandler = async (e: Event, id: number) => {
      e.preventDefault();
      const _club = clubs.value.filter((club) => club.id === id)[0];
      store.commit('SET_CLUB', _club);
      // ASSIGN ITEM TO INPUT
      input.name = _club.name;
      input.league = _club.league;
      update = true;
    };

    return {
      clubs,
      club,
      input,
      isLoading,
      updateItemHandler,
      submitItemHandler,
      deleteItemHandler,
      singleItemHandler,
    };
  },
});
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  color: #fff;
  padding-right: 1rem;
  padding-left: 1rem;
}
.list-item {
  min-width: 20em;
  min-height: 6em;
  padding: 0;
  margin: 0;
}
.list--item {
  min-width: 100%;
  min-height: 6em;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  background-color: rgb(31, 41, 55, 1);
}

/* mini */
@media only screen and (min-width: 481px) {
  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    /* width: calc(); */
    align-content: space-between;
    color: #fff;
    padding: 0;
    margin: 0;
  }
  .list--item {
    min-width: 45%;
    min-height: 6em;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    background-color: rgb(31, 41, 55, 1);
  }
}
</style>
