<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <!-- first modal -->
          <button class="btn btn-primary" @click="modalFirst = !modalFirst">
            Show first modal
          </button>
          <modals
            title="First modal"
            v-show="modalFirst"
            @close="modalFirst = false"
          >
            <div slot="body">
              <p>text text text text</p>
              <button class="btn btn-primary" @click="modalFirst = !modalFirst">
                Well Done!
              </button>
            </div>
          </modals>

          <!-- second modal -->
          <button
            class="btn btn-primary"
            @click="modalSecond.show = !modalSecond.show"
          >
            Show modal with form
          </button>
          <modals
            title="Modal with form"
            v-show="modalSecond.show"
            @close="modalSecond.show = false"
          >
            <div slot="body">
              <form @submit.prevent="submitSecondForm">
                <label>Name:</label>
                <input required v-model="modalSecond.name" />
                <label>Email:</label>
                <input required type="email" v-model="modalSecond.email" />
                <button class="btn btn-primary">Submit</button>
              </form>
            </div>
          </modals>

          <!-- modal with validate -->
          <button
            class="btn btn-primary"
            @click="modalValidate = !modalValidate"
          >
            Show modal with form + validate
          </button>
          <modalValidate
            v-show="modalValidate"
            @close="modalValidate = false"
          ></modalValidate>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import modals from "@/components/UI/Modal.vue";
import modalValidate from "@/components/ModalValidate.vue";

export default {
  components: {
    modals,
    modalValidate,
  },
  data() {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: "",
        email: "",
      },
      modalValidate: false,
    };
  },
  methods: {
    submitSecondForm() {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email,
      });
      this.modalSecond.name = "";
      this.modalSecond.email = "";
      this.modalSecond.show = false;
    },
  },
};
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 0.8em 2em;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 30px;
}
.btn-primary {
  color: #ffffff;
  border: 1px solid #494ce8;
  background-color: #494ce8;
}
</style>