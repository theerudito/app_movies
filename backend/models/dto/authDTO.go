package dto

type LoginDTO struct {
	UserName string `json:"username"`
	Token    string `json:"token"`
}
