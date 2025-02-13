<template>
  <div>

    <footer class="footer">
    
      <p>
        &copy; 2025 - All rights reserved
      </p>
    </footer>

  </div>
</template>

<script lang="ts" setup>

</script>

<style>

  .footer {
    background-color: #535c85; ;
    color: var(--color-white);
    padding: 0.5rem 0;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-links {
    display: flex;
    gap: 1rem;
  }

  .footer-links a {
    color: var(--color-white);
    text-decoration: none;
  }

  .footer-social a {
    color: var(--color-white);
    text-decoration: none;
  }

  .footer-social a:hover {
    color: var(--color-secondary);
  }

  .footer-social a + a {
    margin-left: 1rem;
  }

  .footer-social a svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      gap: 1rem;
    }

    .footer-links {
      flex-direction: column;
      gap: 1rem;
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }
  } 


</style>    