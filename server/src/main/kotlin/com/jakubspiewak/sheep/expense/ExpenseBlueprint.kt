package com.jakubspiewak.sheep.expense

import com.jakubspiewak.sheep.generated.model.*
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "expenseBlueprint")
data class ExpenseBlueprint(
    @Id
    val id: ObjectId,
    val name: String,
    val estimatedAmount: EstimatedAmount,
    val frequency: FrequencyEnum,
    val startDate: java.time.LocalDate,
    val endDate: java.time.LocalDate? = null,
    val tags: List<ObjectId> = listOf()
) {

    fun toResponse(): ExpenseBlueprintResponse {
        return ExpenseBlueprintResponse(
            id = id.toHexString(),
            estimatedAmount = estimatedAmount.toResponse(),
            frequency = frequency,
            startDate = startDate,
            endDate = endDate,
            tags = tags.map { it.toHexString() },
            name = name
        )
    }
}

private fun EstimatedAmount.toResponse(): EstimatedAmount {
    return when (this.type) {

        EstimatedAmountTypeEnum.FIXED -> {
            this as FixedAmount
            FixedAmount(
                amount = this.amount,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.RANGE -> {
            this as RangeAmount
            RangeAmount(
                min = this.min,
                max = this.max,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.VARIANCE_AMOUNT -> {
            this as VarianceAmount
            VarianceAmount(
                amount = this.amount,
                variance = this.variance,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.VARIANCE_PERCENT -> {
            this as VariancePercent
            VariancePercent(
                amount = this.amount,
                variancePercent = this.variancePercent,
                type = this.type
            )
        }
    }
}

