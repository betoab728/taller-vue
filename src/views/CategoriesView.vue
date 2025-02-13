<template>
    <div class="categories">
        <h1>Categorías</h1>

        <div class="categories-grid">
            <div v-for="category in categories" :key="category.name" class="category-card"
                @click="goToCategory(category.name)">
                <component :is="category.icon" class="category-icon" />
                <h2>{{ category.name }}</h2>
                <p>{{ category.description }}</p>
                <span class="post-count">{{ getPostCount(category.name) }} artículos</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
    Newspaper, Monitor, Trophy, Palette,
    ChevronRight, SlidersHorizontal, Heart,
    Music, Film, MapPin
} from 'lucide-vue-next'

const store = useStore()
const router = useRouter()

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

// Simulamos posts con categorías
const posts = computed(() =>
    store.state.posts.map(post => ({
        ...post,
        category: categories[Math.floor(Math.random() * categories.length)].name,
        date: new Date(Date.now() - Math.random() * 10000000000),
        views: Math.floor(Math.random() * 1000)
    }))
)

const getPostCount = (category) => {
    return posts.value.filter(post => post.category === category).length
}

const goToCategory = (category) => {
    router.push(`/categories/${category}`)
}
</script>

<style scoped>
.categories {
    padding: 2rem;
}

.categories h1 {
    margin-bottom: 2rem;
    text-align: center;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.category-card {
    background-color: var(--card-background);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.category-icon {
    width: 48px;
    height: 48px;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.category-card h2 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.category-card p {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1rem;
}

.post-count {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    background-color: var(--card-background);
    cursor: pointer;
}

.filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: var(--card-background);
    border-radius: 0.5rem;
}

.filter-select,
.date-input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
}

.date-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.post-card {
    background-color: var(--card-background);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.2s;
}

.post-card:hover {
    transform: translateY(-4px);
}

.post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-content {
    padding: 1.5rem;
}

.post-content h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
}

.post-content p {
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1rem;
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    font-weight: 500;
}

@media (max-width: 768px) {
    .categories {
        padding: 1rem;
    }

    .filters {
        flex-direction: column;
    }

    .date-filter {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>