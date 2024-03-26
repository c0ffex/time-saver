export interface IAvailability {
  id?: number;
  weekDay: number;
  hour: number[];
  minute: number[];
  serviceId?: number;
  userAvailabilityId?: number;
}
