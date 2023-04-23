migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygceqzcb",
    "name": "purchaseDate",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygceqzcb",
    "name": "purchaseDate",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
