package com.jakubspiewak.sheep.expense

import com.jakubspiewak.sheep.common.toResponse
import com.jakubspiewak.sheep.generated.model.EstimatedAmount
import com.jakubspiewak.sheep.generated.model.ExpenseBlueprintResponse
import com.jakubspiewak.sheep.generated.model.FrequencyEnum
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "expenseBlueprint")
data class ExpenseBlueprintDocument(
    @Id
    var id: ObjectId,
    var name: String,
    var estimatedAmount: EstimatedAmount,
    var frequency: FrequencyEnum,
    var startDate: java.time.LocalDate,
    var endDate: java.time.LocalDate? = null,
    var tags: List<ObjectId> = listOf()
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

