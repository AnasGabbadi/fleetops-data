import Model, { attr, hasMany } from '@ember-data/model';

export default class RepairProductModel extends Model {
  @attr uuid;
  @attr('string') publicId;
  @attr('string') name;
  @attr('string') description;
  @attr('string') category;
  @attr('string') sku;
  @attr('number') priceMad;
  @attr('string') currency;
  @attr('number') stockQuantity;
  @attr('boolean') isActive;
  @attr('string') apiReference;
  @attr('object') meta;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @hasMany('maintenance-item', { async: true }) maintenanceItems;

  // Computed properties
  get isInStock() {
    return this.stockQuantity > 0 && this.isActive;
  }

  get formattedPrice() {
    return `${this.priceMad.toFixed(2)} MAD`;
  }
}