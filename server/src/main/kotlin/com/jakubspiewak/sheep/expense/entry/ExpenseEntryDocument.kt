package com.jakubspiewak.sheep.expense.entry

import com.jakubspiewak.sheep.generated.model.ExpenseEntryResponse
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "expenseEntry")
data class ExpenseEntryDocument(
    @Id
    var id: ObjectId,
    var amount: Double,
    var date: LocalDate,
    var name: String,
    var blueprintId: ObjectId? = null,
    var tags: List<ObjectId> = listOf(),
) {

    fun toResponse(): ExpenseEntryResponse {
        return ExpenseEntryResponse(
            id = id.toHexString(),
            amount = amount,
            date = date,
            name = name,
            blueprintId = blueprintId?.toHexString(),
            tags = tags.map { it.toHexString() },
        )
    }
}

