migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz")

  collection.createRule = null

  return dao.saveCollection(collection)
})
