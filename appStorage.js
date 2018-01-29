function AppStorage(appName)
{
  var prefix = (appName ? appName + "." : "");

  /** used to determine if local storage available */
  this.localStorageSupported = (('localStorage' in window) && window['localStorage']);

  /** sets the value with the specified key into localstorage */
  this.setValue = function(key, val)
  {
    if (this.localStorageSupported) localStorage.setItem(prefix + key, JSON.stringify(val));
    return this;
  };

  /**
   * Gets the value with the specified key from localStorage
   * @returns the value or null if not found
   */
  this.getValue = function(key)
  {
    if (this.localStorageSupported) return JSON.parse(localStorage.getItem(prefix + key));
    else return null;
  };

  /** Removes the value with the specified key */
  this.removeValue = function(key)
  {
    if (this.localStorageSupported) localStorage.removeItem(prefix + key);
    return this;
  };

  /** Removes all items associated with the app */
  this.removeAll = function()
  {
    var keys = this.getKeys();
    for (var i in keys)
    {
      this.remove(keys[i]);
    }
    return this;
  };

  /**
   * Determines if the specified key has a value in localStorage
   * @returns True if the key has a value
   */
  this.contains = function(key)
  {
    return this.get(key) !== null;
  };

  /**
   * Gets the keys from localStorage for the application that
   * optionally match a @param filter: (Optional) A function that
   * returns true if the key should be @returns An array of keys
   */
  this.getKeys = function(filter)
  {
    var keys = [];
    if (this.localStorageSupported)
    {
      for (var key in localStorage)
      {
        if (isAppKey(key))
        {
          // remove the prefix from the key
          if (prefix) key = key.slice(prefix.length);
          // check the filter
          if (!filter || filter(key))
          {
            keys.push(key);
          }
        }
      }
    }
    return keys;
  };

  function isAppKey(key)
  {
    if (prefix)
    {
      return key.indexOf(prefix) === 0;
    }
    return true;
  };
}
