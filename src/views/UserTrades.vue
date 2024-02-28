<template>
    <section>
      <h2 class="text-2xl font-bold mb-4">Minhas Solicitações de Troca</h2>
      <div class="mb-4">
        <button @click="showTradeModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Criar Solicitação de Troca
        </button>
      </div>
      <div v-if="myTrades.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="trade in myTrades" :key="trade.id" class="border p-4 rounded-lg shadow-md">
          <h3 class="font-bold">{{ trade.title }}</h3>
          <p>{{ trade.description }}</p>
          <!-- Detalhes e botões de ação para cada solicitação -->
          <button class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Ver Detalhes</button>
          <button class="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Editar</button>
          <button @click="handleCancelTrade(trade.id)" class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar</button>
        </div>
      </div>
      <p v-else class="text-gray-700">Você não tem solicitações de troca.</p>
  
      <!-- Modal de troca -->
      <trade-modal v-if="showTradeModal" @close="showTradeModal = false" />
    </section>
  </template>
  
  <script>
  import TradeModal from './TradeModal.vue';
  import { httpClient } from '@/utils/httpClient';
  
  export default {
    components: {
      TradeModal
    },
    data() {
      return {
        myTrades: [],
        showTradeModal: false,
      };
    },
    created() {
      this.fetchMyTrades();
    },
    methods: {
      async fetchMyTrades() {
        try {
          const response = await httpClient.get('/trades');
          this.myTrades = response.data; // Ajuste de acordo com a estrutura real da sua API
        } catch (error) {
          console.error('Erro ao buscar solicitações de troca:', error);
        }
      },
      async handleCancelTrade(tradeId) {
        try {
          await httpClient.delete(`/trades/${tradeId}`);
          alert('Solicitação de troca cancelada com sucesso.');
          this.fetchMyTrades(); // Atualiza a lista de trocas após o cancelamento
        } catch (error) {
          console.error('Erro ao cancelar solicitação de troca:', error);
          alert('Erro ao cancelar a solicitação de troca.');
        }
      },
      // Implemente outros métodos conforme necessário
    },
  };
  </script>
  