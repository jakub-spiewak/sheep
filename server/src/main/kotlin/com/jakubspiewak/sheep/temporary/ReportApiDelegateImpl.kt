package com.jakubspiewak.sheep.temporary

import com.jakubspiewak.sheep.generated.api.ReportApiDelegate
import com.jakubspiewak.sheep.generated.model.*
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class ReportApiDelegateImpl: ReportApiDelegate {
    override fun getCashFlow(
        startDate: LocalDate,
        endDate: LocalDate,
        interval: IntervalEnum?
    ): ResponseEntity<CashFlowResponse> {
        TODO("Not yet implemented")
    }

    override fun getExpensesByTag(
        startDate: LocalDate,
        endDate: LocalDate
    ): ResponseEntity<List<ExpensesByTagResponse>> {
        TODO("Not yet implemented")
    }

    override fun getFinancialProjections(futurePeriod: Int): ResponseEntity<FinancialProjectionsResponse> {
        TODO("Not yet implemented")
    }

    override fun getFinancialSummary(
        startDate: LocalDate,
        endDate: LocalDate
    ): ResponseEntity<FinancialSummaryResponse> {
        TODO("Not yet implemented")
    }

    override fun getIncomeBySource(
        startDate: LocalDate,
        endDate: LocalDate
    ): ResponseEntity<List<IncomeBySourceResponse>> {
        TODO("Not yet implemented")
    }
}