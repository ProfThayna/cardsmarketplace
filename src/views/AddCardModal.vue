<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-10">
    <div class="bg-white p-4 rounded-lg shadow-lg relative">
      <button @click="$emit('close')" class="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-900">
        X <!-- Adicionado texto para o botão de fechamento -->
      </button>
      <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Adicionar Carta à Coleção</h3>
      <div v-if="loading">Carregando...</div> <!-- Indicador de carregamento -->
      <div v-else>
        <select v-model="selectedCardId" class="mb-4 p-2 border rounded">
          <option disabled value="">Selecione uma carta</option>
          <option v-for="card in availableCards" :key="card.id" :value="card.id">
            {{ card.name }}
          </option>
        </select>
        <button @click="addCard(selectedCardId)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { httpClient } from '@/utils/httpClient';
export default {
  name: 'AddCardModal',
  data() {
    return {
      availableCards: [],
      selectedCardId: null,
      loading: false,
      page: 1, 
      more: true,
    };
  },
  created() {
    this.fetchAvailableCards();
  },
  methods: {
    async fetchAvailableCards() {
      if (!this.more) return; // Se não houver mais cartas, não busque
      this.loading = true;
      try {
        const response = await httpClient.get('/cards', {
          params: { rpp: 10, page: this.page }
        });
        this.availableCards = [...this.availableCards, ...response.data.list];
        this.more = response.data.more;
        this.page++;
      } catch (error) {
        console.error('Erro ao buscar cartas disponíveis:', error);
        alert('Erro ao buscar cartas disponíveis.');
      } finally {
        this.loading = false;
      }
    },
    async addCard(cardId) {
      if (!cardId) {
        alert('Por favor, selecione uma carta para adicionar.');
        return;
      }
      try {
        await httpClient.post('/me/cards', { cardIds: [cardId] });
        alert('Carta adicionada à coleção com sucesso!');
        this.$emit('close'); // Feche o modal após adicionar com sucesso
      } catch (error) {
        console.error('Erro ao adicionar carta à coleção:', error);
        alert('Erro ao adicionar a carta à coleção. Por favor, tente novamente.');
      }
    }
  },
};
</script>


