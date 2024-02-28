<template>
    <div class="container mx-auto p-4">
        <header class="my-4">
            <h1 class="text-3xl font-bold text-center">Meu Dashboard</h1>
        </header>

        <UserCards />
        <UserTrades />

        <UserTrades :myTrades="myTrades" @open-trade-modal="openTradeModal" />
    </div>
</template>
  
<script>
import UserCards from './UserCards.vue';
import UserTrades from './UserTrades.vue';


export default {
    name: 'DashboardScreen',
    components: {
        UserCards,
        UserTrades,
    },
};
</script>
  