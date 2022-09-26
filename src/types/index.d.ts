export interface IRailway {
  stopPlace: IStopPlace;
}

export interface IStopPlace {
  name: string;
  estimatedCalls: IEstimatedCall[];
}

export interface IEstimatedCall {
  aimedArrivalTime: Date;
  expectedArrivalTime: Date;
  cancellation: boolean;
  destinationDisplay: IDestinationDisplay;
  forBoarding: boolean;
  forAlighting: boolean;
  serviceJourney: IServiceJourney;
}

export interface IDestinationDisplay {
  frontText: string;
}

export interface IServiceJourney {
  journeyPattern: IJourneyPattern;
}

export interface IJourneyPattern {
  line: Line;
}

export interface ILine {
  name: string;
  transportMode: TransportMode;
}

export enum TransportMode {
  Bus = "bus",
}
