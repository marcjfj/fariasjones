<script lang="ts">
  import { onMount } from 'svelte'
  import WindowHeader from '../WindowHeader.svelte';
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let content = `export default {
    name:       'Marc Farias Jones',
    specialty:  'Software Development',
    contact: {
      email:    'marc@fariasjones.com',
      linkedIn: 'https://linkedin.com/in/marcjfj',
      github:   'https://github.com/marcjfj'
    }
  }`

  export let lang = 'typescript'

  export let title = 'marc.ts'
  
  let container: HTMLDivElement
  onMount(async () => {
    const monaco = await import('monaco-editor')
    const {default:editorWorker} = await import('monaco-editor/esm/vs/editor/editor.worker?worker')
    const {default:jsonWorker} = await import('monaco-editor/esm/vs/language/json/json.worker?worker')
    const {default:cssWorker} = await import('monaco-editor/esm/vs/language/css/css.worker?worker')
    const {default:htmlWorker} = await import('monaco-editor/esm/vs/language/html/html.worker?worker')
    const {default:tsWorker} = await import('monaco-editor/esm/vs/language/typescript/ts.worker?worker')

  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker()
      }
      return new editorWorker()
    }
  }
  
  const editor = monaco.editor.create(container, {
    value: content,
    language: lang,
    fontSize: window.innerWidth < 768 ? 10 : 12,
    fontFamily: 'IBM Plex Mono',
    fontLigatures: true,
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontWeight: '300',
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    
  })
  const {theme} = await import('./theme');
  monaco.editor.defineTheme('theme', theme)
  monaco.editor.setTheme('theme')

  const contentHeight = monaco.editor.getModels()[0].getLineCount() * (window.innerWidth < 768 ? 20 : 22);
  container.style.height = `${contentHeight}px`;

})

export let selected: boolean = false;
$: borderClass = selected ? 'border-gray-600' : 'border-gray-700';
const select = (frame: string) => {
  dispatch('select', frame)
}
</script>

<div on:click={() => select('EDITOR')} on:keydown={() => select('EDITOR')} class={`rounded-lg min-h-[257px] flex pb-4 flex-col bg-gray-900 overflow-hidden shadow-xl border ${borderClass}`}>
  <WindowHeader title={title} />
  <div bind:this={container} class="w-full h-full">
  </div>

</div>

<style>
  :global(.iPadShowKeyboard) {
    display: none !important;
  }
</style>