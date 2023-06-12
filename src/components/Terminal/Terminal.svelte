<script lang="ts">
import { onMount } from 'svelte';
import WindowHeader from '../WindowHeader.svelte';
import {runProgram} from './program';
import { createEventDispatcher } from 'svelte';


const dispatch = createEventDispatcher();

export let title = '~/projects';
let input = '';


onMount(async () => {
  runProgram(termElement, input, dispatch);
});

let termElement: HTMLDivElement;

export let selected: boolean = false;
$: borderClass = selected ? 'border-gray-600' : 'border-gray-700';
const select = (type: string) => {
  dispatch('select', type)
}

</script>
<div on:click={() => select('TERMINAL')} on:keydown={() => select('TERMINAL')} class={`rounded-lg min-h-[265px] overflow-hidden bg-gray-900 shadow-xl border ${borderClass}`}>
  <WindowHeader title={title} />
  <div class="p-4">
    <div bind:this={termElement} class="term"></div>
  </div>
</div>