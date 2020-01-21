import Vue from 'vue'
import Router from 'vue-router'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Channels from './views/Channels.vue'
import Channel from './views/Channel.vue'
import Logout from './views/Logout.vue'
import Members from './views/Members.vue'
import Member from './views/Member.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/channels',
      name: 'channels',
      component: Channels
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: Channel
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
    {
      path: '/member/:id',
      name: 'member',
      component: Member
    }
  ]
})