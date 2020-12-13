<template>
    <section>
        <EditUser
        v-bind:newUser="newUser"
        v-bind:title="subTitle"
        />
    </section>
</template>

<script>
import EditUser from './EditUser';

export default {
  components: {
    EditUser,
  },
  data: () => ({
    newUser: true,
    subTitle: 'Регистрация пользователя',
  }),
};
</script>
