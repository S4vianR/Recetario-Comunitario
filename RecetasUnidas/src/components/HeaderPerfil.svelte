<script lang="ts">
    import { onMount } from "svelte";
    let contextMenu =
      (document.getElementById("contextMenu") as HTMLElement) || null;
    let esVisible = false;
  
    onMount(() => {
      contextMenu =
        (document.getElementById("contextMenu") as HTMLElement) || null;
      contextMenu.classList.add("hidden");
    });
  
    const imgClick = () => {
      if (esVisible == false) {
        esVisible = true;
        contextMenu.classList.add("visible");
        contextMenu.classList.remove("hidden");
        console.log(esVisible);
      } else if (esVisible == true) {
        esVisible = false;
        contextMenu.classList.add("hidden");
        contextMenu.classList.remove("visible");
        console.log(esVisible);
      }
    };
  
    const reload = () => {
        location.href = "/feed";
    };
  </script>
  
  <header>
    <section>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img src="/Logo.jpg" alt="" width="50" height="50" on:click={reload}/>
    </section>
    <section>
      <button on:click={imgClick}>
        <img
          src="/user-icon-2-icon-original.svg"
          alt=""
          width="50"
          height="50"
          id="userLogo"
          title="Usuario"
        />
      </button>
    </section>
    <section id="contextMenu" class="hidden">
      <ul>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <li><a href="/perfil">Perfil</a></li>
        <li><a href="/">Cerrar Sesión</a></li>
      </ul>
    </section>
  </header>
  
  <style>
    :root {
      /* 
          Color palette 1
          ---------
          1. #194320
          2. #FF8822
          3. #FFC2B4
          4. #9DBEB9
          5. #F8DE22
          6. #FFE569
      */
      --main-green: #194320;
      --main-salmon: #ff8822;
      --main-yellow: #f8de22;
      --secondary-salmon: #ffc2b4;
      --secondary-green: #9dbeb9;
      --secondary-yellow: #ffe569;
      --off-white: #faf9f6;
      --nyanza: #ecffdc;
    }
  
    .hidden {
      visibility: hidden;
    }
  
    .visible {
      display: block;
      visibility: visible;
    }
  
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
      border-bottom: 2px solid #cecece;
      height: 8svh;
      position: relative;
    }
  
    header section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      position: relative;
    }
  
    header section:nth-child(1) img {
      border: 1px solid #9e9e9e;
      border-radius: 0.5rem;
    }
  
    header section:nth-child(1) img:hover {
      cursor: pointer;
    }
  
    header section:nth-child(2) button {
      background-color: transparent;
      border: none;
    }
  
    header section:nth-child(2) img {
      transition: transform 0.3s ease-in-out;
    }
  
    header section:nth-child(2) img:hover {
      cursor: pointer;
      transform: scale(0.9);
    }
  
    header #contextMenu {
      position: absolute;
      background-color: #cecece;
      border: 1px solid #a0a0a0;
      border-radius: 1rem;
      top: 3.875rem;
      left: 111rem;
    }
  
    header #contextMenu > ul {
      list-style: none;
      padding: 1rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
    }
  
    header #contextMenu > ul > li > a {
      text-decoration: none;
      color: #000;
    }
  
    header #contextMenu > ul > li:hover {
      text-decoration: underline;
    }
  </style>
  