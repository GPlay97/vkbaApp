<template lang="html">
  <RadSideDrawer ref="drawer" drawerLocation="Left" :gesturesEnabled="isLoggedIn" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>

<script>
    import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
    
    export default {
        data () {
          return {
            transition: new SlideInOnTopTransition()
          }
        },
        computed: {
          isLoggedIn() {
            return this.$root.isLoggedIn;
          }
        }
  }
</script>

<style lang="css">
</style>
