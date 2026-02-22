package dto

import "database/sql"

type StorageItemDTO struct {
	StorageId int
	Option    string
	FileName  string
	Url       string
	TX        *sql.Tx
}
