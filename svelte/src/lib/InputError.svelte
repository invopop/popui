<script lang="ts">
  import type { InputErrorProps } from './types'

  let { errorText = '' }: InputErrorProps = $props()
</script>

<p class="mt-2 text-sm text-danger-500 flex items-center space-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM7.99999 9.35C7.66862 9.35 7.39999 9.08137 7.39999 8.75V4.75C7.39999 4.41863 7.66862 4.15 7.99999 4.15C8.33137 4.15 8.59999 4.41863 8.59999 4.75L8.59999 8.75C8.59999 9.08137 8.33136 9.35 7.99999 9.35ZM8.75 11C8.75 11.4142 8.41421 11.75 8 11.75C7.58579 11.75 7.25 11.4142 7.25 11C7.25 10.5858 7.58579 10.25 8 10.25C8.41421 10.25 8.75 10.5858 8.75 11Z"
      fill="currentColor"
    />
  </svg>
  <span>{errorText}</span>
</p>
