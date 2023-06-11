<script lang="ts">
  import { onMount } from "svelte";

  let currentDate = new Date();

  // format date like FEBRUARY 1, 2021 04:30:00
  $: formattedDate = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  onMount(() => {
    const interval = setInterval(() => {
      currentDate = new Date();
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="">
  <span class="uppercase font-bold text-center text-xl text-gray-600 opacity-40 whitespace-nowrap">{formattedDate}</span>
</div>
