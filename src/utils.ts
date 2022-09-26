type FormatType = "shortExpectedArrival";

export const timeFormat = (
  unformattedDate: Date,
  type: FormatType
): string | undefined => {
  const date = new Date(unformattedDate);
  if (type === "shortExpectedArrival") {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;

    return `${hours}:${minutes}`;
  }
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const arrivalDelayInMinutes = (
  expectedArrivalTime: Date,
  aimedArrivalTime: Date
): string => {
  const arrival = new Date(expectedArrivalTime);
  const aimed = new Date(aimedArrivalTime);

  const delayInMs = arrival.getTime() - aimed.getTime();
  const minutes = Math.floor(delayInMs / 1000 / 60);

  return `${minutes > 0 ? "+" : "-"}${minutes}`;
};

// Step 2 example --------------------------------------------------

interface Queue {
  input: RequestInfo;
  init: RequestInit | undefined;
}

class QueueFetch {
  isWaitingForResponse: boolean = false;
  queue: Queue[] = [];

  async request(req: Queue): Promise<Response | undefined> {
    try {
      if (this.isWaitingForResponse) {
        this.queue.push(req);

        return await new Promise((resolve, reject) => {
          const timer = setInterval(async () => {
            if (!this.isWaitingForResponse) {
              clearInterval(timer);
              const index = this.queue.findIndex((entry) => entry === req);

              if (this.queue.length > 0 && index === this.queue.length - 1) {
                this.queue = [];
                resolve(await this.request(req));
              } else {
                reject("Request was discarded");
              }
            }
          }, 250);
        });
      } else {
        this.isWaitingForResponse = true;
        const res = await fetch(req.input, req.init);
        this.isWaitingForResponse = false;
        return res;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

let queueFetchInstance: QueueFetch;
export const queueFetch = async (input: RequestInfo, init: RequestInit) => {
  if (!queueFetchInstance) queueFetchInstance = new QueueFetch();
  return await queueFetchInstance.request({ input, init });
};
