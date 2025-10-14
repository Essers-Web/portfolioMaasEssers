<template>
  <div class="container" style="background: url('https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center/cover;">
    <div class="card">
      <h2>{{ forgotMode ? 'Forgot Password' : 'Login' }}</h2>

      <form @submit.prevent="forgotMode ? sendVerification() : login()">
        <p v-if="forgotMode" class="info-text">verification will be sent to your email</p>

        <div class="field">
          <label>Email</label>
          <input type="email" v-model="email" required>
        </div>

        <div class="field" v-if="!forgotMode">
          <label>Password</label>
          <input type="password" v-model="password" required>
        </div>

        <button type="submit">
          {{ forgotMode ? 'Send Verification' : 'Login' }}
        </button>
      </form>

      <div class="link">
        <a href="#" @click.prevent="forgotMode = !forgotMode">
          {{ forgotMode ? 'Back to Login' : 'Forgot password?' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      forgotMode: false
    }
  },
  methods: {
    login() {
      console.log('Login with', this.email, this.password)
      // Example: call backend here
    },
    sendVerification() {
      console.log('Send verification to', this.email)
      // Example: call backend here
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 10px rgba(0,0,1,1);
  width: 100%;
  max-width: 350px;
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: black;
}
.info-text {
  font-size: 0.9rem;
  color: #2563eb;
  text-align: center;
  margin-bottom: 1rem;
}
.field {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: black;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
button {
  width: 100%;
  padding: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
button:hover {
  background: #1d4ed8;
}
.link {
  text-align: right;
  margin-top: 0.5rem;
}
.link a {
  font-size: 0.85rem;
  color: #2563eb;
  text-decoration: none;
}
.link a:hover {
  text-decoration: underline;
}
</style>
