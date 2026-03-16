import Model, { attr, belongsTo } from '@ember-data/model';

export default class MaintenanceItemModel extends Model {
  @attr uuid;
  @attr('string') maintenanceRequestUuid;
  @attr('string') repairProductUuid;
  @attr('string') productName;
  @attr('string') productSku;
  @attr('number') quantity;
  @attr('number') unitPriceMad;
  @attr('number') totalPriceMad;
  @attr('string') currency;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('maintenance-request', { async: true }) maintenanceRequest;
  @belongsTo('repair-product', { async: true }) repairProduct;

  // Computed properties
  get formattedUnitPrice() {
    return `${this.unitPriceMad.toFixed(2)} MAD`;
  }

  get formattedTotalPrice() {
    return `${this.totalPriceMad.toFixed(2)} MAD`;
  }

  get displayName() {
    return `${this.productName} (${this.quantity}x)`;
  }
}