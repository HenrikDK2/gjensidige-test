export const RAILWAY_QUERY = `
query($id:String!){
  stopPlace(id: $id) {
    name
    estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
      aimedArrivalTime
      expectedArrivalTime
      cancellation
      forBoarding
      forAlighting
      destinationDisplay{
        frontText
      }
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
