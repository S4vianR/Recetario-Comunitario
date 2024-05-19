<script>
  import { page } from '$app/stores';
  let params;
  page.subscribe(($page) => {
    params = $page.params;
  });
</script>