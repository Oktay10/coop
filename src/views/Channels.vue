<template>

<b-container>
    <div class="up">
  <b-list-group v-if="channels">
    <b-list-group-item variant="info">... Discussions ( <b-badge variant="light">{{channels.length}}</b-badge>)

    <!--  -->
    
    <b-button v-b-modal.modalPrevent id="Nchannel">Créer une channel</b-button>

    <!-- Modal Component -->
    <b-modal 
      :modal-class="'my-modal'"
      id="modalPrevent"
      ref="modal"
      title="Créer une channel"
      no-close-on-backdrop
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Entrer le label" v-model="label" />
        <b-form-input class="top" type="text" placeholder="Entrer le topic" v-model="topic" />
      </form>
    </b-modal>


    <!--  -->
    </b-list-group-item>
    <b-list-group-item>
      <b-list-group  v-for="channel in channels" :key="channel._id" >
        <b-list-group-item class="channel-section">
          <router-link tag="span" class="top channel" :to="'/channel/'+channel._id" >
            <b>{{ channel.label }}</b>
            <b-badge pill variant="info">{{ channel.topic }}</b-badge>
          </router-link>
            <i class="fas fa-trash-alt trash float-right align-middle" @click="remove_Channel(channel._id)"></i>
        </b-list-group-item>
      </b-list-group>
    </b-list-group-item>
  </b-list-group>
  </div>
  </b-container>

</template>

<script>
export default {
  name: 'channels',
  data () {
    return {
        label: '',
        topic: ''
    }
  },
  created() {
    // get all channels
      this.recupererDiscussions();
    },
  computed: {
    // returns the list of channels
      channels() {
        return this.$store.state.channels
    }
  },
  methods: {
   clearName() {
        this.label = '';
        this.topic = '';
      },
      handleOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        if (!this.label) {
          alert('Veuillez entrer le label et le topic!')
        } else {
          this.handleSubmit()
        }
      },
      // add a channel 
      handleSubmit() {
        console.log( this.label + ' ' + this.topic );
              this.addChannel({
                                label: this.label,
                                topic: this.topic
                              })
                    .then(response => {
                      this.recupererDiscussions();
                    });
        this.clearName()
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
      },
      // delete channel
      remove_Channel(id){
          var result = confirm("Voulez vous vraiment supprimer cette channel ?");
          if (result) {
                this.removeChannel({
                                    _id: id
                                  })
                    .then(response => {
                        this.recupererDiscussions();
                    });
          }
      }
  }
}
</script>

<style>
.top {
  margin-top: 15px;
}
.up {
  margin-top: 80px;
}
.my-modal {
  margin-top: 60px;
  z-index: 1000;
}
.channel:hover {
 cursor: pointer;
 color: rgb(171, 171, 173);
}
.trash {
  margin-left: 10px;
  cursor: pointer;
  line-height: 28px;
}

#Nchannel{
  background-color: white;
  color:black;
  border:white;
}
.trash:hover {
  opacity: 0.5;
}
.channel-section {
  margin-top: 10px;
}
</style>