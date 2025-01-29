<template>
    <div class="home">
        <section class="hero">
            <h1>Últimas Noticias</h1>

        </section>

        <div class="posts-grid" v-if="filteredPosts.length">
            <NewsCard v-for="post in filteredPosts" :key="post.id" :post="post" />
        </div>

        <div v-else class="no-results">
            <FileSearch class="no-results-icon" />
            <p>No se encontraron resultados</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { FileSearch } from 'lucide-vue-next'
import NewsCard from '@/components/NewsCard.vue'

const store = useStore()
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const categories = ['Todos', 'Política', 'Tecnología', 'Deportes', 'Cultura']

// Cargar posts al montar el componente
store.dispatch('fetchPosts')

const posts = computed(() => store.state.posts.map(post => ({
    ...post,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
    date: new Date(Date.now() - Math.random() * 10000000000),
    author: 'Autor ' + post.id
})))

const filteredPosts = computed(() => {
    let filtered = posts.value

    if (selectedCategory.value !== 'Todos') {
        filtered = filtered.filter(post => post.category === selectedCategory.value)
    }

    return filtered
})
</script>

<style scoped>
.hero {
    text-align: center;
    margin-bottom: 2rem;
}

.search-bar {
    max-width: 600px;
    margin: 2rem auto;
    position: relative;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color);
    opacity: 0.5;
}

input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid var(--border-color);
    border-radius: 2rem;
    background-color: var(--card-background);
    color: var(--text-color);
}

.categories-filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
}

.category-btn {
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    border: 1px solid var(--border-color);
    background-color: var(--card-background);
    color: var(--text-color);
    cursor: pointer;
    white-space: nowrap;
}

.category-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-card:hover {
    transform: translateY(-4px);
}

.post-image {
    position: relative;
    height: 200px;
}

.post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.category-tag {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
}

.post-content {
    padding: 1.5rem;
}

.post-content h2 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    line-height: 1.4;
}

.post-excerpt {
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1rem;
}

.post-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.8;
}

.post-meta span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.icon {
    width: 16px;
    height: 16px;
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    font-weight: 500;
}

.no-results {
    text-align: center;
    padding: 4rem 0;
    color: var(--text-color);
    opacity: 0.8;
}

.no-results-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .posts-grid {
        grid-template-columns: 1fr;
    }
}
</style>