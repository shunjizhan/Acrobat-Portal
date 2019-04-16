var _ = require('lodash');

function Entity(_node) {
  _.extend(this, _node.properties);

  if (this.id) {
    this.id = _node.properties['id'];
  }
  if (this.entityType) {
    this.entityType = this.entityType.toString();
  }
  if (this.label) {
    this.label = this.label.toString();
  }
}

module.exports = Entity;