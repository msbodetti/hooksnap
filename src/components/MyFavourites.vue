<template>
  <ProfileCard :profiles="profiles" :favourites="favourites" />
</template>

<script>
import { useFavouritesStore } from "@/stores/favourites";
import ProfileCard from "@/components/helpers/ProfileCard.vue";
import { computed } from "vue";

export default {
  name: "MyFavourites",
  components: { ProfileCard },
  setup: () => {
    const favouritesStore = useFavouritesStore();

    // fetch data initially
    favouritesStore.fetchFavourites();
    favouritesStore.fetchFavouriteProfiles();

    const favourites = computed(() => favouritesStore.getFavourites);
    const profiles = computed(() => favouritesStore.getFavouriteProfiles);

    return {
      profiles,
      favourites,
    };
  },
};
</script>

<style scoped></style>
