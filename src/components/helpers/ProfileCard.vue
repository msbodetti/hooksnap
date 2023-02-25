<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div
          v-for="profile in profiles"
          :key="profile.id"
          class="p-4 lg:w-1/4 md:w-1/2"
        >
          <div class="h-full flex flex-col items-center text-center">
            <img
              alt="team"
              class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
              :src="
                'https://fa.bdtechnologies.ch/img/profiles/' +
                profile.id +
                '.jpg'
              "
            />
            <div class="w-full">
              <h2 class="title-font font-medium text-lg text-gray-900">
                {{ profile.name }}
              </h2>
              <h3 class="text-gray-500 mb-3">Age: {{ profile.age }}</h3>
              <span class="inline-flex">
                <router-link
                  :to="'/profile/' + profile.id"
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >View Profile</router-link
                >
                <button
                  class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  @click="
                    favourite(profile.id, favourites.includes(profile.id))
                  "
                >
                  <HeartIcon
                    :colour="favourites.includes(profile.id) ? 'red' : 'gray'"
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFavouritesStore } from "@/stores/favourites";
import HeartIcon from "../icons/HeartIcon.vue";

defineProps<{
  profiles: any;
  favourites: any;
}>();

function favourite(profileId: number, isFavourite: boolean) {
  const favouritesStore = useFavouritesStore();
  if (isFavourite) {
    favouritesStore.removeFavourite(profileId);
  } else {
    favouritesStore.addFavourite(profileId);
  }
}
</script>

<style scoped></style>
