export const Utils = {
  methods: {
    // check if member is connected
      membreConnecter() {
         if(this.$store.state.member === false) {
             return false;
         } else {
             return true;
         }
      },
      // set axios token
      recupererTokenAxios(token) {
          window.axios.defaults.params.token = token;
      },
      // register new user
      register( data) {
          return new Promise((resolve, reject) => {
              window.axios.post('members',{
                fullname: data.fullname,
                email: data.email,
                password: data.password
            }).then(response => {
                this.$router.push({ name: 'login' })
               resolve(response)
            }).catch(error => {
               reject(error)
            });
        })
        },
        // login function -> get token and set it to axios
        recupererToken( credentials){
              return new Promise((resolve, reject) => {
            window.axios.post('members/signin', {
              email: credentials.email,
              password: credentials.password,
            })
              .then(response => {
                const token = response.data.token
    
                this.$store.commit('recupererToken', token)

                this.$store.commit('recupererTokenAxios');
    
                let member = {
                  fullname : response.data.fullname,
                  email : response.data.email,
                  id : response.data._id
                };
    
                this.$store.commit('setMember', member)
    
                resolve(response)
                console.log(response.data.fullname);
    
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
            })
        },
        // disconnect a member
        detruireToken() {
          if (this.memberConnected()) {
    
              this.$store.commit('recupererTokenAxios');
    
             return new Promise((resolve, reject) => {
    
              window.axios.delete('members/signout')
                .then(response => {
                  
                  this.$store.commit('DetruireToken')
                  this.$store.commit('destroyMember')
                  resolve(response)
                  this.$router.push({ name: 'login' })
                })
                .catch(error => {
                  this.$store.commit('DetruireToken')
                  this.$store.commit('destroyMember')
                  reject(error)
                  this.$router.push({ name: 'login' })
                })
            })  
            
          }
        },
        // get members list 
        retrouverMembres() {
          this.$store.commit('recupererTokenAxios');
          window.axios.get('members')
            .then(response => {
              this.$store.commit('retrouverMembres', response.data)
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        // get channels list
        recupererDiscussions() {
          this.$store.commit('recupererTokenAxios');
          window.axios.get('channels')
            .then(response => {
              this.$store.commit('recupererDiscussions', response.data)
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        // create a channel
        addChannel( data) {
          return new Promise((resolve, reject) => {
              this.$store.commit('recupererTokenAxios');
              window.axios.post('channels',{
                label: data.label,
                topic: data.topic
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // get channel infos
        recupererDiscussion( data) {
          this.$store.commit('recupererTokenAxios');
          window.axios.get('channels/' + data._id)
            .then(response => {
              this.$store.commit('recupererDiscussion', response.data)
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        // get posts of a channel
        retrievePosts( data) {
          this.$store.commit('recupererTokenAxios');
          window.axios.get('channels/' + data._id + '/posts')
            .then(response => {
              this.$store.commit('retrievePosts', response.data)
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        // add a post in a chennel
        addPost( data) {
          this.$store.commit('recupererTokenAxios');
          return new Promise((resolve, reject) => {
              window.axios.post('channels/' + data._id + '/posts',{
                message: data.message
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // delete a channel
        removeChannel( data) {
          this.$store.commit('recupererTokenAxios');
          return new Promise((resolve, reject) => {
              window.axios.delete('channels/' + data._id)
              .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // delete a post from a channel
        removePost( data) {
          this.$store.commit('recupererTokenAxios');
          return new Promise((resolve, reject) => {
              window.axios.delete('channels/' + data._idChannel + '/posts/' + data._idPost)
              .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // delete a member
        removeMember( data) {
          this.$store.commit('recupererTokenAxios');
          return new Promise((resolve, reject) => {
              window.axios.delete('members/' + data._id)
              .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // edit the label of a channel
        editLabel( data) {
          return new Promise((resolve, reject) => {
              this.$store.commit('recupererTokenAxios');
              window.axios.patch('channels/' + data._id,{
                label: data.label
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // edit the topic of a channel
        editTopic( data) {
          return new Promise((resolve, reject) => {
              this.$store.commit('recupererTokenAxios');
              window.axios.patch('channels/' + data._id,{
                label: data.label,
                topic: data.topic
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // edit a post
        editMessage( data) {
          return new Promise((resolve, reject) => {
              this.$store.commit('recupererTokenAxios');
              window.axios.patch('channels/' + data._idChannel + '/posts/' + data._idPost,{
                message: data.message
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
          })
        },
        // get all the post of a member 
        retrieve10Posts( data) {
          this.$store.commit('recupererTokenAxios');
          let myPosts = [];
          window.axios.get('channels')
            .then(response => {
              response.data.forEach(c => {
              
                window.axios.get('channels/' + c._id + '/posts')
                .then(response => {
                  response.data.forEach(p => {
                    if(p.member_id == data._id){
                      myPosts.push(p);
                    }
                  });
                })
                .catch(error => {
                  console.log(error)
                })
      
              });

              this.$store.commit('retrievePosts_10', myPosts)
    
            })
            .catch(error => {
              console.log(error)
            })
        }
  }
}