migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvyhizce",
    "name": "user",
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

  // remove
  collection.schema.removeField("jvyhizce")

  return dao.saveCollection(collection)
})
