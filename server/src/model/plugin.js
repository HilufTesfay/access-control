const cleanSchemaPlugin = (schema) => {
  const transform = (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    if (ret.password) {
      delete ret.password;
    }
    return ret;
  };

  // Modify toJSON
  if (!schema.options.toJSON) {
    schema.options.toJSON = {};
  }
  schema.options.toJSON.transform = transform;

  // Modify toObject
  if (!schema.options.toObject) {
    schema.options.toObject = {};
  }
  schema.options.toObject.transform = transform;
};

export default cleanSchemaPlugin;
