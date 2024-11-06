package com.jakubspiewak.sheep.expense.schedule

import com.jakubspiewak.sheep.common.toResponse
import com.jakubspiewak.sheep.generated.model.EstimatedAmount
import com.jakubspiewak.sheep.generated.model.ExpenseScheduleResponse
import com.jakubspiewak.sheep.generated.model.FrequencyEnum
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "expenseSchedule")
data class ExpenseScheduleDocument(
    @Id
    var id: ObjectId,
    var name: String,
    var estimatedAmount: EstimatedAmount,
    var frequency: FrequencyEnum,
    var startDate: java.time.LocalDate? = null,
    var endDate: java.time.LocalDate? = null,
    var tags: List<ObjectId> = listOf()
) {

    fun toResponse(): ExpenseScheduleResponse {
        return ExpenseScheduleResponse(
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

