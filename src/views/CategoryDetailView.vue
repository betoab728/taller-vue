<template>
    <div class="categories">
        <div class="category-header">
            <h2>{{ category }}</h2>
            <button class="filter-btn" @click="showFilters = !showFilters">
                <SlidersHorizontal class="icon" />
                Filtros
            </button>
        </div>

        <div v-if="showFilters" class="filters">
            <select v-model="sortBy" class="filter-select">
                <option value="date">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="title">Alfabético</option>
            </select>

            <div class="date-filter">
                <input type="date" v-model="dateFrom" class="date-input">
                <span>hasta</span>
                <input type="date" v-model="dateTo" class="date-input">
            </div>
        </div>

        <div class="posts-grid">
            <article v-for="post in filteredPosts" :key="post.id" class="post-card">
                <img :src="`https://picsum.photos/seed/${post.id}/400/300`" :alt="post.title">
                <div class="post-content">
                    <h3>{{ post.title }}</h3>
                    <p>{{ excerpt(post.body) }}</p>
                    <router-link :to="'/post/' + post.id" class="read-more">
                        Leer más
                        <ChevronRight class="icon" />
                    </router-link>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
    Newspaper, Monitor, Trophy, Palette,
    ChevronRight, SlidersHorizontal, Heart,
    Music, Film, MapPin
} from 'lucide-vue-next'

const store = useStore()
const route = useRoute()

const categories = [
    {
        name: 'Tecnología',
        icon: Monitor,
        description: 'Últimas novedades en tecnología y ciencia'
    },
    {
        name: 'Deportes',
        icon: Trophy,
        description: 'Actualidad deportiva y resultados'
    },
    {
        name: 'Cultura',
        icon: Palette,
        description: 'Arte, literatura y eventos culturales'
    },
    {
        name: 'Entretenimiento',
        icon: Film,
        description: 'Cine, series y espectáculos'
    },
    {
        name: 'Música',
        icon: Music,
        description: 'Novedades musicales y conciertos'
    },
    {
        name: 'Local',
        icon: MapPin,
        description: 'Noticias de tu ciudad'
    }
]

const category = computed(() => route.params.category)
const showFilters = ref(false)
const sortBy = ref('date')
const dateFrom = ref('')
const dateTo = ref('')

// Simulamos posts con categorías
const posts = computed(() =>
    store.state.posts.map(post => ({
        ...post,
        category: categories[Math.floor(Math.random() * categories.length)].name,
        date: new Date(Date.now() - Math.random() * 10000000000),
        views: Math.floor(Math.random() * 1000)
    }))
)

const filteredPosts = computed(() => {
    let filtered = posts.value.filter(post => post.category === category.value)

    if (dateFrom.value && dateTo.value) {
        filtered = filtered.filter(post => {
            const postDate = new Date(post.date)
            return postDate >= new Date(dateFrom.value) &&
                postDate <= new Date(dateTo.value)
        })
    }

    switch (sortBy.value) {
        case 'date':
            return filtered.sort((a, b) => b.date - a.date)
        case 'popular':
            return filtered.sort((a, b) => b.views - a.views)
        case 'title':
            return filtered.sort((a, b) => a.title.localeCompare(b.title))
        default:
            return filtered
    }
})

const excerpt = (text) => {
    return text.slice(0, 100) + '...'
}
</script>

<style scoped>
.categories {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 10px;
}

.category-header h2 {
    font-size: 2rem;
    color: var(--text-color);
    margin: 0;
}

.filter-btn {
    display: flex;
    align-items: center;
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 10px 15px;
    cursor: pointer;
    color: var(--text-color);
    transition: background-color 0.3s ease;
}

.filter-btn .icon {
    margin-right: 8px;
    stroke-width: 2;
    color: var(--primary-color);
}

.filter-btn:hover {
    background-color: var(--border-color);
}

.filters {
    background-color: var(--card-background);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--border-color);
}

.filter-select {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 1rem;
    min-width: 200px;
}

.date-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
}

.date-input {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 1rem;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.post-card {
    background-color: var(--card-background);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: transform 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-content {
    padding: 15px;
}

.post-content h3 {
    margin-top: 0;
    color: var(--text-color);
    font-size: 1.2rem;
}

.read-more {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    text-decoration: none;
    margin-top: 10px;
}

.read-more .icon {
    margin-left: 5px;
    stroke-width: 2;
    color: var(--primary-color);
}

@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        gap: 15px;
    }

    .filter-select,
    .date-input {
        width: 100%;
    }

    .posts-grid {
        grid-template-columns: 1fr;
    }
}
</style>