class CustomError extends Error {

  constructor(message: string, public source: string = "N/A", public userAgent: string = "N/A", public clientIP: string = "N/A") {

    super(message);

    this.name = this.constructor.name;

    const logData = {

      message: this.message,

      stack: this.stack,

      level: "error",

      source: this.source,

      timestamp: new Date().toISOString(),

      userAgent: this.userAgent,

      clientIP: this.clientIP,

    };

    try {

      axios.post("http://api.example.com/logs", logData);

    } catch (logError) {

      console.error(`Error sending log data to API: ${logError.message}`);

    }

    console.error(`[${logData.timestamp}][ERROR][${this.source}] ${this.message}\n${this.stack}`);

  }

}

const performLogin = (username: string, password: string) => {

  // perform some other login-related logic

  try {

    // perform login logic

  } catch (error) {

    throw new CustomError(error.message, "performLogin", navigator.userAgent, clientIP);

  }

};

