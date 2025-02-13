<template>
    <div class="post" v-if="currentPost">
        <div class="post-header">
            <img :src="`https://picsum.photos/seed/${currentPost.id}/1200/400`" :alt="currentPost.title"
                class="post-image">
            <div class="post-meta">
                <span class="category">{{ category }}</span>
                <h1>{{ currentPost.title }}</h1>
                <div class="author-info">
                    <div class="author">
                        <User class="icon" />
                        <span>{{ author }}</span>
                    </div>
                    <div class="date">
                        <Calendar class="icon" />
                        <span>{{ formattedDate }}</span>
                    </div>
                    <div class="read-time">
                        <Clock class="icon" />
                        <span>{{ readTime }} min lectura</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="post-content">
            <p>{{ currentPost.body }}</p>

            <div class="share-buttons">
                <button class="share-btn" @click="sharePost">
                    <Share2 class="icon" />
                    Compartir
                </button>
                <button class="bookmark-btn" @click="toggleBookmark">
                    <component :is="isBookmarked ? 'BookmarkMinus' : 'BookmarkPlus'" class="icon" />
                    {{ isBookmarked ? 'Guardado' : 'Guardar' }}
                </button>
            </div>

            <div class="related-posts" v-if="relatedPosts.length">
                <h2>Noticias relacionadas</h2>
                <div class="related-grid">
                    <article v-for="post in relatedPosts" :key="post.id" class="related-card">
                        <img :src="`https://picsum.photos/seed/${post.id}/200/150`" :alt="post.title">
                        <div class="related-content">
                            <h3>{{ post.title }}</h3>
                            <router-link :to="'/post/' + post.id">Leer más</router-link>
                        </div>
                    </article>
                </div>
            </div>
        </div>

        <router-link to="/" class="back-button">
            <ChevronLeft class="icon" />
            Volver a inicio
        </router-link>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { User, Calendar, Share2, BookmarkPlus, BookmarkMinus, ChevronLeft, Clock } from 'lucide-vue-next'

const store = useStore()
const route = useRoute()

const category = ref('Tecnología')
const author = ref('Autor destacado')
const isBookmarked = ref(false)
const readTime = ref(5)
const formattedDate = ref(new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}))

// Cargar post al montar el componente
onMounted(() => {
    store.dispatch('fetchPost', route.params.id)
    store.dispatch('fetchPosts') // Para las noticias relacionadas
})

const currentPost = computed(() => store.state.currentPost)

const relatedPosts = computed(() => {
    const allPosts = store.state.posts
    return allPosts
        .filter(post => post.id !== currentPost.value?.id)
        .slice(0, 3)
})

const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value
    // Aquí podrías agregar lógica para guardar en localStorage o en una base de datos
}

const sharePost = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: currentPost.value.title,
                text: currentPost.value.body.slice(0, 100) + '...',
                url: window.location.href
            })
        } catch (err) {
            console.error('Error al compartir:', err)
        }
    } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.href)
    }
}
</script>

<style scoped>
.post {
    margin: 0 auto;
    padding: 20px;
}

.post-header {
    margin-bottom: 2rem;
}

.post-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 1rem;
}

.post-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.category {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.post-meta h1 {
    font-size: 2.5rem;
    margin: 0.5rem 0 1rem;
    line-height: 1.2;
    text-align: center;
}

.author-info {
    display: flex;
    gap: 2rem;
    align-items: center;
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.9rem;
}

.author,
.date,
.read-time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.icon {
    width: 18px;
    height: 18px;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color);
}

.share-buttons {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
}

.share-btn,
.bookmark-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    border: 1px solid var(--border-color);
    background-color: var(--card-background);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
}

.share-btn:hover,
.bookmark-btn:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.related-posts {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
}

.related-posts h2 {
    margin-bottom: 1.5rem;
}

.related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.related-card {
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: var(--card-background);
    transition: transform 0.2s;
}

.related-card:hover {
    transform: translateY(-4px);
}

.related-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.related-content {
    padding: 1rem;
}

.related-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    line-height: 1.4;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    background-color: var(--card-background);
    color: var(--text-color);
    transition: all 0.2s;
}

.back-button:hover {
    background-color: var(--primary-color);
    color: white;
}

@media (max-width: 768px) {
    .post {
        padding: 10px;
    }

    .post-meta h1 {
        font-size: 2rem;
    }

    .author-info {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    .post-image {
        height: 250px;
    }

    .related-grid {
        grid-template-columns: 1fr;
    }
}
</style>