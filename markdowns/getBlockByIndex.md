# Get Block By Id

Get the details of a block.

**URL** : `/api/block/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a Block with Id 0(Genesis Block):

```json
{
    "hash": "e10956dc82d0c5dc484f5585414ee96ec9ebcc6a983491c772e1fe94faba5321",
    "height": 0,
    "body": "tBlock 1",
    "time": "1545487348",
    "previousBlockHash": ""
}
```

## Notes

* If the URL does not have a `index` parameter it does return an error.
