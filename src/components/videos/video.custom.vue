<template>
    <div class="relative w-4/12 h-[50vh]">
      <video ref="videoRef" class="w-full h-full" @timeupdate="handleTimeUpdate" @ended="handleEnded">
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div class="absolute inset-0 flex flex-col items-center justify-center z-40">
        <button class="bg-black bg-opacity-50 p-3 rounded-full shadow-lg" @click="togglePlay">
          <i :class="playIcon"></i>
        </button>
        <div class="text-white font-bold text-lg mt-2">
          {{ formattedTime(currentTime) }} / {{ formattedTime(duration) }}
        </div>
        <div class="flex justify-center mt-4 z-40 bg-white w-full">
          <div class="h-2 w-full bg-gray-400 rounded-lg overflow-hidden">
            <div class="h-full bg-blue-500" :style="`width: ${percentPlayed}%`"></div>
            <div class="absolute top-0 bottom-0 right-0 left-0 flex items-center pointer-events-none">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    props: {
      videoSrc: {
        type: String,
        default: 'https://api.djoumaf.net/images/storage/1679434548677_b734a08183d34cdd5566f3e83c782cef.mp4',
        required: true,
      },
    },
    setup(props) {
      const videoRef = ref<HTMLVideoElement | null>(null);
      const currentTime = ref(0);
      const duration = ref(0);
      const isPlaying = ref(false);
  
      const togglePlay = () => {
        if (videoRef.value) {
          if (isPlaying.value) {
            videoRef.value.pause();
          } else {
            videoRef.value.play();
          }
          isPlaying.value = !isPlaying.value;
        }
      };
  
      const handleTimeUpdate = () => {
        if (videoRef.value) {
          currentTime.value = videoRef.value.currentTime;
          duration.value = videoRef.value.duration;
        }
      };
  
      const handleEnded = () => {
        isPlaying.value = false;
      };
  
      const formattedTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
  
      const percentPlayed = computed(() => (currentTime.value / duration.value) * 100);
  
      const playIcon = computed(() => {
        return isPlaying.value ? 'fi fi-sr-pause' : 'fi fi-sr-play';
      });
  
      return {
        videoRef,
        currentTime,
        duration,
        isPlaying,
        togglePlay,
        handleTimeUpdate,
        handleEnded,
        formattedTime,
        percentPlayed,
        playIcon,
        videoSrc: props.videoSrc,
      };
    },
  });
  </script>
  
  <style>
  /* ... */
  </style>
  