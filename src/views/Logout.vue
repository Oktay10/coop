<template>

</template>

<script>

export default {
  created() {
    this.detruireToken();
  },
  methods: {
         detruireToken() {
            if (this.membreConnecter()) {
      
                this.$store.commit('recupererTokenAxios');
      
               return new Promise((resolve, reject) => {
      
                window.axios.delete('members/signout')
                  .then(response => {
                    
                    this.$store.commit('detruireToken')
                    this.$store.commit('destroyMember')
                    resolve(response)
                    this.$router.push({ name: 'signin' })
                  })
                  .catch(error => {
                    this.$store.commit('detruireToken')
                    this.$store.commit('destroyMember')
                    reject(error)
                    this.$router.push({ name: 'signin' })
                  })
              })  
              
            }
          }
     }
}
</script>