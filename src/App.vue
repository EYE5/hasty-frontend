<template>
  <el-container>
    <el-header> </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  text-decoration: underline;
}

.form {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  min-width: 300px;
  max-width: 900px;
  max-height: 600px;
  min-height: 400px;
}
</style>
