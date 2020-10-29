var EXE = 'exe';
var DMG = 'dmg';

function assignDownloadUrl(id, url) {
  var downloadButton = document.querySelector(id);
  downloadButton.setAttribute('href', url);
}

function requestListener() {
  var response = JSON.parse(this.responseText);
  var assets = response.assets;

  for (let index = 0; index < assets.length; index++) {
    var browserUrl = assets[index].browser_download_url;

    var fileType = browserUrl.slice(browserUrl.length - 3);

    if (fileType === EXE) {
      assignDownloadUrl("#windowsDownload", browserUrl)
    } else if (fileType === DMG) {
      assignDownloadUrl("#macDownload", browserUrl)
    }
  }
}

var request = new XMLHttpRequest();
request.addEventListener("load", requestListener);
request.open("GET", "https://api.github.com/repos/vgrid/safercities-screenshare/releases/latest");
request.send();