# Post New Block

Create a new block.

**URL** : `/api/block/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a `data: let's test!` :

```json
{
    "hash": "9cd5651c8e82b6a9419a886a3a01bdc03026057f8a9b8d642865dccfd0eb09d2",
    "height": 50,
    "body": "let's test!",
    "time": "1545734567",
    "previousBlockHash": "b1bbc36faa99a438e4f5f3bd2fe96f5236b915de7e115db021a24cf507916156"
}
```

## Notes

* If the parameter `data` is empty it does return an error.
