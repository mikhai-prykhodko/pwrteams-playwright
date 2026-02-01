import moment from 'moment';

export class GenericWait {
  private static readonly retryTimeFromConfig = process.env?.RETRY_TIME
    ? Number(process.env.RETRY_TIME)
    : 1 * 1000;

  private static readonly timeoutFromConfig = process.env?.WAIT_TIMEOUT
    ? Number(process.env.WAIT_TIMEOUT)
    : 60 * 1000;

  /**
   * Waits for an async function to return a matching value
   * This is preferable over using expect.poll if you to catch exceptions, wait between retries,
   * need to have it throw a specific exception at the end of the timeout, or need to match a specific value.
   * @param waitFor waits for a function to return true
   * @param matchObject the object we are waiting for (i.e. if we're waiting for a function to return 'Grass' you would pass 'Grass')
   * @param retryTime retry time in milliseconds (i.e. the amount of time we wait between retries)
   * @param timeout  timeout in milliseconds (i.e. the amount of time we wait before timing out)
   * @param throwException throws an exception if true; otherwise, returns false
   * @returns true if the function returns true; otherwise, false
   */
  public static async WaitForMatch(
    waitFor: () => Promise<unknown>,
    matchObject: unknown,
    retryTime?: number,
    timeout?: number,
    throwException?: boolean,
  ): Promise<boolean> {
    // Set start time and exception holder

    const endTime = moment(new Date()).add(
      timeout ?? GenericWait.timeoutFromConfig,
      'milliseconds',
    );
    let exception: Error = null;
    let postFirstLoop = false;

    do {
      // Only wait if we've already looped once
      if (postFirstLoop) {
        // Give the system a second before checking if wait for passes
        await new Promise((f) =>
          setTimeout(f, retryTime ?? GenericWait.retryTimeFromConfig),
        );
      } else {
        postFirstLoop = true;
      }
      try {
        // Clear out old exception
        exception = null;

        // Check if the function returns true
        if ((await waitFor()) === matchObject) {
          return true;
        }
      } catch (error) {
        // Save off the exception if we want to throw exceptions
        if (throwException) {
          exception = error;
        }
      }
    } while (moment(new Date()).isBefore(endTime));
    // Check if we had an exceptions
    if (throwException && exception) {
      throw exception;
    }
    // We timed out waiting for the function to return true
    return false;
  }
}
