<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../lib/tabs'

  let value = 'password'
</script>

<Tabs bind:value class="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
{value}
