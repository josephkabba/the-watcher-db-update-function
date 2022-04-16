import { AzureFunction, Context } from "@azure/functions";
import { updateDB } from "./update";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("Timer function is running late!");
  }

  context.log("Database update started", timeStamp);

  await updateDB();

  context.log("Database update complete", timeStamp);
};

export default timerTrigger;
