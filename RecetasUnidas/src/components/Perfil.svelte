<script lang="ts">
  import { onMount } from "svelte";
  import HeaderPerfil from "./HeaderPerfil.svelte";
  const userName = "Usuario 1";
  const userEmail = "user@user1.com";
  const passwd = "1234";

  let verPasswd =
    (document.getElementById("verPasswd") as HTMLInputElement) || null;
  let passwdUsuario =
    (document.getElementById("passwdUsuario") as HTMLInputElement) || null;

  onMount(() => {
    verPasswd = document.getElementById("verPasswd") as HTMLInputElement;
    passwdUsuario = document.getElementById("passwd") as HTMLInputElement;
  });

  const verPasswdClick = () => {
    if (verPasswd.checked) {
      passwdUsuario.type = "text";
    } else {
      passwdUsuario.type = "password";
    }
  };
  

  const editar = (e:any)=>{
    e.preventDefault();
    const userInput = document.getElementById("user") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwdInput = document.getElementById("passwd") as HTMLInputElement;
    userInput.disabled = false;
    emailInput.disabled = false;
    passwdInput.disabled = false;
  
  }

  const confirmar = (e:any)=>{
    e.preventDefault();
    // Alert con pregunta de confirmación
    window.confirm("¿Estás seguro de que quieres cambiar tus datos?");
    if (window.confirm) {
      const userInput = document.getElementById("user") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwdInput = document.getElementById("passwd") as HTMLInputElement;
      userInput.disabled = true;
      emailInput.disabled = true;
      passwdInput.disabled = true;
    }
  }
</script>

<main>
  <HeaderPerfil />
  <section id="mainSection">
    <div>
      <img
        src="/user-icon-2-icon-original.svg"
        alt=""
        width="85"
        height="85"
        id="userLogo"
        title="Usuario"
      />
      <div>
        <h3>{userName}</h3>
      </div>
    </div>
    <div>
      <form action="#" method="post">
        <div>
          <label for="user">Usuario</label>
          <input type="text" name="user" id="user" value={userName} disabled />
        </div>
        <div>
          <label for="email">Correo</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            disabled
          />
        </div>
        <div>
          <label for="passwd">Contraseña</label>
          <input
            type="password"
            name="passwd"
            id="passwd"
            value={passwd}
            disabled
          />
          <input
            type="checkbox"
            name="verPasswd"
            id="verPasswd"
            on:click={verPasswdClick}
          />
        </div>
        <div>
          <button on:click={editar}> Editar </button>
          <button on:click={confirmar}> Confirmar </button>
        </div>
      </form>
    </div>
  </section>
</main>

<style>
  #mainSection {
    border: 1px solid #cecece;
    margin: 2rem;
    padding: 5rem;
  }

  #userLogo {
    border-radius: 50%;
    border: 1px solid #cecece;
  }

  #mainSection > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5rem;
  }
</style>
