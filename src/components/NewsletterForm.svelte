<script lang="ts">
import {addSubscriber} from '@utils/newsletter';
// import {onMount} from 'svelte';
import Icon from '@iconify/svelte';

let email: string = "";
let submitted: boolean = false;
let loading: boolean = false;

const handleSubmit = async (e: Event) => {
  loading = true;
  await addSubscriber(email);
  email = "";
  submitted = true;
  loading = false;
};




</script>

<div class="w-full">
  {#if loading}
  <div class="text-gray-300 text-xl text-center flex items-center justify-center max-w-xl rounded-lg border border-dashed border-gray-700 p-8 py-20 mx-auto">
    <Icon icon="streamline:interface-page-controller-loading-half-progress-loading-load-half-wait-waiting" class="animate-spin text-2xl my-8 h-12 w-12 text-sky-400" />
  </div>
  {:else if submitted}
    <div class="text-gray-300 text-xl text-center max-w-xl rounded-lg border border-dashed border-gray-700 p-8 py-20 mx-auto">
      <p class="text-2xl mb-8">🎉</p>
      <p class="">
        Thanks for subscribing! I'll let you know when I publish a new post.
      </p>
    </div>
    {:else}
    <form
    on:submit|preventDefault={handleSubmit}
    class="mx-auto text-center block w-full max-w-xl rounded-lg border border-dashed border-gray-700 p-8"
    >
    <h3 class="mb-4 text-2xl font-bold text-sky-400">
      Want to follow my posts?
    </h3>
    <p class="mb-4 text-gray-400">
      Sign up to get notified when I post something new.
    </p>
    <label for="email-input" class="mb-1 text-left block text-sm text-gray-300"
    >Email</label
    >
    <div class="flex overflow-hidden rounded-md border border-gray-500 shadow-lg">
      <input
      type="email"
      name="email"
      id="email-input"
      bind:value={email}
      class="w-full bg-gray-700 p-2 px-3 text-sky-200 rounded-none"
      required
      />
      <button
      class="border-l border-gray-500 bg-gradient-to-tr from-gray-900 to-gray-800 px-4 py-2 text-sky-200 hover:from-sky-300 hover:to-sky-200 hover:text-sky-800"
      >
      Subscribe
    </button>
  </div>
</form>
{/if}
</div>
