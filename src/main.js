import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import App from './App.vue'

// Configuración de Axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

// Store
const store = createStore({
  state() {
    return {
      posts: [],
      currentPost: null,
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setCurrentPost(state, post) {
      state.currentPost = post
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('/posts')
        commit('setPosts', response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    async fetchPost({ commit }, id) {
      try {
        const response = await axios.get('/posts/${id}')
        commit('setCurrentPost', response.data)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }
  }
})

// Router
const routes = [
  {
    path: '/',
    component: () => import('./views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Crear aplicación
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')