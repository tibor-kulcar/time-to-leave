export type DepartureProps = {
  arrival_timestamp: {
    predicted: string;
    scheduled: string;
  };
  delay: {
    is_available: boolean;
    minutes: number;
    seconds: number;
  };
  departure_timestamp: {
    predicted: string;
    scheduled: string;
    minutes: string;
  };
  last_stop: {
    id: string;
    name: string;
  };
  route: {
    short_name: string;
    type: number;
    is_night: boolean;
    is_regional: boolean;
    is_substitute_transport: boolean;
  };
  stop: {
    id: string;
    platform_code: string;
  };
  trip: {
    direction: null;
    headsign: string;
    id: string;
    is_at_stop: boolean;
    is_canceled: boolean;
    is_wheelchair_accessible: boolean;
    is_air_conditioned: null;
    short_name: null;
  };
};

export type GroupedDepartureProps = {
  platformCode: string;
  departures: DepartureProps[];
};

export type StopItem = {
  label: string;
  value: string;
};

export type LocalStorage = {
  search: StopItem;
};
