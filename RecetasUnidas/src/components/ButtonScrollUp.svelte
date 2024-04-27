<script lang="ts">
	import { onMount } from 'svelte';

	const handleScrollUp = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};

	onMount(() => {
		const scrollButton = document.getElementById('scrollButton') as HTMLButtonElement;

		window.addEventListener('scroll', () => {
			// Update the bottom style property of the button based on the scroll position
			scrollButton.style.bottom = `${window.scrollY * -1}px`;
		});
	});
</script>

<button on:click={handleScrollUp} id="scrollButton">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(60,128,133,1)"
		><path
			d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM13 12H16L12 8L8 12H11V16H13V12Z"
		></path></svg
	>
</button>

<style>
	button {
		position: absolute;
		border: none;
		width: fit-content;
		height: fit-content;
		border-radius: 5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.8);
		fill: #3c8085;
	}

	button:hover {
		cursor: pointer;
	}

	button svg {
		width: 42px;
		aspect-ratio: 1;
	}
</style>
