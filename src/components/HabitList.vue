<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Meus Hábitos</h1>
      <button
        @click="isAddingHabit = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        + Novo Hábito
      </button>
    </div>

    <!-- Lista de Hábitos -->
    <div class="space-y-4">
      <div
        v-for="habit in habits"
        :key="habit.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all hover:shadow-lg"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 text-left w-full">
            <span class="text-2xl flex-shrink-0">{{ habit.emoji }}</span>
            <div class="text-left flex-grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white text-left">{{ habit.name }}</h3>
            </div>
          </div>
          <div class="flex items-center space-x-2 flex-shrink-0 ml-4">
            <button
              @click="toggleHabit(habit.id)"
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                isHabitCompleted(habit.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ isHabitCompleted(habit.id) ? 'Concluído' : 'Marcar' }}
            </button>
            <button
              @click="removeHabit(habit.id)"
              class="text-red-500 hover:text-red-600 transition-colors"
            >
              <span class="sr-only">Remover</span>
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Novo Hábito -->
    <div
      v-if="isAddingHabit"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Novo Hábito</h2>
        <form @submit.prevent="addHabit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
              Emoji
            </label>
            <div class="relative">
              <input
                v-model="newHabit.emoji"
                type="text"
                class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-left"
                placeholder="Ex: 📚"
                required
                @focus="showEmojiPicker = true"
              />
              <div v-if="showEmojiPicker" class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                <div class="p-2 grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                  <button
                    v-for="emoji in emojis"
                    :key="emoji"
                    @click="selectEmoji(emoji)"
                    class="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  >
                    {{ emoji }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
              Hábito
            </label>
            <input
              v-model="newHabit.name"
              type="text"
              class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-left"
              placeholder="Ex: Ler 10 páginas"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="isAddingHabit = false"
              class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Habit {
  id: number
  emoji: string
  name: string
}

interface CompletedHabit {
  habitId: number
  date: string
}

const habits = ref<Habit[]>([])
const completedHabits = ref<CompletedHabit[]>([])
const isAddingHabit = ref(false)
const showEmojiPicker = ref(false)
const newHabit = ref({
  emoji: '',
  name: ''
})

// Lista de emojis comuns para hábitos
const emojis = [
  '🚶♂️', '🏃♂️', '💪', '🧘♂️', '🧘♀️', '🏋️♂️',
  '📚', '✍️', '🎯', '💡', '🎨', '🎵',
  '💧', '🥗', '🍎', '🥤', '☕', '🍵',
  '😴', '🌙', '🌅', '🌞', '⭐', '✨',
  '🎮', '🎲', '🎭', '🎪', '🎨', '🎬',
  '📝', '📅', '⏰', '🎯', '✅', '📈'
]

// Mock inicial de hábitos
const initialHabits: Habit[] = [
  { id: 1, emoji: '🚶♂️', name: 'Caminhar 30 minutos' },
  { id: 2, emoji: '📖', name: 'Ler 10 páginas' },
  { id: 3, emoji: '💧', name: 'Beber 2 litros de água' }
]

onMounted(() => {
  habits.value = initialHabits
})

const selectEmoji = (emoji: string) => {
  newHabit.value.emoji = emoji
  showEmojiPicker.value = false
}

const addHabit = () => {
  const habit: Habit = {
    id: Date.now(),
    emoji: newHabit.value.emoji,
    name: newHabit.value.name
  }
  habits.value.push(habit)
  newHabit.value = { emoji: '', name: '' }
  isAddingHabit.value = false
}

const removeHabit = (id: number) => {
  habits.value = habits.value.filter(habit => habit.id !== id)
  completedHabits.value = completedHabits.value.filter(habit => habit.habitId !== id)
}

const toggleHabit = (id: number) => {
  const today = new Date().toISOString().split('T')[0]
  const existingCompletion = completedHabits.value.find(
    habit => habit.habitId === id && habit.date === today
  )

  if (existingCompletion) {
    completedHabits.value = completedHabits.value.filter(
      habit => !(habit.habitId === id && habit.date === today)
    )
  } else {
    completedHabits.value.push({ habitId: id, date: today })
  }
}

const isHabitCompleted = (id: number): boolean => {
  const today = new Date().toISOString().split('T')[0]
  return completedHabits.value.some(
    habit => habit.habitId === id && habit.date === today
  )
}
</script> 