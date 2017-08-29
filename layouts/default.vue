<template>
  <div> 
  <b-header></b-header>
      <div class="main-container container-fluid">
        <div class="page-container">
       <!-- Page Sidebar -->
        <b-menu></b-menu>
            <!-- /Page Sidebar -->
            <!-- Page Content -->
            <div class="page-content">
                <!-- Page Breadcrumb -->
                <div class="page-breadcrumbs">
                    <ul class="breadcrumb">
                                        <li class="active">控制面板</li>
                                        </ul>
                </div>
                <!-- /Page Breadcrumb -->

                <!-- Page Body -->
                <div class="page-body">
                     <nuxt/>
                </div>
                </div>
                <!-- /Page Body -->
            </div>
            <!-- /Page Content -->
    </div> 
    <loading></loading> 
    <remind :remindData="$store.state.remindData"></remind>
  </div>
</template>

<script>

import BHeader from '~/components/common/header'
import BMenu from '~/components/common/menu'
import loading from '~/components/parts/loading'
import confirm from '~/components/parts/confirm'
import remind from '~/components/parts/remind'
export default {
  components: {
 	 BHeader,
    BMenu,
    confirm,
    remind,
    loading
  },
  head () {
    return {
      title: '后台首页'
    }
  }
}
</script>

<style>

</style>
