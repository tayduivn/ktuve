<template>
  <quotation class="app-content-wrapper" :route-params="routeParams" />
</template>

<script>
import Quotation from './components/Quotation'
export default {
  name: 'QuotationAdd',
  components: {
    Quotation
  },
  data() {
    return {
      routeParams: this.$route.query,
      fullPath: ''
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.name !== 'QuotationAdd' || this.fullPath === to.fullPath) return
      this.$store.dispatch('tagsView/refreshCurrentTag', this)
    }
  },
  created() {
    this.fullPath = this.$route.fullPath
  }
}
</script>
