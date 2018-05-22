 <template src="./template.html"></template>

<script>
import arraytohtml from "@/utils/utitlity.js";

export default {
  name: "signup",
  components: {},
  data() {
    return {
      formValue: {
        name: "",
        un: "",
        email: "",
        pass: "",
        cnPass: "",
        timestamp: ""
      },
      validationErrors: [],
      errorMessage: ""
    };
  },
  async created() {
    let message;
    let type;
    if (this.$isListening()) {
      (message = "Server is Running"), (type = "success");
    } else {
      (message = "We have encountered an ERROR. Please try again later."),
        (type = "error");
    }
    this.$notify({
      group: "foo",
      title: "Server Status",
      text: message,
      type: type
    });
  },
  methods: {
    async handleSubmit() {
      this.validationErrors = [];
      if (this.formValue.name === "") {
        this.validationErrors.push("Name is Required");
      }
      if (this.formValue.un === "") {
        this.validationErrors.push("Username is required");
      }
      if (this.formValue.email === "") {
        this.validationErrors.push("Email is required");
      }
      if (this.formValue.pass === "") {
        this.validationErrors.push("Password is reuired");
      }
      if (this.formValue.pass !== this.formValue.cnPass) {
        this.validationErrors.push("PASSWORDS do not match.");
      }
      if (this.validationErrors.length) {
        this.validationErrors.push("Please try Again");
        this.errorMessage = arraytohtml(this.validationErrors);
        this.$notify({
          group: "foo",
          title: "Please Correct The Errors",
          text: this.errorMessage,
          type: "error"
        });
      }
      if (!this.validationErrors.length) {
        await this.$signUpUser(this.formValue);
        this.$notify({
          group: "foo",
          title: "SUCCESS",
          text:
            "Thank You For Signing Up for Our service. You should recieve an EMAIL confirmation within 24 hours.",
          type: "success"
        });

        let account = await this.$createAccounts();
        this.$addAccount({ un: this.formValue.un, ...account });
        this.$notify({
          group: "foo",
          title: "SUCCESS",
          text: "Your user wallet has been generated.",
          type: "success"
        });
        this.$router.replace(this.$route.query.redirect || "/login");
      }
    }
  }
};
</script>