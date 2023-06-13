<script lang="ts">
import { onMount } from 'svelte'
import WindowHeader from '../WindowHeader.svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let content = ''

const langs =  {
  css: 'css',
  js: 'javascript',
  json: 'json',
  md: 'markdown',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  astro: 'typescript',
  svelte: 'typescript',
} as any;

const getLang = (title: string) => {
  const ext = title.split('.').pop()
  if (!ext) return 'plaintext'
  return langs[ext] || 'plaintext'
}


export let title = ''

let monaco: any

let editor: any
$: if (editor && monaco && content) editor.setModel(monaco.editor.createModel(content, getLang(title)));

let container: HTMLDivElement

const loadEditor = async (container: HTMLElement) => {
  const { initEditor } = await import('./program.ts')
  const e = await initEditor(container)
  monaco = e.monaco
  editor = e.editor
}
onMount(async () => {
  if (shouldLoad) loadEditor(container)

})

export let selected: boolean = false;
$: selectedClasses = selected ? 'border-gray-600' : 'border-gray-700 opacity-90';
const select = (frame: string) => {
  dispatch('select', frame)
}

$: container ? loadEditor(container) : null

export let shouldLoad:boolean = false;
</script>

<div on:click={() => select('EDITOR')} on:keydown={() => select('EDITOR')} class={`rounded-lg min-h-[265px] flex pb-2 flex-col bg-gray-900 overflow-hidden shadow-xl border ${selectedClasses}`}>
  <WindowHeader title={title} />
  <div class="w-full flex-grow h-full relative">
    {#if shouldLoad}
      <div bind:this={container} class="absolute inset-0"></div>
    {/if}
  </div>
</div>

<style>
  :global(.iPadShowKeyboard) {
    display: none !important;
  }
</style>