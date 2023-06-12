<script lang="ts">
  import { onMount } from 'svelte'
  import WindowHeader from '../WindowHeader.svelte';
  import { createEventDispatcher } from 'svelte';
  import {initEditor} from './program.ts';

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
  onMount(async () => {
    const e = await initEditor(container)
    monaco = e.monaco
    editor = e.editor

})

export let selected: boolean = false;
$: borderClass = selected ? 'border-gray-600' : 'border-gray-700';
const select = (frame: string) => {
  dispatch('select', frame)
}
</script>

<div  on:click={() => select('EDITOR')} on:keydown={() => select('EDITOR')} class={`rounded-lg min-h-[257px] flex pb-4 flex-col bg-gray-900 overflow-hidden shadow-xl border ${borderClass}`}>
  <WindowHeader title={title} />
  <div class="w-full flex-grow h-full relative">
    <div bind:this={container} class="absolute inset-0">
    </div>
  </div>
</div>

<style>
  :global(.iPadShowKeyboard) {
    display: none !important;
  }
</style>