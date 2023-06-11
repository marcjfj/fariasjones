<script lang="ts">
  export let title: string
</script>

<header class="p-4 py-2 border-b border-gray-800 flex items-center">
  <div class="flex gap-2 w-1/4">
    {#each [0,0,0] as _}
      <i class="w-3 h-3 bg-gray-600 rounded-full"></i>
    {/each}
  </div>
  <p class="text-center text-gray-500 w-1/2">{title}</p>
  <div class="w-1/4"></div>
</header>