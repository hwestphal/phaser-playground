

<template>
    <div class="cardBox">
        <div class="container">
            <h2>Today is exactly:</h2>
            <h3>{{ getCurrentDate }}</h3>
        </div>
    </div>
</template>


<script>
import { defineComponent } from 'vue'
export const Component = defineComponent({
    // type inference enabled

    name: 'CurrentTime',
    computed: {
        getCurrentDate() {
            const browserLocale =
                navigator.languages && navigator.languages.length
                    ? navigator.languages[0]
                    : navigator.language;
            const intlDateTime = new Intl.DateTimeFormat(
                browserLocale,
                {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                });
            return intlDateTime.format(new Date());
        }
    }
})
</script>