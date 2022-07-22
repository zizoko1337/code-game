<template>
  <div class="help">
    <h3>Use array methods to get clients their orders.</h3>
    <p><span class="method-display">at(📌)</span>, 📌 = index of array</p>
    <p><span class="method-display">shift()</span>, returns at first item of array.</p>
    <p><span class="method-display">pop()</span>, returns last item of array</p>
    <p><span class="method-display">splice(📌,💼)</span>, 📌 = index of array. 💼 = amount of items, you want to return</p>
  </div>
</template>

<script>
export default {
  name: 'HelpInstructions',
};
</script>

<style scoped>
.help {
  transform: translate(50%, 15%);
  width: 50%;
  border: 3px solid rgb(76, 76, 76);
}
.method-display {
  font-weight: 600;
  color: black;
}
</style>
