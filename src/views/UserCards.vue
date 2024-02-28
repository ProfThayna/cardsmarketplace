<template>
    <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Minhas Cartas</h2>
        <div class="mb-4">
            <button @click="showAddCardModal = true"
                class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                Adicionar Nova Carta
            </button>
        </div>
        <div v-if="myCards.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="card in myCards" :key="card.id"
                class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h3 class="font-bold text-xl">{{ card.name }}</h3>
                <img :src="card.imageUrl" :alt="`Imagem de ${card.name}`" class="w-full h-48 object-cover mt-2 mb-4">
                <p class="p-4">{{ card.description }}</p>
            </div>
        </div>
        <p v-else class="text-gray-700">Você não tem cartas na sua coleção.</p>

        <!-- Modal para adicionar carta -->
        <add-card-modal v-if="showAddCardModal" @close="showAddCardModal = false" />
    </section>
</template>
  
<script>
import AddCardModal from './AddCardModal.vue';
import { httpClient } from '@/utils/httpClient';

export default {
    components: {
        AddCardModal
    },
    data() {
        return {
            myCards: [],
            showAddCardModal: false,
        };
    },
    created() {
        this.fetchMyCards();
    },
    methods: {
        async fetchMyCards() {
            try {
               const response = await  httpClient.get('/me/cards');
                this.myCards = response.data;
            } catch (error) {
                console.error('Erro ao buscar cartas do usuário:', error);
                this.error = 'Falha ao carregar cartas.';
            }
        },
    },
};
</script>
  