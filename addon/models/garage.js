import Model, { attr, hasMany } from '@ember-data/model';

export default class GarageModel extends Model {
  @attr uuid;
  @attr('string') publicId;
  @attr('string') name;
  @attr('string') description;
  @attr('string') phone;
  @attr('string') email;
  @attr('string') address;
  @attr('string') city;
  @attr('number') latitude;
  @attr('number') longitude;
  @attr('number') basePriceMad;
  @attr('string') currency;
  @attr('array') servicesOffered;
  @attr('boolean') isActive;
  @attr('string') workingHoursStart;
  @attr('string') workingHoursEnd;
  @attr('number') rating;
  @attr('string') apiReference;
  @attr('object') meta;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @hasMany('appointment-slot', { async: true }) appointmentSlots;
  @hasMany('maintenance-request', { async: true }) maintenanceRequests;

  // Computed properties
  get formattedPrice() {
    return `${this.basePriceMad.toFixed(2)} MAD`;
  }

  get workingHours() {
    return {
      start: this.workingHoursStart,
      end: this.workingHoursEnd
    };
  }

  get coordinates() {
    if (this.latitude && this.longitude) {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
    return null;
  }

  get formattedRating() {
    return this.rating ? `${this.rating}/5` : 'N/A';
  }
}