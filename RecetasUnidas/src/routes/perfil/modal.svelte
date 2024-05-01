<script>
    import { createEventDispatcher } from 'svelte';
    import { scale } from 'svelte/transition';
    
    const dispatch = createEventDispatcher();
  
    export let isOpen = false;
    export let src = '';
  
    function close() {
      dispatch('close');
    }
</script>
  
{#if isOpen}
    <div class="modal" on:click={close}>
      <img src={src} alt="Foto de perfil grande" in:scale={{ duration: 300 }} />
    </div>
{/if}
  
<style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    .modal img {
      max-width: 90%;
      max-height: 90%;
    }
</style>