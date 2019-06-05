export function makeRealm (cmd, args, opts) {
  const realm = Realm.makeRootRealm()

  realm.global.args = args
  realm.global.opts = opts
  realm.global.loadCommand = function () {
    return import(cmd)
  }

  realm.global.window = {}
  //set('document', document.cloneNode(true))
  set('location', window.location)
  set('open', window.open)
  set('URL', URL)
  set('URLSearchParams', URLSearchParams)
  return realm

  function set (prop, val) {
    realm.global.window[prop] = val
    realm.global[prop] = val
  }
}
