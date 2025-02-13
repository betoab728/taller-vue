<template>
    <div class="trending">
        <h1>Tendencias</h1>

        <div class="trending-tabs">
            <button v-for="period in periods" :key="period.value"
                :class="['tab-btn', { active: selectedPeriod === period.value }]"
                @click="selectedPeriod = period.value">
                {{ period.label }}
            </button>
        </div>

        <div class="trending-container">
            <div class="trending-main">
                <h2>Lo más leído</h2>
                <div class="trendingS-posts">
                    <article v-for="(post, index) in trendingPosts" :key="post.id" class="trending-card">
                        <div Sclass="trending-number">{{ index + 1 }}</div>
                        <img :src="`https://picsum.photos/seed/${post.id}/400/300`" :alt="post.title">
                        <div class="trending-content">
                            <span class="trending-category">{{ post.category }}</span>
                            <h3>{{ post.title }}</h3>
                            <div class="trending-meta">
                                <span class="views">
                                    <Eye class="icon" />
                                    {{ formatNumber(post.views) }} lecturas
                                </span>
                                <span class="shares">
                                    <Share2 class="icon" />
                                    {{ formatNumber(post.shares) }} compartidos
                                </span>
                            </div>
                            <router-link :to="'/post/' + post.id" class="read-more">
                                Leer más
                                <ChevronRight class="icon" />
                            </router-link>
                        </div>
                    </article>
                </div>
            </div>

            <div class="trending-sidebar">
                <div class="trending-topics">
                    <h2>Temas del momento</h2>
                    <div class="topics-list">
                        <div v-for="topic in trendingTopics" :key="topic.tag" class="topic-item">
                            <span class="topic-tag">#{{ topic.tag }}</span>
                            <span class="topic-count">{{ formatNumber(topic.count) }} menciones</span>
                        </div>
                    </div>
                </div>

                <div class="engagement-stats">
                    <h2>Estadísticas de engagement</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <Users class="stat-icon" />
                            <div class="stat-info">
                                <span class="stat-label">Lectores activos</span>
                                <span class="stat-value">{{ formatNumber(activeReaders) }}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <MessageSquare class="stat-icon" />
                            <div class="stat-info">
                                <span class="stat-label">Comentarios</span>
                                <span class="stat-value">{{ formatNumber(totalComments) }}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <Share2 class="stat-icon" />
                            <div class="stat-info">
                                <span class="stat-label">Compartidos</span>
                                <span class="stat-value">{{ formatNumber(totalShares) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import {
    Eye, Share2, ChevronRight,
    Users, MessageSquare
} from 'lucide-vue-next'

const store = useStore()

const periods = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' }
]

const selectedPeriod = ref('today')

// Simulamos datos de tendencias
const trendingPosts = computed(() =>
    store.state.posts.slice(0, 5).map(post => ({
        ...post,
        category: ['Tecnología', 'Deportes', 'Cultura'][Math.floor(Math.random() * 3)],
        views: Math.floor(Math.random() * 50000),
        shares: Math.floor(Math.random() * 1000)
    }))
)

const trendingTopics = [
    { tag: 'Tecnología', count: 15234 },
    { tag: 'Deportes', count: 12567 },
    { tag: 'Política', count: 10890 },
    { tag: 'Cultura', count: 8765 },
    { tag: 'Ciencia', count: 7432 }
]

const activeReaders = Math.floor(Math.random() * 10000)
const totalComments = Math.floor(Math.random() * 5000)
const totalShares = Math.floor(Math.random() * 3000)

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}
</script>

<style scoped>
.trending {
    padding: 2rem;
}

.trending h1 {
    margin-bottom: 2rem;
    text-align: center;
}

.trending-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.tab-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    border: 1px solid var(--border-color);
    background-color: var(--card-background);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
}

.tab-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.trending-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

.trending-card {
    display: grid;
    align-items: center;
    grid-template-columns: auto 150px 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
    background-color: var(--card-background);
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    position: relative;
}

.trending-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    align-self: center;
    padding: 0 1rem;
}

.trending-card img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 0.5rem;
}

.trending-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border-radius: 1rem;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.trending-content h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    line-height: 1.4;
}

.trending-meta {
    display: flex;
    gap: 1rem;
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.875rem;
    margin: 0.5rem 0;
}

.views,
.shares {
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

.trending-sidebar {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.trending-topics,
.engagement-stats {
    background-color: var(--card-background);
    border-radius: 1rem;
    padding: 1.5rem;
}

.topics-list {
    margin-top: 1rem;
}

.topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
}

.topic-item:last-child {
    border-bottom: none;
}

.topic-tag {
    color: var(--primary-color);
    font-weight: 500;
}

.topic-count {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.8;
}

.stats-grid {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--background-color);
    border-radius: 0.5rem;
}

.stat-icon {
    width: 24px;
    height: 24px;
    color: var(--primary-color);
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.8;
}

.stat-value {
    font-weight: bold;
    color: var(--text-color);
}

@media (max-width: 1024px) {
    .trending-container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .trending {
        padding: 1rem;
    }

    .trending-card {
        grid-template-columns: auto 1fr;
    }

    .trending-card img {
        display: none;
    }

    .trending-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>