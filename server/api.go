package main

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	_ "net/http"
)

func GetAlbums(r render.Render) {
	ret := make(map[string]string)
	ret["hello"] = "world"
	r.JSON(200, ret)
}

func GetAlbum(r render.Render, params martini.Params) {
	ret := make(map[string]string)
	ret["id"] = params["id"]
	r.JSON(200, ret)
}

// func AddAlbums(r render.Render, req *http.Request, martini.Params) {
// 	ret := make(map[string]string)
// 	ret["id"] = params["id"]
// 	r.JSON(200, ret)
// }
