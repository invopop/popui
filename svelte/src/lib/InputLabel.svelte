<script lang="ts">
  interface Props {
    id?: string;
    label?: string;
    [key: string]: any
  }

  let { id = '', label = '', ...rest }: Props = $props();
</script>

<label for={id} class="text-sm font-medium text-neutral-500 mb-2" {...rest}>{label}</label>
