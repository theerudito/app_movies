package helpers

import (
	"fmt"

	"github.com/theerudito/peliculas/models/dto"
)

func StorageManager(obj dto.StorageItemDTO) (int, error) {

	var (
		storageId int
		err       error
	)

	switch obj.Option {

	case "INSERT":

		qInsert := `
		INSERT INTO storage (file_name,url) 
		VALUES ($1, $2)
		RETURNING storage_id`

		err = obj.TX.QueryRow(qInsert, obj.FileName, obj.Url).Scan(&storageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error insertando el registro"))
			return 0, err
		}

	case "UPDATE":

		qUpdate := `
				UPDATE storage 
				SET file_name    = $1, 
				    url 		 = $2 
				WHERE storage_id = $4 
				RETURNING storage_id`

		err = obj.TX.QueryRow(qUpdate, obj.FileName, obj.Url, obj.StorageId).Scan(&storageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error actualizando el registro"))
			return 0, err
		}

	case "DELETE":

		qDelete := `DELETE FROM storage WHERE storage_id = $1`

		_, err = obj.TX.Exec(qDelete, obj.StorageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error eligando el registro"))
			return 0, err
		}

	}

	return 0, nil
}
