<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type Track = {
  title: string
  artist: string
  src: string
}

// 发布网站前，可把你有权使用的音频放到 docs/public/music/，然后在这里添加：
// { title: '歌曲名', artist: '歌手', src: '/music/song.mp3' }
const playlist: Track[] = []

const selectedTrack = ref<Track | null>(playlist[0] ?? null)
const localObjectUrl = ref<string | null>(null)

const trackLabel = computed(() => {
  if (!selectedTrack.value) return '选择一首本地歌曲试听'
  return `${selectedTrack.value.title} · ${selectedTrack.value.artist}`
})

function selectTrack(track: Track) {
  releaseLocalFile()
  selectedTrack.value = track
}

function selectLocalFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  releaseLocalFile()
  localObjectUrl.value = URL.createObjectURL(file)
  selectedTrack.value = {
    title: file.name.replace(/\.[^.]+$/, ''),
    artist: '本地文件',
    src: localObjectUrl.value
  }
}

function releaseLocalFile() {
  if (localObjectUrl.value) {
    URL.revokeObjectURL(localObjectUrl.value)
    localObjectUrl.value = null
  }
}

onBeforeUnmount(releaseLocalFile)
</script>

<template>
  <section class="music-card" aria-label="首页音乐播放器">
    <div class="music-heading">
      <div class="music-icon" aria-hidden="true">♫</div>
      <div>
        <p class="music-eyebrow">YOUR READING SOUNDTRACK</p>
        <h2>{{ trackLabel }}</h2>
      </div>
    </div>

    <audio
      v-if="selectedTrack"
      :key="selectedTrack.src"
      class="music-audio"
      :src="selectedTrack.src"
      controls
      preload="metadata"
    />

    <p v-else class="music-empty">
      公开歌单还在整理。先从设备中选一首喜欢的歌吧，音频只在本地播放，不会上传。
    </p>

    <div v-if="playlist.length" class="music-playlist">
      <button
        v-for="track in playlist"
        :key="track.src"
        type="button"
        :class="{ active: selectedTrack?.src === track.src }"
        @click="selectTrack(track)"
      >
        {{ track.title }}
      </button>
    </div>

    <label class="music-file-button">
      选择本地歌曲
      <input type="file" accept="audio/*" @change="selectLocalFile" />
    </label>
  </section>
</template>

<style scoped>
.music-card {
  position: relative;
  overflow: hidden;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(112, 200, 168, 0.15), transparent 38%),
    rgba(255, 255, 255, 0.065);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}

.music-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.music-icon {
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, #9b86f4, #4eb28f);
  box-shadow: 0 10px 28px rgba(103, 83, 205, 0.3);
  font-size: 24px;
}

.music-eyebrow {
  margin: 0 0 2px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

h2 {
  margin: 0;
  border: 0;
  color: #fff;
  font-size: 18px;
  line-height: 1.45;
}

.music-audio {
  display: block;
  width: 100%;
  height: 42px;
  margin: 4px 0 18px;
}

.music-empty {
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.7;
}

.music-playlist {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.music-playlist button,
.music-file-button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 8px 14px;
  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.07);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.music-playlist button:hover,
.music-playlist button.active,
.music-file-button:hover {
  border-color: rgba(171, 152, 255, 0.75);
  color: #fff;
  background: rgba(171, 152, 255, 0.14);
}

.music-file-button {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}

.music-file-button input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}
</style>
