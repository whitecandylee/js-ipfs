'use strict'

const multibase = require('multibase')
const { print } = require('../../utils')
const { cidToString } = require('../../../utils/cid')

module.exports = {
  command: 'wantlist [peer]',

  describe: 'Print out all blocks currently on the bitswap wantlist for the local peer.',

  builder: {
    peer: {
      alias: 'p',
      describe: 'Specify which peer to show wantlist for.',
      type: 'string'
    },
    'cid-base': {
      describe: 'Number base to display CIDs in.',
      type: 'string',
      choices: multibase.names
    }
  },

  handler ({ ipfs, peer, cidBase }) {
    ipfs.bitswap.wantlist(peer, (err, list) => {
      if (err) {
        throw err
      }
      list.Keys.forEach(k => print(cidToString(k['/'], cidBase)))
    })
  }
}
