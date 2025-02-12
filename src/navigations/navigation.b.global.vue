


<template>

<body class="vertical-layout vertical-menu-modern content-left-sidebar email-application navbar-sticky footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="content-left-sidebar">

<!-- BEGIN: Header-->
<div class="header-navbar-shadow"></div>
<nav class="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top ">
    <div class="navbar-wrapper">
            <NavigationHeader />
       
    </div>
</nav>
<!-- END: Header-->





</body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationHeader from './navigationHeader.vue';

export default defineComponent({
    name: "",
    props: [],
    components: { NavigationHeader }
});
</script>

<style scoped>


</style>


