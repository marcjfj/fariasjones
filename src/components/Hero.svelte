<script lang="ts">
import Editor from "./Editor/Editor.svelte";
import Terminal from "./Terminal/Terminal.svelte";
import data from "@data/hero";
import 'iconify-icon'

let selected = 'TERMINAL'

let selectedFile: any = null;


const select = ({detail}: {detail: string}) => {
  selected = detail;
}

const openFile = async ({detail}: any) => {
  selected = 'EDITOR'
  selectedFile = detail.file;
  const res = await fetch(selectedFile.url);
  const data = await res.json();
  selectedFile.content = atob(data.content);
}

$: positionClass = {
  EDITOR: selected === 'EDITOR' ? 'z-20' : 'z-0',
  TERMINAL: selected === 'TERMINAL' ? 'z-20' : 'z-0',
}

</script>

<section
  class="relative z-10 mx-auto flex w-full max-w-6xl grid-cols-12 flex-col-reverse items-center justify-center p-4 lg:grid min-h-screen lg:items-center lg:gap-4 lg:p-0"
>
  <div
    class="hidden -mb-20 w-full max-w-2xl lg:col-span-6 lg:mb-16 lg:block xl:col-span-6"
  >
    <div class={`relative ${positionClass.EDITOR} w-full lg:-ml-8 lg:mr-24 lg:w-auto`}>
      <div
        class="absolute pointer-events-none -right-8 -top-8 hidden h-12 w-12 rounded-tr-2xl border-r-8 border-t-8 border-gray-700 md:block"
      >
      </div>
      <Editor on:select={select}  selected={selected === 'EDITOR'} title={selectedFile?.path || ''} content={selectedFile?.content || undefined} />
    </div>
    <div class={`relative ${positionClass.TERMINAL} -mt-8 ml-8 mr-8 lg:w-auto`}>
      <Terminal on:open={openFile} on:select={select} selected={selected === 'TERMINAL'} />
      <div
        class="absolute pointer-events-none -bottom-8 -left-8 h-12 w-12 rounded-bl-2xl border-b-8 border-l-8 border-gray-700"
      >
      </div>
    </div>
  </div>
  <div class="col-span-6 max-w-lg ml-4 mt-12 lg:mb-32 lg:pr-10 xl:ml-12 xl:pr-0">
    <h1 class="mb-4 text-5xl font-bold text-sky-200 md:text-6xl">
      {data.title}
    </h1>
    <h2 class="mb-4 text-xl text-sky-400 md:text-3xl">
      {data.subtitle}
    </h2>
    <p
      class="leading-14 mb-8 max-w-2xl font-light text-gray-400 md:text-lg lg:text-xl"
    >
      {data.intro}
    </p>
    <ul class="-ml-2 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
      {#each data.links as link}
      <li>
        <a
          target="_blank"
          href={link.url}
          class="flex items-center gap-2 rounded border border-transparent from-gray-800 to-gray-700 p-2 transition-all hover:border-gray-600 hover:bg-gradient-to-tr hover:shadow-inner"
        >
          <iconify-icon height="24" icon={link.icon} class="h-6 w-6 text-sky-400" />
          <span class="text-sky-200">{link.name}</span>
        </a>
      </li>
      {/each}
    </ul>
  </div>
</section>
