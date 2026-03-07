package repository

import "github.com/durianpay/fullstack-boilerplate/internal/entity"

type PaymentRepository struct {
	payments []entity.Payment
}

func NewPaymentRepository() *PaymentRepository {
	return &PaymentRepository{
		payments: []entity.Payment{
			{
				ID:        "pay_1",
				Merchant:  "Tokopedia",
				Amount:    100000,
				Status:    entity.PaymentCompleted,
				CreatedAt: "2025-03-01T10:00:00Z",
			},
			{
				ID:        "pay_2",
				Merchant:  "Shopee",
				Amount:    50000,
				Status:    entity.PaymentFailed,
				CreatedAt: "2025-03-02T11:00:00Z",
			},
			{
				ID:        "pay_3",
				Merchant:  "Lazada",
				Amount:    75000,
				Status:    entity.PaymentProcessing,
				CreatedAt: "2025-03-03T12:00:00Z",
			},
		},
	}
}

func (r *PaymentRepository) GetAll() []entity.Payment {
	return r.payments
}