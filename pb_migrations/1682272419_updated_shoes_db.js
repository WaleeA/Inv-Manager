migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlix145z",
    "name": "userName",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
