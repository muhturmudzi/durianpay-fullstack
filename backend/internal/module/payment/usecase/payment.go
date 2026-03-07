package usecase

import (
	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/repository"
)

type PaymentUsecase struct {
	repo *repository.PaymentRepository
}

func NewPaymentUsecase(repo *repository.PaymentRepository) *PaymentUsecase {
	return &PaymentUsecase{repo}
}

func (u *PaymentUsecase) GetPayments(status string) []entity.Payment {

	payments := u.repo.GetAll()

	if status == "" {
		return payments
	}

	var result []entity.Payment

	for _, p := range payments {
		if string(p.Status) == status {
			result = append(result, p)
		}
	}

	return result
}