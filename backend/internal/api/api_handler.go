package api

import (
	"net/http"

	ah "github.com/durianpay/fullstack-boilerplate/internal/module/auth/handler"
	pu "github.com/durianpay/fullstack-boilerplate/internal/module/payment/usecase"
	"github.com/durianpay/fullstack-boilerplate/internal/openapigen"
)

type APIHandler struct {
	Auth      *ah.AuthHandler
	PaymentUC *pu.PaymentUsecase
}

var _ openapigen.ServerInterface = (*APIHandler)(nil)

func (h *APIHandler) PostDashboardV1AuthLogin(w http.ResponseWriter, r *http.Request) {
	h.Auth.PostDashboardV1AuthLogin(w, r)
}

func (h *APIHandler) GetDashboardV1Payments(w http.ResponseWriter, r *http.Request, params openapigen.GetDashboardV1PaymentsParams) {

	status := ""

	if params.Status != nil {
		status = string(*params.Status)
	}

	payments := h.PaymentUC.GetPayments(status)

	response := map[string]interface{}{
		"data": payments,
	}

	writeJSON(w, http.StatusOK, response)
}
