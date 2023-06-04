import moment from "moment-timezone";
import UserRepository from "../repositories/user-repository";
import axios from "axios";

class AlertService {
  constructor() {
    const environtment = process.env.NODE_ENV;

    this.hour = 9;
    this.minute = 0;
    this.second = 0
    this.queue = {};
    this.repository = new UserRepository();

    environtment === "production" && this.start();
  }

  key(user) {
    return `alert${user.id}`;
  }

  async timeout(callback, time) {
    let max = 2147483647;

    if (time > max) {
      return setTimeout(() => this.timeout(callback, time - max), max);
    }

    return setTimeout(() => callback(), time);
  }

  async clear(user) {
    const qkey = this.key(user);
    clearTimeout(this.queue[qkey]);
  }

  async send(user) {
    try {
      const qkey = this.key(user);
      const now = moment.utc();
      const currentYear = moment().year();
      const offset = moment.utc().tz(user.location)._offset;
      const birthdayAlert = moment
        .utc(`${user.birthdate}`)
        .set("hour", this.hour - offset / 60)
        .set("minute", this.minute)
        .set("second", this.second)
        .set("year", currentYear);

      let diff = birthdayAlert.diff(now, "milisecond");

      if (diff < 0) {
        birthdayAlert.set("year", currentYear + 1);
        diff = birthdayAlert.diff(now, "milisecond");
      }

      this.queue[qkey] = this.timeout(() => this.sendEmail(user), diff);
    } catch (err) {
      /** Retry to send in 5 minutes */
      this.timeout(() => {
        this.send(user);
      }, 5 * 60 * 1000);
    }
  }

  async sendEmail(user) {
    const qkey = this.key(user);
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
        this.queue[qkey] = this.timeout(
          () => this.sendEmail(user),
          24 * 3600 * 1000
        );
      });
  }

  async start() {
    (await this.repository.find()).map((user) => {
      this.send(user);
    });
  }
}

module.exports = AlertService;
