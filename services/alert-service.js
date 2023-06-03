import moment from "moment-timezone";
import UserRepository from "../repositories/user-repository";
import axios from "axios";

class AlertService {
  constructor() {
    this.repository = new UserRepository();
  }

  async timeout(callback, time) {
    let max = 2000;

    if (time > max) {
      return setTimeout(() => this.timeout(callback, time - max), max);
    }

    return setTimeout(() => callback(), time);
  }

  async clear(user) {
    const qkey = `alert${user.id}`;
    clearTimeout(queue[qkey]);
  }

  async send(user) {
    try {
      const qkey = `alert${user.id}`;
      const now = moment.utc();
      const currentYear = moment().year();
      const offset = moment.utc().tz(user.location)._offset;
      const birthdayAlert = moment
        .utc(`${user.birthdate}`)
        .set("hour", 9 - offset / 60)
        .set("year", currentYear);

      let diff = birthdayAlert.diff(now, "milisecond");

      if (diff < 0) {
        birthdayAlert.set("year", currentYear + 1);
        diff = birthdayAlert.diff(now, "milisecond");
      }

      const callback = () => {
        console.log(`Sending email to ${user.email}`);

        axios
          .post("https://email-service.digitalenvision.com.au/send-email", {
            email: user.email,
            message: `Hey, ${user.first_name} ${user.last_name} it's your birthday`,
          })
          .then(() => {
            this.send(user);
            console.log(`Success send email to ${user.email}`);
            logger.info(`Success send email to ${user.email}`);
          })
          .catch((error) => {
            console.log(error.message);
            logger.info(`Send email to ${user.email} error`);
            logger.error(error);

            /** Retry to send in 24 hours */
            queue[qkey] = this.timeout(callback, 24 * 3600 * 1000);
          });
      };

      queue[qkey] = this.timeout(callback, diff);
    } catch (err) {
      /** Retry to send in 5 minutes */
      this.timeout(() => {
        this.send(user);
      }, 5 * 60 * 1000);
    }
  }

  async start() {
    (await this.repository.find()).map((user) => {
      this.send(user);
    });
  }
}

module.exports = AlertService;
