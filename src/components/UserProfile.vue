<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="-my-8 divide-y-2 divide-gray-100">
        <div class="py-8 flex flex-wrap md:flex-nowrap">
          <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <img
              alt="team"
              class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
              :src="
                'https://fa.bdtechnologies.ch/img/profiles/' +
                profile.id +
                '.jpg'
              "
            />
            <span class="font-semibold title-font text-gray-700">{{
              profile.name
            }}</span>
            <span class="mt-1 text-gray-500 text-sm"
              >Age: {{ profile.age }}</span
            >
            <span class="mt-1 text-gray-500 text-sm"
              >City: {{ profile.city }}</span
            >
            <span class="mt-1 text-gray-500 text-sm"
              >Relationship: {{ profile.string }}</span
            >
          </div>
          <div class="md:flex-grow">
            <ChatBox
              :name="profile.name"
              :image="
                'https://fa.bdtechnologies.ch/img/profiles/' +
                profile.id +
                '.jpg'
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useRoute } from "vue-router";
import { useProfileStore } from "@/stores/profiles";
import { computed } from "vue";
import ChatBox from "@/components/helpers/ChatBox.vue";

export default {
  name: "UserProfile",
  components: { ChatBox },
  setup: () => {
    const route = useRoute();
    const id = route.params.id;
    const profileStore = useProfileStore();
    profileStore.fetchProfile(id);
    const profile = computed(() => profileStore.getProfile);

    return {
      profile,
    };
  },
};
</script>

<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
