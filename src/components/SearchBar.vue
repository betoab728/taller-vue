<template>
    <div class="search-bar">
        <Search class="search-icon" />
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            placeholder="Buscar noticias...">
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>