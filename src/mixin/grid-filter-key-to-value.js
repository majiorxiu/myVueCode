export default {
  methods: {
    filterKeyToValue (rows, _key) {
      let keys = {
        '禁用': { status : 1},
        '启用': { status : 0}
      }
      _key = keys[_key];
      if(_key) {
        for(let key in _key) {
          rows = rows.filter(item => item[key] === _key[key])
        }
      }
      return rows
    }
  }
}