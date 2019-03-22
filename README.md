# Mobile Inspection - Microservice Inspection

Instalasi :

```
$ cd /go/to/your/project-folder
$ git init
$ git clone https://github.com/tapdevops/ins-msa-inspection.git
$ cd /go/to/your/project-folder/ins-msa-inspection
$ npm install
$ node app.js
```

Table of contents:

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Mobile Inspection - Microservice EBCC Validation](#mobile-inspection---microservice-ebcc-validation)
	- [EBCC Kualitas Collections](#ebcc-kualitas-collections)
	- [EBCC Sync Mobile Collections](#ebcc-sync-mobile-collections)
	- [EBCC Sync TAP Collections](#ebcc-sync-tap-collections)
	- [EBCC Validation Collections](#ebcc-validation-collections)
	- [Documentation History](#documentation-history)
<!-- /TOC -->

Seluruh penggunaan API menggunakan header sebagai berikut :
``` json
{
	"Authorization": "Bearer ACC3SS_T0k3N",
	"Content-Type": "application/json",
	"accept-version": "1.0.0"
}
```

Pengaturan dan Konfigurasi:

| Resource | Decription |
|:---------|:-----------|
| Config | Berisi pengaturan-pengaturan untuk menjalankan program, contohnya seperti jika anda mengganti environment dari `developent` ke `production`, maka database akan ikut berubah. Lokasi file: `APP_PATH/config/config.js` |
| Database | Berisi kumpulan koneksi Database. Lokasi file: `APP_PATH/config/database.js` |
| Dockerfile | Berisi konfigurasi untuk membentuk Images pada Docker. Lokasi file: `APP_PATH/config/database.js` |