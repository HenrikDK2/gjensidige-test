export const RAILWAY_QUERY = `
  {
    stopPlace(id: "NSR:StopPlace:4000") {
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        aimedArrivalTime
        expectedArrivalTime
        cancellation
        forBoarding
        forAlighting
        serviceJourney {
          journeyPattern {
            line {
              name
              transportMode
            }
          }
        }
      }
    }
  }
`;
