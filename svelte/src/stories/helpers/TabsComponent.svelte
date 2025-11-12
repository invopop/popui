<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../lib/tabs'

  let value = $state('password')

  let { variant = 'md' }: { variant?: 'md' | 'lg' } = $props()
</script>

<div class="flex flex-col max-h-[200px]">
  <Tabs bind:value class="w-[400px]">
    <TabsList {variant} class="h-8">
      <TabsTrigger {variant} value="account">Account</TabsTrigger>
      <TabsTrigger {variant} value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
</div>

Value: {value}
