package com.jakubspiewak.sheep.report

import com.jakubspiewak.sheep.expense.schedule.ExpenseScheduleDocument
import com.jakubspiewak.sheep.expense.schedule.ExpenseScheduleRepository
import com.jakubspiewak.sheep.generated.api.ReportApiDelegate
import com.jakubspiewak.sheep.generated.model.*
import com.jakubspiewak.sheep.income.IncomeBlueprintDocument
import com.jakubspiewak.sheep.income.IncomeBlueprintRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class ReportApiDelegateImpl(
    private val expenseBlueprintRepository: ExpenseScheduleRepository,
    private val incomeBlueprintRepository: IncomeBlueprintRepository
) : ReportApiDelegate {
    override fun getCashFlow(
        startDate: LocalDate, endDate: LocalDate, interval: IntervalEnum?
    ): ResponseEntity<CashFlowResponse> {
        TODO("Not yet implemented")
    }

    override fun getExpensesByTag(
        startDate: LocalDate, endDate: LocalDate
    ): ResponseEntity<List<ExpensesByTagResponse>> {
        TODO("Not yet implemented")
    }

    override fun getFinancialProjections(futurePeriod: Int): ResponseEntity<FinancialProjectionsResponse> {
        TODO("Not yet implemented")
    }

    override fun getFinancialSummary(
        startDate: LocalDate, endDate: LocalDate
    ): ResponseEntity<FinancialSummaryResponse> {

        val expenses = expenseBlueprintRepository.findAll()
        val totalExpenses = expenses.sumOf { it.getMonthlyAvgAmount() }

        val incomes = incomeBlueprintRepository.findAll()
        val totalIncomes = incomes.sumOf { it.getMonthlyAvgAmount() }

        val response = FinancialSummaryResponse(
            totalIncome = totalIncomes,
            totalExpenses = totalExpenses,
            netBalance = totalIncomes - totalExpenses
        )

        return ResponseEntity.ok(response)
    }

    override fun getIncomeBySource(
        startDate: LocalDate, endDate: LocalDate
    ): ResponseEntity<List<IncomeBySourceResponse>> {
        TODO("Not yet implemented")
    }
}

private fun IncomeBlueprintDocument.getMonthlyAvgAmount(): Double {
    return this.estimatedAmount.getAvgValue()
}

private fun ExpenseScheduleDocument.getMonthlyAvgAmount(): Double {
    return this.estimatedAmount.getAvgValue() * when (this.frequency) {
        FrequencyEnum.DAILY -> 30
        FrequencyEnum.WEEKLY -> 4
        FrequencyEnum.MONTHLY -> 1
        FrequencyEnum.YEARLY -> 1 / 12
    }
}

private fun EstimatedAmount.getAvgValue(): Double {
    return when (this) {
        is FixedAmount -> amount
        is RangeAmount -> (min + max) / 2.0
        is VarianceAmount -> amount
        is VariancePercent -> amount
        else -> throw IllegalArgumentException("Unknown EstimatedAmount type")
    }
}
