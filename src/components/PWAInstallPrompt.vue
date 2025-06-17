<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
    <div class="flex items-center space-x-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Instalar App</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">Instale o South Tracker para acesso rápido</p>
      </div>
      <div class="flex space-x-2">
        <button
          @click="installPWA"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Instalar
        </button>
        <button
          @click="dismissPrompt"
          class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          Depois
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  console.log('PWAInstallPrompt montado')
  
  // Verifica se o navegador suporta PWA
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker não suportado neste navegador')
    return
  }

  // Verifica se já está instalado
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App já está instalado')
    return
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Evento beforeinstallprompt capturado')
    e.preventDefault()
    deferredPrompt = e
    showInstallPrompt.value = true
  })

  window.addEventListener('appinstalled', () => {
    console.log('App instalado com sucesso')
    showInstallPrompt.value = false
    deferredPrompt = null
  })
})

const installPWA = async () => {
  console.log('Tentando instalar PWA')
  if (!deferredPrompt) {
    console.log('Nenhum prompt de instalação disponível')
    return
  }

  try {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    console.log('Resultado da instalação:', outcome)
    if (outcome === 'accepted') {
      console.log('PWA instalado com sucesso!')
    } else {
      console.log('Usuário recusou a instalação')
    }
  } catch (error) {
    console.error('Erro durante a instalação:', error)
  }
  
  deferredPrompt = null
  showInstallPrompt.value = false
}

const dismissPrompt = () => {
  console.log('Prompt de instalação descartado')
  showInstallPrompt.value = false
}
</script> 