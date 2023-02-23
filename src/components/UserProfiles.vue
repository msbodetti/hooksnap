<template>
  <ProfileCard :profiles="profiles" :favourites="favourites" />
</template>

<script>
import { useProfileStore } from "@/stores/profiles";
import { useFavouritesStore } from "@/stores/favourites";
import ProfileCard from "@/components/helpers/ProfileCard.vue";
import { computed } from "vue";

export default {
  name: "UserProfiles",
  components: { ProfileCard },
  setup: () => {
    const profileStore = useProfileStore();
    const favouritesStore = useFavouritesStore();

    // fetch data initially
    profileStore.fetchProfiles();
    favouritesStore.fetchFavourites();

    const favourites = computed(() => favouritesStore.getFavourites);
    const profiles = computed(() => profileStore.getProfiles);

    return {
      profiles,
      favourites,
    };
  },
};
</script>

<style scoped></style>
