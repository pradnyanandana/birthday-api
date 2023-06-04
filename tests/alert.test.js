const AlertService = require("../services/alert-service");
const alert = new AlertService();

const artificialWait = async (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/** Mock send email function */
alert.sendEmail = (user) => {
  console.log(`Send email test ${user.email}`);
};

describe("Test alert", () => {
  test("should handle alerts", async () => {
    for (let i = 0; i < 10000; i++) {
      const date = new Date();

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const currentDate = `${year}-${month}-${day}`;

      alert.hour = date.getHours();
      alert.minute = date.getMinutes();
      alert.second = date.getSeconds() + 10;

      alert.send({
        id: i,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        birthdate: currentDate,
      });
    }

    await artificialWait(30000);
  });
});
