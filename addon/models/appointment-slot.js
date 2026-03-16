import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AppointmentSlotModel extends Model {
  @attr uuid;
  @attr('string') publicId;
  @attr('string') garageUuid;
  @attr('date') date;
  @attr('string') time;
  @attr('number') durationMinutes;
  @attr('number') maxCapacity;
  @attr('number') bookedCount;
  @attr('boolean') isAvailable;
  @attr('string') apiReference;
  @attr('object') meta;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('garage', { async: true }) garage;
  @hasMany('maintenance-request', { async: true }) maintenanceRequests;

  // Computed properties
  get displayText() {
    const date = this.date ? new Date(this.date).toLocaleDateString('fr-FR') : '';
    return `${date} à ${this.time}`;
  }

  get datetime() {
    if (this.date && this.time) {
      return new Date(`${this.date}T${this.time}`);
    }
    return null;
  }

  get remainingCapacity() {
    return Math.max(0, this.maxCapacity - this.bookedCount);
  }

  get isFull() {
    return this.bookedCount >= this.maxCapacity;
  }

  get canBook() {
    return this.isAvailable && !this.isFull;
  }
}