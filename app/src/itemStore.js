module.exports = (function() {
  Parse.initialize('HAvVzC6nFUCQDskxkOio2sdiFNuWNGi9wgmX6Nwa', 'jShePeIRlyKRj4S7lQ7uuktGEQn30b4DZxX7K1pb');
  var Item = Parse.Object.extend('Item');
  var _cache = []; // cache of items, as: [ { name: String } ]

  function prepareDbItem(item) {
    var dbItem = new Item();
    dbItem.set('name', item.name);
    return dbItem;
  }

  function storeItems(items, callback) {
    Parse.Object.saveAll((items || []).map(prepareDbItem), callback);
    return items;
  }

  function renderDbItem(dbItem) {
    return { name: dbItem.get('name') };
  }

  function fetchItems(callback, defaultItems) {
    new Parse.Query(Item).find({
      success: function(dbItems) {
        _cache = dbItems.length ? dbItems.map(renderDbItem) : storeItems(defaultItems);
        callback(null, _cache);
      },
      error: function(object, error) {
        callback(error);
      }
    });
  }

  function syncItems(selectedItems, callback) {
    // we store in DB only the items that have been selected and submitted at least once.
    // and we make sure to prevent duplicates.
    var itemsToStore = [];
    var indexedNames = (function indexArrayByField(items, fieldName) {
      var index = {};
      for (var i=0; i<items.length; ++i) {
        index[items[i][fieldName]] = true;
      }
      return index;
    })(_cache, 'name');
    for (var i=0; i<selectedItems.length; ++i) {
      var itemName = selectedItems[i];
      var itemIsStored = indexedNames[itemName];
      if (!itemIsStored) {
        console.log('storing new item from selected options:', itemName);
        itemsToStore.push({ name: itemName });
      }
    }
    storeItems(itemsToStore, callback);
  }

  return {
    fetchItems: fetchItems,
    syncItems: syncItems
  };

})();
