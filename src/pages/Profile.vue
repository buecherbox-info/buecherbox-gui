<template>
  <div id="profile">
    <h1>Profil</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm';

export default {
  name: 'Profile',
  components: {
    LoginForm
  }
};
</script>

<style scoped>

</style>
