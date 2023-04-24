migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // remove
  collection.schema.removeField("rlix145z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w6fzkyvb",
    "name": "email",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlix145z",
    "name": "email",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("w6fzkyvb")

  return dao.saveCollection(collection)
})
