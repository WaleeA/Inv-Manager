migrate((db) => {
  const collection = new Collection({
    "id": "5jmsbk58nju5jfz",
    "created": "2023-04-23 15:17:06.375Z",
    "updated": "2023-04-23 15:17:06.375Z",
    "name": "shoes_db",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rlix145z",
        "name": "userName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ac4cls8j",
        "name": "shoeName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ld5rjcmt",
        "name": "brand",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qat9dp19",
        "name": "purchasePrice",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ol7tvust",
        "name": "soldPrice",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "g3zd9adw",
        "name": "soldDate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ngiab86d",
        "name": "isSold",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "jrn2hzxf",
        "name": "soldLocation",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5jmsbk58nju5jfz");

  return dao.deleteCollection(collection);
})
