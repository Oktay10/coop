<template>
  <div class="back">
    <b-container>
      <div class="top">
        <b-form @submit.prevent="signin" class="form">
           <h1 class="signin">Co'op - Identification</h1>

        <b-form-group >
          <b-form-input type="email" v-model="email" required placeholder="Mail"></b-form-input>
        </b-form-group>

        <b-form-group >
          <b-form-input type="password" v-model="password" required placeholder="Mot de passe"> </b-form-input>
        </b-form-group>
     
       <b-button type="submit" variant="success">Connexion</b-button>
         <b-button type="submit" variant="info" to="/signup" class="signup" >S'inscrire</b-button>
       </b-form>
  </div>
 </b-container>
  </div>
</template>

<script>

export default {
  name: 'signin',
  data () {
    return {
        email: '',
        password: ''
    }
  },
  mounted(){
  	if(this.$store.state.token){
  		this.$router.push('/members');
  	}
  },
  methods : {
  		signin() {
        this.recupererToken({
        email: this.email,
        password: this.password
      }).then(response => {
          this.$router.push({ name: 'channels' })
        });

    },
  }
}
</script>

<style>

.form {
  margin: 100px auto;
  width: 50%; 
}

.signin {
  text-align: center;
  padding: 25px;
}

.signup {
  margin-left: 20px;
}
</style>
