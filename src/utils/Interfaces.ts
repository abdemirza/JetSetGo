// Interfaces.ts
export interface Airport {
  cityCode: string;
  cityName: string;
  terminal: string;
  airportCode: string;
  airportName: string;
  countryCode: string;
  countryName: string;
}

export interface Airline {
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
}

export interface DisplayData {
  source: {
    airport: Airport;
    depTime: string;
  };
  airlines: Airline[];
  stopInfo: string;
  destination: {
    airport: Airport;
    arrTime: string;
  };
  totalDuration: string;
}

export interface Flight {
  id: string;
  fare: number;
  displayData: DisplayData;
}

export interface ApiResponse {
  data: {
    result: Flight[];
  };
}
