// Package main provides ...
package main

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
)

func main() {

	m := martini.Classic()
	m.Use(render.Renderer())

	r := martini.NewRouter()
	r.Get(`/albums`, GetAlbums)
	r.Get(`/albums/:id`, GetAlbum)
	// r.Post(`/albums`, AddAlbums)
	// r.Pus(`/albums/:id`, UpdateAlbum)
	// r.Delete(`/albums/:id`, DeleteAlbum)
	m.Action(r.Handle)

	m.Run()
}
