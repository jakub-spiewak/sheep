package com.jakubspiewak.sheep.income

import com.jakubspiewak.sheep.common.toResponse
import com.jakubspiewak.sheep.generated.model.EstimatedAmount
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintResponse
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "incomeBlueprint")
data class IncomeBlueprintDocument(
    @Id
    var id: ObjectId,
    var name: String,
    var estimatedAmount: EstimatedAmount,
    var startDate: LocalDate? =null,
    var endDate: LocalDate? = null,
) {

    fun toResponse(): IncomeBlueprintResponse {
        return IncomeBlueprintResponse(
            id = id.toHexString(),
            estimatedAmount = estimatedAmount.toResponse(),
            startDate = startDate,
            endDate = endDate,
            name = name
        )
    }
}