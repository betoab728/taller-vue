<template>
    <article class="post-card">
        <div class="post-image">
            <img :src="`https://picsum.photos/seed/${post.id}/400/300`" :alt="post.title">
            <span class="category-tag">{{ post.category }}</span>
        </div>
        <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p class="post-excerpt">{{ excerpt(post.body) }}</p>
            <div class="post-meta">
                <span class="post-date">
                    <Calendar class="icon" />
                    {{ formatDate(post.date) }}
                </span>
                <span class="post-author">
                    <User class="icon" />
                    {{ post.author }}
                </span>
            </div>
            <router-link :to="'/post/' + post.id" class="read-more">
                Leer más
                <ChevronRight class="icon" />
            </router-link>
        </div>
    </article>
</template>

<script setup>
import { Calendar, User, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const excerpt = (text) => {
    return text.slice(0, 100) + '...'
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date)
}
</script>