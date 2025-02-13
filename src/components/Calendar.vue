<template>
    <div class="calendar">
        <div class="weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="days">
            <div v-for="day in days" :key="day.value" class="day" :class="{
                'current': day.isCurrent,
                'inactive': !day.isCurrentMonth
            }">
                {{ day.value }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calendar',
    data() {
        return {
            weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            days: [
                // Ejemplo de datos para diciembre
                ...Array.from({ length: 4 }, (_, i) => ({
                    value: 27 + i,
                    isCurrentMonth: false,
                    isCurrent: false
                })),
                ...Array.from({ length: 31 }, (_, i) => ({
                    value: i + 1,
                    isCurrentMonth: true,
                    isCurrent: i === 17 // día 18 como actual
                }))
            ]
        }
    }
}
</script>

<style scoped>
.calendar {
    background: white;
    border-radius: 4px;
    padding: 10px;
}

.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;
}

.weekday {
    text-align: center;
    font-weight: 500;
    font-size: 0.9rem;
    color: #666;
    padding: 5px;
}

.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.day {
    text-align: center;
    padding: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 4px;
}

.day:hover:not(.inactive) {
    background: #f0f0f0;
}

.current {
    background: #1a73e8;
    color: white;
}

.inactive {
    color: #ccc;
}
</style>