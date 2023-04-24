migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  collection.listRule = "userId = @request.auth.id"
  collection.viewRule = "userId = @request.auth.id"
  collection.createRule = "userId = @request.auth.id"
  collection.updateRule = "userId = @request.auth.id"
  collection.deleteRule = "userId = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvyhizce",
    "name": "userId",
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

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // update
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
})
