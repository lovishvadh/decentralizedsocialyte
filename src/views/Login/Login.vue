 <template src="./template.html"></template>

<script>
import arraytohtml from "@/utils/utitlity.js";
import auth from "@/auth.js";
export default {
  name: "signup",
  components: {},
  data() {
    return {
      formValue: {
        un: "",
        pass: ""
      },
      validationErrors: [],
      errorMessage: "",
      error: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.validationErrors = [];
      if (this.formValue.un === "") {
        this.validationErrors.push("Username is required");
      }
      if (this.formValue.pass === "") {
        this.validationErrors.push("Password is reuired");
      }
      if (this.validationErrors.length) {
        this.validationErrors.push("Please try Again");
        this.errorMessage = arraytohtml(this.validationErrors);
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: this.errorMessage,
          type: "error"
        });
      }
      if (!this.validationErrors.length) {
        auth.login(this.formValue.un, this.formValue.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true;
            this.$notify({
              group: "foo",
              title: "ERROR",
              text:
                "INVALID USER PLEASE RETRY WITH CORRECT USERNAME AND PASSWORD",
              type: "error"
            });
          } else {
            this.$router.replace(this.$route.query.redirect || "/wall");
          }
        });
      }
    }
  }
};
</script>