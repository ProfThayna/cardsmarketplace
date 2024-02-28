<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-4 rounded-lg shadow-lg relative">
        <button @click="$emit('close')" class="absolute top-0 right-0 m-3">
          X
        </button>
        <h3 class="text-lg font-medium leading-6 text-gray-900">Criar/Editar Solicitação de Troca</h3>
        <form @submit.prevent="submitTrade">
          <div class="mt-2">
            <label class="block text-sm font-bold mb-2" for="offerCards">Cartas para Oferecer:</label>
            <select multiple v-model="offeredCards" id="offerCards" class="border rounded p-2 w-full">
              <option v-for="card in myCards" :key="card.id" :value="card.id">{{ card.name }}</option>
            </select>
          </div>
          <div class="mt-2">
            <label class="block text-sm font-bold mb-2" for="receiveCards">Cartas Desejadas:</label>
            <select multiple v-model="requestedCards" id="receiveCards" class="border rounded p-2 w-full">
              <option v-for="card in availableCards" :key="card.id" :value="card.id">{{ card.name }}</option>
            </select>
          </div>
          <button type="submit" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Salvar Solicitação
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { httpClient } from '@/utils/httpClient';
  
  export default {
    data() {
      return {
        myCards: [], // Cartas do usuário para oferecer
        availableCards: [], // Cartas disponíveis para solicitar
        offeredCards: [], // IDs das cartas oferecidas
        requestedCards: [], // IDs das cartas desejadas
      };
    },
    async created() {
      await this.fetchMyCards();
      await this.fetchAvailableCards();
    },
    methods: {
      async fetchMyCards() {
        try {
          const response = await httpClient.get('/me/cards');
          this.myCards = response.data;
        } catch (error) {
          console.error('Erro ao buscar minhas cartas:', error);
        }
      },
      async fetchAvailableCards() {
        try {
          const response = await httpClient.get('/cards', { params: { rpp: 15} }); 
          this.availableCards = response.data.list;
        } catch (error) {
          console.error('Erro ao buscar cartas disponíveis:', error);
        }
      },
      async submitTrade() {
        const tradeData = {
          cards: [
            ...this.offeredCards.map(id => ({ cardId: id, type: 'OFFERING' })),
            ...this.requestedCards.map(id => ({ cardId: id, type: 'RECEIVING' }))
          ]
        };
        try {
          await httpClient.post('/trades', tradeData);
          alert('Solicitação de troca criada com sucesso!');
          this.$emit('close'); // Fecha o modal
          // Aqui você pode querer emitir um evento ou chamar um método para atualizar a lista de trocas no componente pai
        } catch (error) {
          console.error('Erro ao criar solicitação de troca:', error);
          alert('Falha ao criar solicitação de troca.');
        }
      }
    },
  };
  </script>
  