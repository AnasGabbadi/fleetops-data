import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class MaintenanceRequestModel extends Model {
  // Identifiants
  @attr uuid;
  @attr('string') publicId;

  // Relations UUIDs
  @attr('string') companyUuid;
  @attr('string') userUuid;
  @attr('string') vehicleUuid;
  @attr('string') garageUuid;
  @attr('string') appointmentSlotUuid;

  // Relations Ember
  @belongsTo('garage', { async: true }) garage;
  @belongsTo('appointment-slot', { async: true }) appointmentSlot;
  @hasMany('maintenance-item', { async: true }) items;

  // Type et statut
  @attr('string') maintenanceType;
  @attr('string') status; // pending, confirmed, in_progress, completed, cancelled, paid
  @attr('string') statusLabel;
  @attr('string') priority; // low, medium, high, critical
  @attr('string') priorityLabel;

  // Localisation
  @attr('string') city;
  @attr('string') address;

  // Coûts MAD
  @attr('number') totalProductsCostMad;
  @attr('number') garageServiceCostMad;
  @attr('number') subtotalMad;
  @attr('number') taxMad;
  @attr('number') discountMad;
  @attr('number') totalCostMad;
  @attr('string') currency;

  // Messages
  @attr('string') customerMessage;
  @attr('string') notes;
  @attr('array') attachments;

  // Dates
  @attr('string') scheduledDate;
  @attr('string') scheduledTime;
  @attr('string') scheduledDatetime;
  @attr('date') startedAt;
  @attr('date') completedAt;

  // Paiement
  @attr('string') paymentStatus; // pending, partial, completed
  @attr('string') paymentStatusLabel;
  @attr('string') paymentMethod;
  @attr('string') paymentReference;
  @attr('date') paidAt;
  @attr('boolean') isPaid;

  // Coûts formatés
  @attr('string') formattedProductsCost;
  @attr('string') formattedServiceCost;
  @attr('string') formattedSubtotal;
  @attr('string') formattedTax;
  @attr('string') formattedDiscount;
  @attr('string') formattedTotal;

  // Décomposition coûts
  @attr('object') costBreakdown;

  // Audit
  @attr('string') createdByUuid;
  @attr('string') updatedByUuid;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Computed properties
  get statusBadgeClass() {
    const statusClasses = {
      pending: 'badge-warning',
      confirmed: 'badge-info',
      in_progress: 'badge-primary',
      completed: 'badge-success',
      cancelled: 'badge-danger',
      paid: 'badge-success'
    };
    return statusClasses[this.status] || 'badge-secondary';
  }

  get priorityBadgeClass() {
    const priorityClasses = {
      low: 'badge-secondary',
      medium: 'badge-warning',
      high: 'badge-danger',
      critical: 'badge-dark'
    };
    return priorityClasses[this.priority] || 'badge-secondary';
  }

  get paymentBadgeClass() {
    const paymentClasses = {
      pending: 'badge-warning',
      partial: 'badge-info',
      completed: 'badge-success'
    };
    return paymentClasses[this.paymentStatus] || 'badge-secondary';
  }

  get displayScheduledDateTime() {
    if (this.scheduledDate && this.scheduledTime) {
      const date = new Date(this.scheduledDate).toLocaleDateString('fr-FR');
      return `${date} à ${this.scheduledTime}`;
    }
    return 'N/A';
  }

  get isPending() {
    return this.status === 'pending';
  }

  get isConfirmed() {
    return this.status === 'confirmed';
  }

  get isInProgress() {
    return this.status === 'in_progress';
  }

  get isCompleted() {
    return this.status === 'completed';
  }

  get isCancelled() {
    return this.status === 'cancelled';
  }

  get canEdit() {
    return this.isPending || this.isConfirmed;
  }

  get canCancel() {
    return !this.isCompleted && !this.isCancelled;
  }

  get itemsCount() {
    return this.items?.length || 0;
  }

  get itemsTotal() {
    if (!this.items) return 0;
    return this.items.reduce((sum, item) => sum + item.totalPriceMad, 0);
  }
}