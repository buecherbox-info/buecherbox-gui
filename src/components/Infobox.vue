<template>
    <div>
        <h1>Hallo Welt</h1>
        <p>Wie geht es dir?</p>
    </div>
</template>

<script>
  export default {
    name: "Infobox",
    props: {
      map: Object,
      coordinates: Object
    }
  }
</script>

<style scoped>

</style>
