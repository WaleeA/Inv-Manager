migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbtovodw",
    "name": "profitLoss",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // remove
  collection.schema.removeField("wbtovodw")

  return dao.saveCollection(collection)
})
