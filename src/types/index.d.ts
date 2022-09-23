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
  forBoarding: boolean;
  forAlighting: boolean;
  serviceJourney: IServiceJourney;
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
