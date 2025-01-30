<template>
    <div class="categories-filter">
        <button v-for="category in categories" :key="category"
            :class="['category-btn', { active: modelValue === category }]"
            @click="$emit('update:modelValue', category)">
            {{ category }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    categories: {
        type: Array,
        required: true
    },
    modelValue: {
        type: String,
        required: true
    }
})
defineEmits(['update:modelValue'])
</script>