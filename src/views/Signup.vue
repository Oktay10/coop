<template>
    <b-container>
       <div class="top">
          <b-form @submit.prevent="creationCompte" class="form">
              <h1 class="signup">S'inscrire: </h1>

          <b-form-group >
            <b-form-input type="email" v-model="email" required placeholder="Mail  "></b-form-input>
          </b-form-group>

          <b-form-group >
            <b-form-input type="text"  v-model="fullname"  required  placeholder="Name"></b-form-input>
          </b-form-group>

          <b-form-group >
            <b-form-input type="password"  v-model="password1"  required  placeholder="Mot de passe"></b-form-input>
          </b-form-group>

          <b-form-group >
            <b-form-input type="password" v-model="passwordVerif" required placeholder="Retaper mot de passe"></b-form-input>
          </b-form-group>
     
        <b-button type="submit" variant="success">S'inscrire</b-button>
        <b-button type="submit"  to="/signin" class="signin" variant="info">Se connecter</b-button>
  
        </b-form>
     </div>
    </b-container>
</template>

<script>

export default {
  name: "signup",
  data () {
    return {
        email: "",
        password1: "",
        passwordVerif: "",
        fullname: ""
    }
  },
  created() {
  },
  methods : {
    creationCompte(){

        if(this.password1 == this.passwordVerif){
              this.enregistrerCompte({
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password1
                });
        } else {
            alert("!! Les deux mots de passe ne correspondent pas !!");
        }
    },
    enregistrerCompte( data) {
            return new Promise((resolve, reject) => {
                window.axios.post("members",{
                  fullname: data.fullname,
                  email: data.email,
                  password: data.password
              }).then(response => {
                  this.$router.push({ name: "signin" })
                 resolve(response)
              }).catch(error => {
                 reject(error)
              });
          })
      },
     recupererToken( credentials){
                return new Promise((resolve, reject) => {
                window.axios.post("members/signin", {
                email: credentials.email,
                password: credentials.password,
              }).then(response => {

                  const token = response.data.token
                  this.$store.commit("recupererToken", token)
                  this.$store.commit("recupererTokenAxios");
      
                  let member = {
                    fullname : response.data.fullname,
                    email : response.data.email,
                    id : response.data._id
                  };
      
                  this.$store.commit("setMember", member)
                  resolve(response)
                })
                .catch(error => {
                  console.log(error)
                  reject(error)
                })
            })
      }
  }
}
</script>

<style>

.signup {
  padding: 15px;
  text-align: center;
}
.form {
  margin: 100px auto;
  width: 50%; 
}

.signin {
  margin-left: 50px;
}
</style>
