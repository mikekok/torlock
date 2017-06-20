// Modules
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')

// Torlock.com base URL
let torlockURL = 'https://www.torlock.com'

module.exports = {
  search: function(keyword, cb) {
    let torrents = []
    var reqURL = torlockURL + '/all/torrents/' + keyword + '.html'
    cloudscraper.get(reqURL, function(error, response, body) {
      var $ = cheerio.load(body)
      $('table:nth-child(2) tr').each(function(index, el) {
        var torrent = {}
        torrent.name = $(this).find('td:nth-child(1) b').text()
        console.log(torrent.name)
        torrent.seeders = $(this).find('td:nth-child(4)').text()
        torrent.leechers = $(this).find('td:nth-child(5)').text()
        torrent.url = torlockURL + $(this).find('td:nth-child(1) a').attr('href')
        if (torrent.name !== '') {
          torrents.push(torrent)
        }
      })
      return cb(null, torrents)
    })
  }
}
