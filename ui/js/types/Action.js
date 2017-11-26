//@flow

/*This is a starting point for an action definition - we likely want these to be stronger and more specific*/

export type Action = {
  +type: string,
  +data: any,
};
