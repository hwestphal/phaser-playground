<template>
    <h1>Home Page</h1>
    <HelloWorld @greet="greet" />
</template>


<script>
import HelloWorld from "../components/CurrentTime";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  methods: {
    greet(name) {
      console.log(`hello world ${name}`);
    },
  },
};
</script>