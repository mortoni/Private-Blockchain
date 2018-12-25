# Validate Block

Validate a block.

**URL** : `/api/validateBlock/:index`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a `index: 1` :

```json
{
    "isValid": true
}
```

## Notes

* If the parameter `index` is empty or not valid it does return an error.
